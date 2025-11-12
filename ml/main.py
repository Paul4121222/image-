from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel, HttpUrl
import requests
import io
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch
import os
import csv

app = FastAPI()

model = None
processor = None
text_feat = None
labels = None

def load_labels(path='./dict.csv'):
    labels = []
    seen = set()
    with open(path,newline='',encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) < 2:
                continue
            row_label = row[1].strip().lower()
            if row_label in seen:
                continue
            labels.append(row_label)
            seen.add(row_label)
    return labels

#先針對標籤集做embedding
def build_label_embeddings():
    global text_feat, labels
    load_model()
    labels = load_labels()
    inputs = processor(text=labels, return_tensors='pt', padding=True)
    with torch.no_grad():
            text_feat = model.get_text_features(**inputs)
            text_feat = text_feat / text_feat.norm(p=2, dim=-1, keepdim=True)
    return text_feat, labels

#選出語意最高的標籤
def suggest_top_text_label(img_vector, text_feat, labels, top_k = 1):
    sims = img_vector @ text_feat.T
    values, indices = torch.topk(sims, k =top_k)
    result = []
    for v, idx in zip(values.tolist(), indices.tolist()):
        result.append({
            'label': labels[idx],
            'score': v
        })
    return result

def test_one_image(image_path):
    image = Image.open(image_path).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        feat = model.get_image_features(**inputs)
        feat = feat / feat.norm(p=2, dim=-1, keepdim=True)
    feat = feat.squeeze(0)  # (512,)
    return suggest_top_text_label(feat, text_feat, labels, top_k=5)

def load_model():
    global model, processor
    if model is None or processor is None:
        model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
        processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

@app.on_event('startup')
def init():
    print('Init load model')
    load_model()
    build_label_embeddings()

@app.get('/health')
def health():
    return {"status": "ok"}

@app.post('/embed')
def embed(file: UploadFile = File(...)):
    load_model()  # lazy load on first request
    image = Image.open(file.file).convert("RGB")
    inputs = processor(images=image, return_tensors='pt', padding=True)
    with torch.no_grad():
        feat = model.get_image_features(**inputs)
        feat = feat / feat.norm(p=2, dim=-1, keepdim=True)
    feat = feat.squeeze(0)
    top_result = suggest_top_text_label(feat, text_feat, labels, top_k=5)
    return {"embedding": feat.tolist(), "label": [item['label'] for item in top_result]}


class EmbedURLRequest(BaseModel):
    url: HttpUrl

@app.post('/embed_url')
def embed_url(payload: EmbedURLRequest):
    """Download an image from a URL and return its CLIP embedding."""
    load_model()
    try:
        resp = requests.get(str(payload.url), timeout=10)
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch URL: {e}")
    if resp.status_code != 200:
        raise HTTPException(status_code=400, detail=f"Non-200 status code: {resp.status_code}")

    content_type = resp.headers.get("Content-Type", "").lower()
    # Basic guard: we expect an image MIME type, but allow attempt even if missing
    if "image" not in content_type:
        # We'll still attempt to open; if it fails we'll raise a more specific error
        pass
    try:
        image = Image.open(io.BytesIO(resp.content)).convert("RGB")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Content is not a valid image: {e}")

    inputs = processor(images=image, return_tensors='pt')
    with torch.no_grad():
        feat = model.get_image_features(**inputs)
        feat = feat / feat.norm(p=2, dim=-1, keepdim=True)
    return {"embedding": feat.squeeze(0).tolist(), "source_url": str(payload.url)}

if __name__ == "__main__":
    load_model()
    build_label_embeddings()
    result = test_one_image('a.jpg')
    print(result)
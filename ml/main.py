from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel, HttpUrl
import requests
import io
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch
import os

app = FastAPI()

model = None
processor = None

def load_model():
    global model, processor
    if model is None or processor is None:
        model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
        processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

@app.on_event('startup')
def init():
    print('Init load model')
    load_model()

@app.get('/health')
def health():
    return {"status": "ok"}

@app.post('/embed')
def embed(file: UploadFile = File(...)):
    load_model()  # lazy load on first request
    image = Image.open(file.file).convert("RGB")
    inputs = processor(images=image, return_tensors='pt')
    with torch.no_grad():
        feat = model.get_image_features(**inputs)
        feat = feat / feat.norm(p=2, dim=-1, keepdim=True)
    return {"embedding": feat.squeeze(0).tolist()}


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
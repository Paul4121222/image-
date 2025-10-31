from fastapi import FastAPI, File, UploadFile
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
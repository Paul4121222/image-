from fastapi import FastAPI, HTTPException, File, UploadFile
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import requests
import torch
app = FastAPI()

#載入CLIP(版本)
#這是透過上億張照片訓練出的模型，所以這邊等於載入大腦
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

@app.post('/embed')
def embed(file: UploadFile = File(...)):  #File: FastApi才知道要哪裡取得，這邊是從multipart/form-data讀取file欄位，...的意思是一定要有這欄位(file)
    image = Image.open(file.file).convert("RGB")
    inputs = processor(images=image, return_tensors='pt')

    with torch.no_grad():
        feat = model.get_image_features(**inputs)
        feat = feat / feat.norm(p=2, dim=-1, keepdim=True)

    return {"embedding": feat.squeeze(0).tolist()}


#miss /classify
from fastapi import FastAPI, HTTPException
from transformers import CLIPProcessor, CLIPModel

app = FastAPI()

#載入CLIP(版本)
#這是透過上億張照片訓練出的模型，所以這邊等於載入大腦
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
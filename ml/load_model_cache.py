import torch
from transformers import CLIPProcessor, CLIPModel
import csv

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

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

labels = load_labels()
inputs = processor(text=labels, return_tensors="pt", padding=True)
with torch.inference_mode():                    
    feat = model.get_text_features(**inputs)
    feat = feat / feat.norm(dim=-1, keepdim=True)

#feat.half()體積縮小，轉成float32
torch.save({"labels": labels, "feat": feat.half()}, "label_cache.pt")

print("✅  Saved label_cache.pt  (", feat.shape, ")")
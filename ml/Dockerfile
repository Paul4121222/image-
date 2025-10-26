FROM python:3.10.12
WORKDIR /work
COPY . .
RUN pip install fastapi torch pillow transformers uvicorn python-multipart
EXPOSE 8000
CMD ["python3", "-m", "uvicorn", "main:app", "--reload"]

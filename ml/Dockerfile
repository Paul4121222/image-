FROM python:3.10.12
WORKDIR /work
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV PORT=8080
EXPOSE 8000
CMD ["uvicorn", "main:app", "--port", "$PORT"]

FROM python:3.10.12
WORKDIR /work
COPY requirement.txt .
RUN pip install -r --no-cache-dir requirement.txt
COPY . .
ENV PORT=8080
EXPOSE 8000
CMD ["uvicorn", "main:app", "--port", "$PORT"]

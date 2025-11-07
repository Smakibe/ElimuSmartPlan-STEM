FROM python:3.12-slim

WORKDIR /app

COPY ./app /app/app
COPY requirements.txt .

RUN apt-get update && apt-get install -y build-essential curl git \
    && pip install --upgrade pip \
    && pip install -r requirements.txt \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

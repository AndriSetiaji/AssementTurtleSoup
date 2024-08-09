# Menggunakan Python sebagai base image
FROM python:3.11-slim

# Membuat direktori untuk aplikasi
WORKDIR /app

RUN curl -fsSL https://ollama.com/install.sh | sh

# Menyalin file requirements.txt dan menginstal dependensi
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#RUN mkdir p /root/.ollama/models

# Menyalin model Ollama ke dalam image
#COPY /usr/share/ollama/.ollama/models /root/.ollama/models

# Menyalin kode aplikasi ke dalam image
COPY . .

# Menjalankan aplikasi FastAPI dengan Uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5000"]

# Gunakan Node.js versi LTS sebagai base image
FROM node:18-alpine

# Buat direktori kerja
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek
COPY . .

# Expose port yang digunakan aplikasi
EXPOSE 3000

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]

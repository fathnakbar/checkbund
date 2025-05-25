import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import clinicRoutes from './routes/clinics.js';
import catatanRoutes from './routes/catatan.js';
import cors from 'cors';

dotenv.config(); // Memuat variabel lingkungan dari .env

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;


// Konfigurasi CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // Izinkan semua origin dalam development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// Middleware
app.use(express.json()); // Untuk mengurai body JSON dari permintaan

// Sambungkan Prisma ke request object
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Definisi Rute API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/clinics', clinicRoutes);
app.use('/api/v1/catatan', catatanRoutes);


// Rute Uji Sederhana
app.get('/api/v1/', (req, res) => {
  res.send('API Checkbund berjalan!');
});

// Penanganan Error Global (opsional, tetapi direkomendasikan)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan server internal' });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

// Pastikan Prisma terputus saat aplikasi dihentikan
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
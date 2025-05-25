import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/v1/auth/register
router.post('/register', async (req, res) => {
  const { email, password, name, phone, address, role, no_str, birth, husband } = req.body;

  try {
    // Periksa apakah email sudah terdaftar
    const existingUser = await req.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const user = await req.prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Simpan password yang sudah di-hash
        name,
        phone,
        address,
        role,
        // Buat profil peran jika ada data spesifik
        ...(role === 'bidan' && no_str && {
          bidanProfile: { create: { no_str } }
        }),
        ...(role === 'bumil' && birth && husband && {
          bumilProfile: { create: { birth: new Date(birth), husband } }
        }),
      },
      select: { id: true, email: true, name: true, role: true } // Jangan kembalikan password
    });

    res.status(201).json({ message: 'Pengguna berhasil terdaftar', user_id: user.id });
  } catch (error) {
    console.error('Registrasi gagal:', error);
    res.status(500).json({ message: 'Registrasi gagal. Terjadi kesalahan server.' });
  }
});

// POST /api/v1/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email
    const user = await req.prisma.user.findUnique({
      where: { email },
      include: {
        bidanProfile: role === 'bidan', // Termasuk profil bidan jika peran bidan
        bumilProfile: role === 'bumil', // Termasuk profil bumil jika peran bumil
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Kredensial tidak valid.' });
    }

    // Bandingkan password yang diberikan dengan hash yang tersimpan
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Kredensial tidak valid.' });
    }

    // Buat JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' } // Token berlaku 1 jam
    );

    // Saring data pengguna sebelum dikirim
    const { password: _, ...userDataWithoutPassword } = user;

    res.status(200).json({
      message: 'Login berhasil',
      token,
      user: userDataWithoutPassword,
    });
  } catch (error) {
    console.error('Login gagal:', error);
    res.status(500).json({ message: 'Login gagal. Terjadi kesalahan server.' });
  }
});

export default router;
import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = Router();

// GET /api/v1/clinics
router.get('/', authenticateToken, async (req, res) => {
  try {
    const clinics = await req.prisma.clinic.findMany();
    res.status(200).json(clinics);
  } catch (error) {
    console.error('Gagal mengambil daftar klinik:', error);
    res.status(500).json({ message: 'Gagal mengambil daftar klinik.' });
  }
});

// GET /api/v1/clinics/:id
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const clinic = await req.prisma.clinic.findUnique({
      where: { id }
    });
    if (!clinic) {
      return res.status(404).json({ message: 'Klinik tidak ditemukan.' });
    }
    res.status(200).json(clinic);
  } catch (error) {
    console.error('Gagal mengambil detail klinik:', error);
    res.status(500).json({ message: 'Gagal mengambil detail klinik.' });
  }
});

// GET /api/v1/clinics/:id/patient
router.get('/:id/patient', authenticateToken, authorizeRole('bidan'), async (req, res) => {
  const clinicId = req.params.id;

  try {
    // Ambil semua pengguna yang terhubung dengan klinik ini
    const patients = await req.prisma.user.findMany({
      where: {
        clinicId: clinicId,
        role: 'bumil' // Hanya ambil pasien (bumil)
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        bumilProfile: true,
        createdAt: true
      }
    });

    res.status(200).json({
      message: 'Daftar pasien berhasil diambil',
      total_patients: patients.length,
      patients: patients
    });
  } catch (error) {
    console.error('Gagal mengambil daftar pasien:', error);
    res.status(500).json({ message: 'Gagal mengambil daftar pasien. Terjadi kesalahan server.' });
  }
});


// POST /api/v1/clinics
router.post('/', authenticateToken, authorizeRole('bidan'), async (req, res) => {
  const { name, contact, address } = req.body;
  const ownerId = req.user.id; // Owner adalah bidan yang terautentikasi

  try {
    const newClinic = await req.prisma.clinic.create({
      data: {
        name,
        contact,
        address,
        owner: { connect: { id: ownerId } } // Menghubungkan pemilik
      }
    });

    // Otomatis set klinik yang baru dibuat sebagai klinik bidan pemilik
    await req.prisma.user.update({
      where: { id: ownerId },
      data: { clinicId: newClinic.id }
    });

    res.status(201).json({
      message: 'Klinik berhasil dibuat dan dihubungkan.',
      clinic_id: newClinic.id,
      clinic_data: newClinic
    });
  } catch (error) {
    console.error('Gagal membuat klinik baru:', error);
    res.status(500).json({ message: 'Gagal membuat klinik baru. Terjadi kesalahan server.' });
  }
});

export default router;
import { Router } from 'express';
import { authenticateToken, authorizeRole, authorizeCatatanAccess } from '../middleware/auth.js';
import { Prisma } from '@prisma/client'; // Import Prisma untuk error handling

const router = Router();

// POST /api/v1/catatan
router.post('/', authenticateToken, authorizeRole('bidan'), async (req, res) => {
  const { pasien, bidan, type, catatan, return_date, clinic } = req.body;

  // Pastikan bidan yang membuat catatan adalah bidan yang sedang login
  if (bidan !== req.user.id) {
    return res.status(403).json({ message: 'Akses ditolak. Anda hanya dapat membuat catatan untuk diri sendiri sebagai bidan pembuat.' });
  }

  try {
    const newCatatan = await req.prisma.catatan.create({
      data: {
        pasien: { connect: { id: pasien } },
        bidan: { connect: { id: bidan } },
        type,
        catatanData: catatan, // Simpan objek catatan sebagai Json
        return_date: new Date(return_date),
        clinic: { connect: { id: clinic } },
      }
    });

    res.status(201).json({
      message: 'Catatan berhasil dibuat',
      catatan_id: newCatatan.id,
      catatan_data: newCatatan // Mengembalikan data catatan yang baru dibuat
    });
  } catch (error) {
    console.error('Gagal membuat catatan:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Contoh penanganan error Prisma
      if (error.code === 'P2025') { // Record not found
        return res.status(400).json({ message: 'Pasien, Bidan, atau Klinik tidak ditemukan.' });
      }
    }
    res.status(500).json({ message: 'Gagal membuat catatan. Terjadi kesalahan server.' });
  }
});


// GET /api/v1/catatan/:id
router.get('/:id', authenticateToken, authorizeCatatanAccess, async (req, res) => {
    const catatanId = req.params.id;
    try {
        const catatan = await req.prisma.catatan.findUnique({
            where: { id: catatanId },
            include: {
                pasien: { select: { name: true } },
                bidan: { select: { name: true } },
                clinic: { select: { name: true } }
            }
        });

        if (!catatan) {
            return res.status(404).json({ message: 'Catatan tidak ditemukan.' });
        }

        // Format output agar sesuai dengan frontend (catatanData diurai)
        const formattedCatatan = {
            ...catatan,
            catatan: catatan.catatanData, // Mengganti catatanData dengan isi Json
            catatanData: undefined // Hapus properti asli jika tidak diperlukan
        };

        res.status(200).json(formattedCatatan);
    } catch (error) {
        console.error('Gagal mengambil catatan spesifik:', error);
        res.status(500).json({ message: 'Gagal mengambil catatan spesifik.' });
    }
});

// PATCH /api/v1/catatan/:id
router.patch('/:id', authenticateToken, authorizeRole('bidan'), authorizeCatatanAccess, async (req, res) => {
    const catatanId = req.params.id;
    const { catatan, return_date, type } = req.body; // Hati-hati dengan field lain yang mungkin diupdate

    try {
        const updateData = {};
        if (catatan) updateData.catatanData = catatan; // Update objek Json
        if (return_date) updateData.return_date = new Date(return_date);
        if (type) updateData.type = type;

        const updatedCatatan = await req.prisma.catatan.update({
            where: { id: catatanId },
            data: updateData,
        });

        res.status(200).json({ message: 'Catatan berhasil diperbarui', catatan: updatedCatatan });
    } catch (error) {
        console.error('Gagal memperbarui catatan:', error);
        res.status(500).json({ message: 'Gagal memperbarui catatan. Terjadi kesalahan server.' });
    }
});

// DELETE /api/v1/catatan/:id
router.delete('/:id', authenticateToken, authorizeRole('bidan'), authorizeCatatanAccess, async (req, res) => {
    const catatanId = req.params.id;
    try {
        await req.prisma.catatan.delete({
            where: { id: catatanId },
        });
        res.status(200).json({ message: 'Catatan berhasil dihapus.' });
    } catch (error) {
        console.error('Gagal menghapus catatan:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Catatan tidak ditemukan.' });
        }
        res.status(500).json({ message: 'Gagal menghapus catatan. Terjadi kesalahan server.' });
    }
});

export default router;
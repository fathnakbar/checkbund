import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET /api/v1/users/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // req.user berisi data pengguna dari token (id, email, role)
    const {password, ...user} = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        clinic: true, // Termasuk data klinik jika terhubung
        bidanProfile: req.user.role === 'bidan', // Termasuk profil bidan jika peran bidan
        bumilProfile: req.user.role === 'bumil', // Termasuk profil bumil jika peran bumil
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Gagal mengambil data pengguna:', error);
    res.status(500).json({ message: 'Gagal mengambil data pengguna.' });
  }
});

// GET /api/v1/users/next-appointment (Jadwal pertemuan berikutnya)
router.get('/next-appointment', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const authenticatedUserId = req.user.id;
    const authenticatedUserRole = req.user.role;

    try {
      // Tentukan query berdasarkan role
      const whereClause = authenticatedUserRole === 'bidan' 
        ? { bidanId: userId }
        : { pasienId: userId };

      const selectClause = authenticatedUserRole === 'bidan'
        ? {
            return_date: true,
            pasien: {
              select: {
                name: true,
                address: true,
                phone: true
              }
            }
          }
        : {
            return_date: true,
            bidan: {
              select: {
                name: true,
                address: true,
                phone: true
              }
            }
          };

      const nextAppointment = await req.prisma.catatan.findFirst({
        where: {
          ...whereClause,
          return_date: {
            gte: new Date()
          }
        },
        select: selectClause,
        orderBy: { return_date: 'asc' }
      });

      if (!nextAppointment) {
        return res.status(404).json({ message: 'Tidak ada jadwal pertemuan berikutnya.' });
      }

      // Format data berdasarkan role
      const userData = authenticatedUserRole === 'bidan'
        ? {
            name: nextAppointment.pasien.name,
            address: nextAppointment.pasien.address,
            contact: nextAppointment.pasien.phone
          }
        : {
            name: nextAppointment.bidan.name,
            address: nextAppointment.bidan.address,
            contact: nextAppointment.bidan.phone
          };

      const formattedAppointment = {
        return_date: nextAppointment.return_date.toISOString().split('T')[0],
        user_data: userData
      };

      res.status(200).json(formattedAppointment);
    } catch (error) {
      console.error('Gagal mengambil jadwal pertemuan berikutnya:', error);
      res.status(500).json({ message: 'Gagal mengambil jadwal pertemuan berikutnya.' });
    }
  });

// GET /api/v1/users/:id
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const authenticatedUserRole = req.user.role;

  try {
    const {password, ...user} = await req.prisma.user.findUnique({
      where: { id },
      include: {
        clinic: true,
        bidanProfile: true, // Sertakan profil bidan
        bumilProfile: true, // Sertakan profil bumil
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    // Otorisasi: Bumil hanya bisa melihat dirinya sendiri
    if (authenticatedUserRole === 'bumil' && user.id !== req.user.id) {
      return res.status(403).json({ message: 'Akses ditolak. Anda tidak memiliki izin untuk melihat profil ini.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Gagal mengambil data pengguna spesifik:', error);
    res.status(500).json({ message: 'Gagal mengambil data pengguna spesifik.' });
  }
});

// GET /api/v1/users/:id/catatan (Mengambil semua catatan untuk pasien)
router.get('/:id/catatan', authenticateToken, async (req, res) => {
    const pasienId = req.params.id;
    const authenticatedUserId = req.user.id;
    const authenticatedUserRole = req.user.role;
  
    try {
      // Otorisasi: Bumil hanya bisa melihat catatannya sendiri
      if (authenticatedUserRole === 'bumil' && pasienId !== authenticatedUserId) {
        return res.status(403).json({ message: 'Akses ditolak. Anda tidak memiliki izin untuk melihat catatan pasien lain.' });
      }
      // Bidan bisa melihat catatan pasien manapun
      // Tidak perlu otorisasi tambahan jika hanya ingin membatasi berdasarkan pasienId
  
      const catatanList = await req.prisma.catatan.findMany({
        where: { pasienId },
        include: {
          bidan: { select: { name: true } } // Hanya ambil nama bidan
        },
        orderBy: { createdAt: 'desc' } // Urutkan dari yang terbaru
      });
  
      // Format output agar sesuai dengan frontend (catatanData diurai)
      const formattedCatatan = catatanList.map(catatan => ({
        ...catatan,
        catatan: catatan.catatanData, // Mengganti catatanData dengan isi Json
        catatanData: undefined // Hapus properti asli jika tidak diperlukan
      }));
  
      res.status(200).json(formattedCatatan);
    } catch (error) {
      console.error('Gagal mengambil catatan pasien:', error);
      res.status(500).json({ message: 'Gagal mengambil catatan pasien.' });
    }
  });
  

// PATCH /api/v1/users/:id
router.patch('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { clinic, phone, address, name, birth, husband, no_str } = req.body;

  // Pastikan pengguna hanya bisa memperbarui profilnya sendiri
  if (id !== req.user.id) {
    return res.status(403).json({ message: 'Akses ditolak. Anda tidak memiliki izin untuk memperbarui profil ini.' });
  }

  try {
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;

    // Untuk klinik (mengatur atau melepaskan afiliasi)
    if (clinic !== undefined) {
      updateData.clinicId = clinic; // clinic bisa berupa ID atau null
    }

    // Untuk data spesifik peran (jika disimpan langsung di model User)
    // Jika Anda menggunakan BidanProfile/BumilProfile terpisah, logika ini akan berbeda
    if (req.user.role === 'bumil') {
      if (birth !== undefined) updateData.birth = new Date(birth);
      if (husband !== undefined) updateData.husband = husband;
    } else if (req.user.role === 'bidan') {
      // Untuk no_str, jika disimpan di BidanProfile, perlu update terpisah
      // Contoh: await req.prisma.bidanProfile.update(...)
    }

    const {password, ...updatedUser} = await req.prisma.user.update({
      where: { id },
      data: updateData,
    });

    // Jika no_str diperbarui dan menggunakan BidanProfile terpisah
    if (req.user.role === 'bidan' && no_str !== undefined) {
      await req.prisma.bidanProfile.update({
        where: { userId: id },
        data: { no_str }
      });
    }


    res.status(200).json({ message: 'Profil pengguna berhasil diperbarui', user: updatedUser });
  } catch (error) {
    console.error('Gagal memperbarui profil pengguna:', error);
    if (error.code === 'P2025') { // Prisma error code for record not found
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }
    res.status(500).json({ message: 'Gagal memperbarui profil pengguna. Terjadi kesalahan server.' });
  }
});

export default router;
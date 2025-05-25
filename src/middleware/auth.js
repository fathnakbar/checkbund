import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware untuk memverifikasi JWT dan mengautentikasi pengguna.
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer TOKEN

  if (token == null) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak disediakan.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid atau kadaluwarsa.' });
    }
    req.user = user; // Menambahkan data pengguna dari token ke objek request
    next();
  });
};

/**
 * Middleware untuk memeriksa peran pengguna.
 */
export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Akses ditolak. Peran tidak diizinkan.' });
    }
    next();
  };
};

// Middleware untuk otorisasi akses catatan
export const authorizeCatatanAccess = async (req, res, next) => {
  const catatanId = req.params.id;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const catatan = await req.prisma.catatan.findUnique({
      where: { id: catatanId },
      select: {
        pasienId: true,
        bidanId: true,
        clinicId: true,
        clinic: { select: { ownerId: true } }
      }
    });

    if (!catatan) {
      return res.status(404).json({ message: 'Catatan tidak ditemukan.' });
    }

    // Bumil hanya bisa melihat catatannya sendiri
    if (userRole === 'bumil') {
      if (catatan.pasienId !== userId) {
        return res.status(403).json({ message: 'Akses ditolak. Anda tidak memiliki izin untuk melihat catatan ini.' });
      }
    }
    // Bidan bisa melihat catatannya sendiri, catatan pasiennya, atau catatan di klinik yang sama
    else if (userRole === 'bidan') {
      const bidanClinicId = (await req.prisma.user.findUnique({ where: { id: userId }, select: { clinicId: true } }))?.clinicId;

      if (catatan.bidanId !== userId && catatan.pasienId !== userId && catatan.clinicId !== bidanClinicId) {
        return res.status(403).json({ message: 'Akses ditolak. Anda tidak memiliki izin untuk melihat catatan ini.' });
      }
    } else {
        // Jika ada peran lain yang belum terdefinisi, tolak akses
        return res.status(403).json({ message: 'Akses ditolak. Peran tidak diizinkan.' });
    }

    next();
  } catch (error) {
    console.error('Error during catatan authorization:', error);
    res.status(500).json({ message: 'Kesalahan otorisasi catatan.' });
  }
};
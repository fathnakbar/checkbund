/**
 * @fileoverview Berisi definisi struktur data (DTOs dan Responses)
 * untuk interaksi frontend-backend aplikasi Checkbund.
 */

// --- Data yang Dikirim ke Backend (Requests) ---

/**
 * @typedef {Object} LoginRequest
 * @property {string} email - Alamat email pengguna.
 * @property {string} password - Kata sandi pengguna.
 */
const LOGIN_REQUEST = {
    email: "email_pengguna@example.com",
    password: "kata_sandi_pengguna",
  };
  
  /**
   * @typedef {Object} RegisterRequestBidan
   * @property {"bidan"} role - Peran pengguna, selalu "bidan".
   * @property {string} name - Nama lengkap bidan.
   * @property {string} email - Alamat email bidan.
   * @property {string} phone - Nomor telepon bidan.
   * @property {string} address - Alamat lengkap bidan.
   * @property {string} no_str - Nomor STR (Surat Tanda Registrasi) bidan.
   * @property {string} password - Kata sandi akun bidan.
   */
  const REGISTER_REQUEST_BIDAN = {
    role: "bidan",
    name: "Nama Lengkap Bidan",
    email: "bidan@example.com",
    phone: "081234567890",
    address: "Alamat Bidan Lengkap",
    no_str: "1234567890",
    password: "kata_sandi_aman_bidan",
  };
  
  /**
   * @typedef {Object} RegisterRequestBumil
   * @property {"bumil"} role - Peran pengguna, selalu "bumil".
   * @property {string} name - Nama lengkap ibu hamil.
   * @property {string} email - Alamat email ibu hamil.
   * @property {string} phone - Nomor telepon ibu hamil.
   * @property {string} address - Alamat ibu hamil lengkap.
   * @property {string} birth - Tanggal lahir ibu hamil (YYYY-MM-DD).
   * @property {string} husband - Nama suami ibu hamil.
   * @property {string} password - Kata sandi akun ibu hamil.
   */
  const REGISTER_REQUEST_BUMIL = {
    role: "bumil",
    name: "Nama Lengkap Ibu Hamil",
    email: "bumil@example.com",
    phone: "089876543210",
    address: "Alamat Ibu Hamil Lengkap",
    birth: "1990-01-15",
    husband: "Nama Suami Ibu Hamil",
    password: "kata_sandi_aman_bumil",
  };
  
  /**
   * @typedef {Object} SetUserClinicRequest
   * @property {string | null} clinic - ID UUID klinik yang dipilih, atau null jika ingin melepaskan afiliasi.
   */
  const SET_USER_CLINIC_REQUEST = {
    clinic: "uuid_klinik_yang_dipilih_atau_null",
  };
  
  /**
   * @typedef {Object} CreateClinicRequest
   * @property {string} name - Nama klinik baru.
   * @property {string} contact - Nomor kontak klinik.
   * @property {string} address - Alamat lengkap klinik.
   * @property {string} owner - ID UUID bidan pemilik klinik.
   */
  const CREATE_CLINIC_REQUEST = {
    name: "Nama Klinik Baru",
    contact: "08123456789",
    address: "Jl. Raya Kebon Jeruk No. 10, Jakarta Barat",
    owner: "uuid_bidan_yang_sedang_login",
  };
  
  /**
   * @typedef {Object} CatatanDetail
   * @property {string} metode_kontrasepsi
   * @property {string} tekanan_darah
   * @property {string} berat_badan
   * @property {string} keluhan
   * @property {string} umur_kehamilan
   * @property {string} lingkar_perut
   * @property {string} hasil_pemeriksaan
   * @property {string} nasihat
   */
  
  /**
   * @typedef {Object} PostCatatanRequest
   * @property {string} pasien - ID UUID pasien (ibu hamil) yang dicatat.
   * @property {string} bidan - ID UUID bidan yang membuat catatan.
   * @property {string} type - Tipe catatan (e.g., "kesehatan", "KB").
   * @property {CatatanDetail} catatan - Objek detail catatan medis.
   * @property {string} return_date - Tanggal kembali (YYYY-MM-DD).
   * @property {string} clinic - ID UUID klinik bidan.
   */
  const POST_CATATAN_REQUEST = {
    pasien: "uuid_pasien_terkait",
    bidan: "uuid_bidan_pembuat_catatan",
    type: "kesehatan", // atau 'KB', dll.
    catatan: {
      metode_kontrasepsi: "Pil KB",
      tekanan_darah: "120/80 mmHg",
      berat_badan: "65 kg",
      keluhan: "Tidak ada keluhan berarti",
      umur_kehamilan: "30 minggu",
      lingkar_perut: "90 cm",
      hasil_pemeriksaan: "Kondisi baik, janin aktif",
      nasihat: "Jaga pola makan dan istirahat cukup.",
    },
    return_date: "2025-06-10",
    clinic: "uuid_klinik_bidan",
  };
  
  // --- Data yang Diterima dari Backend (Responses) ---
  
  /**
   * @typedef {Object} UserDataResponseBase
   * @property {string} id - ID UUID pengguna.
   * @property {string} name - Nama lengkap pengguna.
   * @property {string} email - Alamat email pengguna.
   * @property {string} phone - Nomor telepon pengguna.
   * @property {string} address - Alamat lengkap pengguna.
   * @property {string} role - Peran pengguna ("bumil" atau "bidan").
   * @property {string | null} clinic - ID UUID klinik terkait (null jika belum).
   * @property {string} created_at - Timestamp pembuatan akun (ISO 8601).
   */
  
  /**
   * @typedef {UserDataResponseBase} UserDataResponseBumil
   * @property {"bumil"} role - Peran pengguna, selalu "bumil".
   * @property {string} birth - Tanggal lahir ibu hamil (YYYY-MM-DD).
   * @property {string} husband - Nama suami ibu hamil.
   */
  const USER_DATA_RESPONSE_BUMIL = {
    id: "uuid_pengguna_contoh_12345",
    name: "Nama Lengkap Ibu Hamil",
    email: "ibu.hamil@example.com",
    phone: "081234567890",
    address: "Jl. Melati No. 5, Kota Bahagia",
    role: "bumil",
    clinic: "uuid_klinik_terkait_abcde",
    birth: "1990-05-20",
    husband: "Nama Suami Ibu Hamil",
    created_at: "2024-01-01T10:00:00Z",
  };
  
  /**
   * @typedef {UserDataResponseBase} UserDataResponseBidan
   * @property {"bidan"} role - Peran pengguna, selalu "bidan".
   * @property {string} no_str - Nomor STR bidan.
   */
  const USER_DATA_RESPONSE_BIDAN = {
    id: "uuid_pengguna_contoh_12345",
    name: "Nama Lengkap Bidan",
    email: "bidan@example.com",
    phone: "081234567890",
    address: "Alamat Lengkap Bidan",
    role: "bidan",
    clinic: "uuid_klinik_terkait_abcde",
    no_str: "1234567890",
    created_at: "2024-01-01T10:00:00Z",
  };
  
  /**
   * @typedef {Object} ClinicResponse
   * @property {string} id - ID UUID klinik.
   * @property {string} name - Nama klinik.
   * @property {string} contact - Nomor kontak klinik.
   * @property {string} address - Alamat lengkap klinik.
   * @property {string} owner - ID UUID bidan pemilik klinik.
   * @property {string} created_at - Timestamp pembuatan klinik (ISO 8601).
   */
  
  /**
   * @type {ClinicResponse[]}
   */
  const CLINIC_LIST_RESPONSE = [
    {
      id: "uuid_klinik_1_abc",
      name: "Klinik Sehat Keluarga",
      contact: "0221234567",
      address: "Jl. Mawar Indah No. 10, Kota Bahagia",
      owner: "uuid_bidan_pemilik_1",
      created_at: "2023-01-15T10:00:00Z",
    },
    {
      id: "uuid_klinik_2_def",
      name: "Klinik Harapan Bunda",
      contact: "0219876543",
      address: "Jl. Anggrek Raya No. 22, Kota Damai",
      owner: "uuid_bidan_pemilik_2",
      created_at: "2023-03-20T11:30:00Z",
    },
  ];
  
  /**
   * @type {ClinicResponse}
   */
  const CLINIC_DETAIL_RESPONSE = {
    id: "uuid_klinik_contoh_abcde",
    name: "Klinik Sehat Bunda",
    contact: "0221234567",
    address: "Jl. Mawar Indah No. 10, Kota Bahagia",
    owner: "uuid_bidan_pemilik_fghij",
    created_at: "2023-01-15T10:00:00Z",
  };
  
  /**
   * @typedef {Object} BidanInfo
   * @property {string} name - Nama bidan.
   * @property {string} address - Alamat bidan.
   * @property {string} contact - Kontak bidan.
   */
  
  /**
   * @typedef {Object} NextAppointmentScheduleResponse
   * @property {string} return_date - Tanggal kembali (YYYY-MM-DD).
   * @property {BidanInfo} user_data - Informasi bidan yang membuat jadwal ini.
   */
  const NEXT_APPOINTMENT_SCHEDULE_RESPONSE = {
    return_date: "2025-06-10",
    user_data: {
      name: "Bidan Siti Aminah",
      address: "Jl. Kenanga No. 20, Kota Bahagia",
      contact: "087654321098",
    },
  };
  
  /**
   * @typedef {Object} CatatanListResponseItem
   * @property {string} id - ID UUID catatan.
   * @property {string} return_date - Tanggal kembali (YYYY-MM-DD).
   * @property {string} created_at - Timestamp pembuatan catatan (ISO 8601).
   * @property {string} pasien - ID UUID pasien.
   * @property {string} bidan - ID UUID bidan.
   * @property {CatatanDetail} catatan - Detail catatan medis.
   * @property {string} type - Tipe catatan.
   * @property {Object} user_data - Informasi bidan yang membuat catatan.
   * @property {string} user_data.name - Nama bidan.
   */
  
  /**
   * @type {CatatanListResponseItem[]}
   */
  const CATATAN_LIST_RESPONSE = [
    {
      id: "uuid_catatan_1_abc",
      return_date: "2025-05-25",
      created_at: "2025-05-18T14:30:00Z",
      pasien: "uuid_pengguna_contoh_12345",
      bidan: "uuid_bidan_pembuat_catatan",
      catatan: {
        metode_kontrasepsi: "Pil KB",
        tekanan_darah: "120/80 mmHg",
        berat_badan: "65 kg",
        keluhan: "Tidak ada",
        umur_kehamilan: "30 minggu",
        lingkar_perut: "90 cm",
        hasil_pemeriksaan: "Kondisi baik, janin aktif",
        nasihat: "Tetap jaga pola makan dan istirahat cukup.",
      },
      type: "kesehatan",
      user_data: {
        name: "Bidan Siti Aminah",
      },
    },
    {
      id: "uuid_catatan_2_def",
      return_date: "2025-07-01",
      created_at: "2025-06-15T09:00:00Z",
      pasien: "uuid_pengguna_contoh_12345",
      bidan: "uuid_bidan_pembuat_catatan",
      catatan: {
        metode_kontrasepsi: "IUD",
        tekanan_darah: "115/75 mmHg",
        berat_badan: "60 kg",
        keluhan: "Sedikit nyeri pasca pemasangan",
        umur_kehamilan: "N/A",
        lingkar_perut: "N/A",
        hasil_pemeriksaan: "Pemasangan berhasil, tidak ada komplikasi serius",
        nasihat: "Minum pereda nyeri jika diperlukan.",
      },
      type: "KB",
      user_data: {
        name: "Bidan Siti Aminah",
      },
    },
  ];
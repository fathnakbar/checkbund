import './types.js'; // Impor definisi tipe untuk JSDoc

/**
 * Kelas untuk berinteraksi dengan API backend MyBunda.
 * Menyediakan metode untuk autentikasi, manajemen pengguna, klinik, dan catatan.
 */
class MyBundaAPI {
  /**
   * @private
   * @type {string}
   */
  #baseUrl;

  /**
   * @private
   * @type {string | null}
   */
  #token = null; // Token autentikasi JWT

  /**
   * @param {string} baseUrl - Base URL dari API backend Anda (misalnya, 'http://localhost:3000/api/v1').
   */
  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
    // Coba memuat token dari localStorage saat inisialisasi
    if (typeof window !== 'undefined') { // Pastikan berjalan di browser
      this.#token = localStorage.getItem('MyBunda_jwt_token');
    }
  }

  /**
   * Mengatur token JWT untuk permintaan API berikutnya.
   * @param {string} token - Token JWT yang diterima dari login.
   */
  setToken(token) {
    this.#token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('MyBunda_jwt_token', token);
    }
  }

  /**
   * Mendapatkan token JWT yang tersimpan.
   * @returns {string | null} Token JWT jika ada, null jika tidak ada.
   */
  getToken() {
    return this.#token;
  }

  /**
   * Menghapus token JWT (logout).
   */
  clearToken() {
    this.#token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('MyBunda_jwt_token');
    }
  }

  /**
   * Helper untuk membuat permintaan HTTP.
   * @private
   * @template T - Tipe data yang diharapkan dalam respons.
   * @param {string} endpoint - Endpoint API relatif terhadap base URL.
   * @param {Object} options - Opsi untuk `Workspace` API.
   * @returns {Promise<ApiResponse & {data?: T}>} - Respons API standar.
   */
  async #request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.#token) {
      headers['Authorization'] = `Bearer ${this.#token}`;
    }

    try {
      const response = await fetch(`${this.#baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Handle API errors (e.g., 400, 401, 403, 404, 500)
        return {
          success: false,
          message: responseData.message || `API Error: ${response.status}`,
          error: responseData.error || { code: response.status, details: responseData },
        };
      }

      return {
        success: true,
        message: responseData.message || 'Success',
        data: responseData.data || responseData, // API mungkin membungkus data dalam properti 'data'
      };

    } catch (error) {
      console.error('Network or parsing error:', error);
      return {
        success: false,
        message: 'Network error or unable to process response.',
        error: error,
      };
    }
  }

  // --- Auth API ---

  /**
   * Mendaftarkan pengguna baru (Bidan atau Ibu Hamil).
   * @param {RegisterRequestBidan | RegisterRequestBumil} userData - Data registrasi pengguna.
   * @returns {Promise<ApiResponse & {data?: {user_id: string}}>}
   */
  async register(userData) {
    return this.#request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  /**
   * Melakukan login pengguna.
   * @param {LoginRequest} credentials - Kredensial login (email dan password).
   * @returns {Promise<ApiResponse & {data?: {token: string, user: UserDataResponseBumil | UserDataResponseBidan}}>}
   */
  async login(credentials) {
    const result = await this.#request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (result.success && result.data?.token) {
      this.setToken(result.data.token);
    }
    return result;
  }

  // --- User API ---

  /**
   * Mengambil data profil untuk pengguna yang sedang terautentikasi.
   * @returns {Promise<ApiResponse & {data?: UserDataResponseBumil | UserDataResponseBidan}>}
   */
  async getMyProfile() {
    return this.#request('/users/me');
  }

  /**
   * Mengambil data profil pengguna spesifik berdasarkan ID.
   * @param {string} userId - ID UUID pengguna.
   * @returns {Promise<ApiResponse & {data?: UserDataResponseBumil | UserDataResponseBidan}>}
   */
  async getUserProfile(userId) {
    return this.#request(`/users/${userId}`);
  }

  /**
   * Memperbarui sebagian data profil pengguna.
   * @param {string} userId - ID UUID pengguna yang akan diperbarui.
   * @param {Object} updateData - Objek yang berisi properti yang akan diperbarui (contoh: { phone: string, address: string, clinic: string|null }).
   * @returns {Promise<ApiResponse>}
   */
  async updateProfile(userId, updateData) {
    return this.#request(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });
  }

  // --- Clinic API ---

  /**
   * Mengambil daftar semua klinik yang terdaftar.
   * @returns {Promise<ApiResponse & {data?: ClinicResponse[]}>}
   */
  async getAllClinics() {
    return this.#request('/clinics');
  }

  /**
   * Mengambil detail klinik spesifik berdasarkan ID.
   * @param {string} clinicId - ID UUID klinik.
   * @returns {Promise<ApiResponse & {data?: ClinicResponse}>}
   */
  async getClinicDetails(clinicId) {
    return this.#request(`/clinics/${clinicId}`);
  }

  /**
   * Membuat klinik baru.
   * @param {CreateClinicRequest} clinicData - Data klinik baru.
   * @returns {Promise<ApiResponse & {data?: {clinic_id: string, clinic_data: ClinicResponse}}>}
   */
  async createClinic(clinicData) {
    return this.#request('/clinics', {
      method: 'POST',
      body: JSON.stringify(clinicData),
    });
  }

  /**
   * Mengambil daftar pasien yang terdaftar di klinik tertentu.
   * @param {string} clinicId - ID UUID klinik.
   * @returns {Promise<ApiResponse & {data?: UserDataResponseBumil[]}>}
   */
  async getClinicPatients(clinicId) {
    return this.#request(`/clinics/${clinicId}/patient`);
  }

  // --- Catatan (Patient Records) API ---

  /**
   * Membuat catatan medis baru untuk pasien tertentu.
   * @param {PostCatatanRequest} catatanData - Data catatan medis.
   * @returns {Promise<ApiResponse & {data?: {catatan_id: string, catatan_data: CatatanResponseItem}}>}
   */
  async createCatatan(catatanData) {
    return this.#request('/catatan', {
      method: 'POST',
      body: JSON.stringify(catatanData),
    });
  }

  /**
   * Mengambil semua catatan medis untuk pasien spesifik.
   * @param {string} pasienId - ID UUID pasien.
   * @returns {Promise<ApiResponse & {data?: CatatanResponseItem[]}>}
   */
  async getAllCatatanForPatient(pasienId) {
    return this.#request(`/users/${pasienId}/catatan`);
  }

  /**
   * Mengambil jadwal pertemuan berikutnya yang dimiliki pengguna.
   * @returns {Promise<ApiResponse & {data?: NextAppointmentResponse}>}
   */
  async getNextAppointment() {
    return this.#request(`/users/next-appointment`);
  }

  /**
   * Mengambil detail catatan medis spesifik berdasarkan ID catatan.
   * @param {string} catatanId - ID UUID catatan.
   * @returns {Promise<ApiResponse & {data?: CatatanResponseItem}>}
   */
  async getCatatanDetails(catatanId) {
    return this.#request(`/catatan/${catatanId}`);
  }

  /**
   * Memperbarui sebagian data catatan medis spesifik.
   * @param {string} catatanId - ID UUID catatan.
   * @param {Object} updateData - Objek yang berisi properti yang akan diperbarui (misalnya, catatan: CatatanDetail, return_date: string).
   * @returns {Promise<ApiResponse>}
   */
  async updateCatatan(catatanId, updateData) {
    return this.#request(`/catatan/${catatanId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });
  }

  /**
   * Menghapus catatan medis spesifik.
   * @param {string} catatanId - ID UUID catatan.
   * @returns {Promise<ApiResponse>}
   */
  async deleteCatatan(catatanId) {
    return this.#request(`/catatan/${catatanId}`, {
      method: 'DELETE',
    });
  }
}

// Ekspor instance SDK agar bisa langsung digunakan
// Pastikan Anda mengubah base URL ini sesuai dengan environment Anda
const api = new MyBundaAPI('http://localhost:3000/api/v1');
export default api;
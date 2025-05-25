/**
 * @typedef {'bumil' | 'bidan'} UserRole
 */

/**
 * @typedef {Object} LoginRequest
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterRequestBase
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {string} password
 */

/**
 * @typedef {RegisterRequestBase & { role: 'bidan', no_str: string }} RegisterRequestBidan
 */

/**
 * @typedef {RegisterRequestBase & { role: 'bumil', birth: string, husband: string }} RegisterRequestBumil
 */

/**
 * @typedef {Object} UserDataResponseBase
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {UserRole} role
 * @property {string | null} clinic
 * @property {string} created_at
 */

/**
 * @typedef {UserDataResponseBase & { role: 'bumil', birth: string, husband: string }} UserDataResponseBumil
 */

/**
 * @typedef {UserDataResponseBase & { role: 'bidan', no_str: string }} UserDataResponseBidan
 */

/**
 * @typedef {Object} SetUserClinicRequest
 * @property {string | null} clinic
 */

/**
 * @typedef {Object} CreateClinicRequest
 * @property {string} name
 * @property {string} contact
 * @property {string} address
 * @property {string} owner
 */

/**
 * @typedef {Object} ClinicResponse
 * @property {string} id
 * @property {string} name
 * @property {string} contact
 * @property {string} address
 * @property {string} owner
 * @property {string} created_at
 */

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
 * @property {string} pasien
 * @property {string} bidan
 * @property {string} type
 * @property {CatatanDetail} catatan
 * @property {string} return_date
 * @property {string} clinic
 */

/**
 * @typedef {Object} CatatanResponseItem
 * @property {string} id
 * @property {string} return_date
 * @property {string} created_at
 * @property {string} pasien
 * @property {string} bidan
 * @property {CatatanDetail} catatan
 * @property {string} type
 * @property {Object} user_data
 * @property {string} user_data.name
 */

/**
 * @typedef {Object} NextAppointmentResponse
 * @property {string} return_date
 * @property {Object} user_data
 * @property {string} user_data.name
 * @property {string} user_data.address
 * @property {string} user_data.contact
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Status keberhasilan permintaan.
 * @property {string} [message] - Pesan dari API (sukses atau error).
 * @property {Object} [data] - Data yang dikembalikan oleh API.
 * @property {Object} [error] - Objek error jika ada masalah.
 */
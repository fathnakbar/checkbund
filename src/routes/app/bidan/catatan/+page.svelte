<script>
  import { onMount } from "svelte";

  onMount(() => {
    window.location.hash // Get the id from the hash
  })
</script>


<div class="min-h-screen bg-gray-100">
    <div class="max-w-md mx-auto py-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-lg font-semibold mb-4">Tambah Catatan Kesehatan</h2>
        <form>
          <div class="mb-4">
            <label for="nama" class="block text-gray-700 font-medium mb-2">Nama Bumil</label>
            <input type="text" id="nama" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="umur" class="block text-gray-700 font-medium mb-2">Umur</label>
            <input type="text" id="umur" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="nama-suami" class="block text-gray-700 font-medium mb-2">Nama Suami</label>
            <input type="text" id="nama-suami" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="alamat" class="block text-gray-700 font-medium mb-2">Alamat</label>
            <input type="text" id="alamat" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="metode-kontrasepsi" class="block text-gray-700 font-medium mb-2">Metode Kontrasepsi</label>
            <input type="text" id="metode-kontrasepsi" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="nama-bidan" class="block text-gray-700 font-medium mb-2">Nama Bidan</label>
            <input type="text" id="nama-bidan" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="tanggal-pengecekan" class="block text-gray-700 font-medium mb-2">Tanggal Pengecekan</label>
            <input type="date" id="tanggal-pengecekan" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="tanggal-kembali" class="block text-gray-700 font-medium mb-2">Tanggal Kembali</label>
            <input type="date" id="tanggal-kembali" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="tekanan-darah" class="block text-gray-700 font-medium mb-2">Tekanan Darah</label>
            <input type="text" id="tekanan-darah" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="berat-badan" class="block text-gray-700 font-medium mb-2">Berat Badan</label>
            <input type="text" id="berat-badan" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="keluhan" class="block text-gray-700 font-medium mb-2">Keluhan</label>
            <textarea id="keluhan" rows="3" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <div class="mb-4">
            <label for="umur-kehamilan" class="block text-gray-700 font-medium mb-2">Umur Kehamilan</label>
            <input type="text" id="umur-kehamilan" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="lingkar-perut" class="block text-gray-700 font-medium mb-2">Lingkar Perut</label>
            <input type="text" id="lingkar-perut" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="hasil-pemeriksaan" class="block text-gray-700 font-medium mb-2">Hasil Pemeriksaan</label>
            <textarea id="hasil-pemeriksaan" rows="3" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <div class="mb-4">
            <label for="nasihat" class="block text-gray-700 font-medium mb-2">Nasihat</label>
            <textarea id="nasihat" rows="3" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
<script>
  import { onMount } from "svelte";
  import { getUserData, supabase, useProps } from "$lib/client";
  import { goto } from "$app/navigation"

  let pasien_id;
  let pasien_data;
  let type;
  let user;

  onMount(async () => {
    let hash = window.location.hash.replace("#", ""); // Get the id from the hash
    [pasien_id, type] = hash.split(",");
    pasien_data = (
      await supabase.from("user_data").select("*").eq("id", pasien_id)
    ).data[0];
    user = (await getUserData()).data;
  });

  async function handleSubmit() {
    let form = document.forms["catatan"];

    let values = Object.fromEntries(Array.from(form).map((el) => [el.name, el.value]));

    let catatan = useProps(
      values,
      "metode_kontrasepsi,tekanan_darah,berat_badan,keluhan,umur_kehamilan,lingkar_perut,hasil_pemeriksaan,nasihat"
    );

    console.log("Catatan", catatan);

    const {error} = await supabase
      .from("catatan")
      .insert({
        pasien: pasien_id,
        bidan: user.id,
        type,
        catatan,
        return_date: values.return_date,
        clinic: user.clinic,
      });

      if (!error) {
        goto("/app/bidan/catatan#" + pasien_id)
        return
      }
  }
</script>

<div class="min-h-screen bg-gray-100">
  <div class="max-w-md mx-auto py-8">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-lg font-semibold mb-4">
        Tambah Catatan {type && type[0]?.toUpperCase()}{type?.slice(1)}
      </h2>
      <form on:submit={handleSubmit} id="catatan">
        <div class="mb-4">
          <label for="nama-bidan" class="block text-gray-700 font-medium mb-2"
            >Nama Bidan</label
          >
          <input
            type="text"
            id="nama-bidan"
            name="bidan"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={user?.name}
            disabled={user?.name !== undefined}
          />
        </div>
        <div class="mb-4">
          <label for="nama" class="block text-gray-700 font-medium mb-2"
            >Nama Bumil</label
          >
          <input
            type="text"
            id="nama"
            name="name"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={pasien_data?.name}
            disabled
          />
        </div>
        <div class="mb-4">
          <label for="umur" class="block text-gray-700 font-medium mb-2"
            >Tanggal lahir</label
          >
          <input
            type="date"
            id="umur"
            name="birth"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={pasien_data?.birth}
            disabled={pasien_data?.birth}
          />
        </div>
        <div class="mb-4">
          <label for="nama-suami" class="block text-gray-700 font-medium mb-2"
            >Nama Suami</label
          >
          <input
            type="text"
            id="nama-suami"
            name="husband"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={pasien_data?.husband}
            disabled={pasien_data?.husband}
          />
        </div>
        <div class="mb-4">
          <label for="alamat" class="block text-gray-700 font-medium mb-2"
            >Alamat</label
          >
          <input
            type="text"
            name="address"
            id="alamat"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={pasien_data?.address}
            disabled={pasien_data?.address}
          />
        </div>
        <div class="mb-4">
          <label
            for="metode-kontrasepsi"
            class="block text-gray-700 font-medium mb-2"
            >Metode Kontrasepsi</label
          >
          <input
            type="text"
            name="metode_kontrasepsi"
            id="metode-kontrasepsi"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label
            for="tanggal-kembali"
            class="block text-gray-700 font-medium mb-2">Tanggal Kembali</label
          >
          <input
            type="date"
            name="return_date"
            id="tanggal-kembali"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label
            for="tekanan-darah"
            class="block text-gray-700 font-medium mb-2">Tekanan Darah</label
          >
          <input
            type="text"
            name="tekanan_darah"
            id="tekanan-darah"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="berat-badan" class="block text-gray-700 font-medium mb-2"
            >Berat Badan</label
          >
          <input
            type="text"
            name="berat_badan"
            id="berat-badan"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="keluhan" class="block text-gray-700 font-medium mb-2"
            >Keluhan</label
          >
          <textarea
            id="keluhan"
            name="keluhan"
            rows="3"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label
            for="umur-kehamilan"
            class="block text-gray-700 font-medium mb-2">Umur Kehamilan</label
          >
          <input
            type="text"
            name="umur_kehamilan"
            id="umur-kehamilan"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label
            for="lingkar-perut"
            class="block text-gray-700 font-medium mb-2">Lingkar Perut</label
          >
          <input
            type="text"
            name="lingkar_perut"
            id="lingkar-perut"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label
            for="hasil-pemeriksaan"
            class="block text-gray-700 font-medium mb-2"
            >Hasil Pemeriksaan</label
          >
          <textarea
            name="hasil_pemeriksaan"
            id="hasil-pemeriksaan"
            rows="3"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="nasihat" class="block text-gray-700 font-medium mb-2"
            >Nasihat</label
          >
          <textarea
            name="nasihat"
            id="nasihat"
            rows="3"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="flex justify-end">
          <button
            name="submit"
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >Simpan</button
          >
        </div>
      </form>
    </div>
  </div>
</div>

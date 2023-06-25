<script>
    import Scale from "../assets/icons/scale.svelte";
    import Stetoscope from "../assets/icons/stetoscope.svelte";
    import Vital from "../assets/icons/vital.svelte";
    export let item;
</script>

<li class="p-3 py-5 border-t">
    <div class="inline-flex text-sm">
        <Stetoscope class="w-5 h-5 mr-3" />
        <b>Catatan Nifas</b>
    </div>
    <div class="time text-gray-400 text-sm">
        <span class="stamp">07.15, 22 Juni 2023</span>
    </div>

    <div class="notes my-3 text-base">
        <!-- Discussed the importance of proper nutrition during pregnancy<span class="text-blue-400">...Selengkapnya</span> -->
    </div>

    <div class="info my-3">
        <div class="data-group inline-flex">
            <div class="flex items-center justify-center p-2 bg-blue-100 text-blue-500 rounded-md mr-2">
                <Vital class="w-5 h-5 mr-3"/>
                <span class="text-sm">120/80 mmHg</span>
            </div>
            <div class="flex items-center justify-center p-2 bg-blue-100 text-blue-500 rounded-md mr-2">
                <Scale class="w-5 h-5 mr-3"/>
                <span class="text-sm">60 Kg</span>
            </div>
        </div>
    </div>
    <span class="text-sm text-blue-500">Lihat detail</span>
</li>
<script>
    import Location from "../assets/icons/location.svelte";
    import { Button } from "flowbite-svelte";
    import More from "../assets/icons/more.svelte";
    import Call from "../assets/icons/call.svelte";
</script>

<div class="w-full flex justify-between mb-5">
    <div class="mb-3">
        <div class="text-base mb-1 font-bold">Klinik Ibu Sehat</div>
        <span class="text-gray-500 text-sm flex items-center">
            <Location class="w-4 h-4 mr-1" />
            Alamat klinik
        </span>
    </div>
    <div class="flex items-center">
        <Button size="xs" color="blue" class="rounded-md w-9 h-9" style="border-radius: 50%;">
            <Call class="w-7 h-7 text-white"/>
        </Button>
        <div style="margin: 0 7px"></div>
        <button><More height="20px" width="20px"/></button>
    </div>
</div>
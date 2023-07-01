<script>
    import { goto } from "$app/navigation"
    import { Button, DropdownItem, Dropdown } from "flowbite-svelte";
    import More from "../assets/icons/more.svelte";
    import Call from "../assets/icons/call.svelte";
  import { getUserData, supabase } from "../client";

    export let klinik;

    async function leaveClinic() {
        let {data} = await getUserData();
        console.log("LeaveClinic", data)
        await supabase.from("user_data").update({clinic: null}).eq("id", data.id);
        goto("/clinic");
        return
    }
</script>

<div class="w-full flex justify-between mb-5">
    <div class="mb-3">
      <div class="text-base mb-1">{klinik?.name}</div>
      <span class="text-gray-500 text-sm flex items-center">
        <!-- <Location class="w-4 h-4 mr-1" /> -->
        {klinik?.address}
      </span>
    </div>
    <div class="flex items-center ml-3">
      <Button
        href={"tel:" + klinik?.contact}
        size="xs"
        color="blue"
        class="rounded-md w-9 h-9"
        style="border-radius: 50%;"
      >
        <Call class="w-7 h-7 text-white" />
      </Button>
      <div style="margin: 0 7px" />
      <button><More height="20px" width="20px" /></button>
      <Dropdown>
        <DropdownItem class="text-red-500" on:click={leaveClinic}>Leave</DropdownItem>
      </Dropdown>
    </div>
  </div>
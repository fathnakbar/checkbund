<script>
    import Profile from "$lib/assets/icons/profile.svelte"
    import "$lib/app.css"

    export let name = "";
</script>

<div class="flex items-center justify-between mb-9">
    <div class="text-base font-bold">
        Welcome <br>
        {name}
    </div>
    <a href="/app/profile">
        <Profile class="w-7 h-7 text-black" />
    </a>
</div>
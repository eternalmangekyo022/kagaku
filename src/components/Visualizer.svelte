<script lang='ts'>
    import Switch from "./Switch.svelte";
    import { elements } from "../store";
    import { writable, type Writable } from "svelte/store";

    const active: Writable<boolean> = writable(false);
    const tabs: Tab[] = [{ name: 'Elements', elements: $elements }, { name: 'Bonds', elements: [] }];

</script>

<div class='h-full w-full'>
    <div class='h-full w-[15%] resize-x overflow-x-auto min-w-[12%] max-w-[35%] border-r-2'>
        <div class='w-full h-[6%] border-b-2 flex justify-center items-center gap-10'>
            <span>Elements</span>
            <Switch {active} className='w-[2.5rem] h-[1rem] cursor-pointer border-2 border-black'/>
            <span>Bonds</span>
        </div>
    </div>
</div>
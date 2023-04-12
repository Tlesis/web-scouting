<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
    //$: console.log(data);
</script>

<form class="flex flex-col text-w">
    <label for="email">Email:</label>
    <input type="email" id="email">
    <label for="password">Password</label>
    <input type="password" id="password">
    <button type="submit">Log in</button>
</form>

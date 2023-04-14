<script lang="ts">
    import { page } from "$app/stores";
    import { AllianceColor } from "$lib/types";

    const matchid = $page.url.searchParams.get("matchid");
    const teamid = $page.url.searchParams.get("teamid");
    const teamcolor = $page.url.searchParams.get("teamcolor");


</script>

<p class="text-center text-w">matchid: {matchid}<br>
                                teamid: {teamid}<br>
                                teamcolor: {teamcolor}</p>
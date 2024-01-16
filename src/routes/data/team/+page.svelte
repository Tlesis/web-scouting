<script lang="ts">
    import { redirect } from "@sveltejs/kit";

    throw redirect(308, "/data");
</script>
<!-- [scoutingAppUrl]/data/team doesnt exist so just kick a person off of it -->
blank
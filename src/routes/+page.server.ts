import type { ServerLoad } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ locals: { getSession } }) => {
    if (await getSession()) throw redirect(303, "/app");
}) satisfies ServerLoad;

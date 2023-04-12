import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals: { getSession }, url }) => {
    if (url.pathname !== "/" && !await getSession()) throw redirect(303, "/");
    return {
        session: getSession()
    };
};

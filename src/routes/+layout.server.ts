import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals: { getSession }, url }) => {
    if (!url.pathname.startsWith("/login") && !await getSession()) throw redirect(303, "/login?" + new URLSearchParams({ "redirect_url": url.pathname }).toString());
    return {
        session: getSession()
    };
};

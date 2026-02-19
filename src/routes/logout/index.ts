import { type RequestHandler } from "@builder.io/qwik-city";
import { clearSession } from "~/utils/auth";

export const onGet: RequestHandler = async ({ cookie, redirect }) => {
    clearSession(cookie);
    throw redirect(302, "/");
};

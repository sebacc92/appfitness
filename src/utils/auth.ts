import type { Cookie } from "@builder.io/qwik-city";

export const USER_SESSION_COOKIE_NAME = "user_session";
export const USER_ID_COOKIE_NAME = "user_id";

export const setSession = (cookie: Cookie, userId: string) => {
    // Set validation cookie (HttpOnly only)
    cookie.set(USER_SESSION_COOKIE_NAME, "true", {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "lax",
    });

    // Set user ID cookie (HttpOnly) for DB queries
    cookie.set(USER_ID_COOKIE_NAME, userId, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "lax",
    });
};

export const clearSession = (cookie: Cookie) => {
    cookie.delete(USER_SESSION_COOKIE_NAME, { path: "/" });
    cookie.delete(USER_ID_COOKIE_NAME, { path: "/" });
};

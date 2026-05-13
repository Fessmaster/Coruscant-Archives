import { auth } from "./app/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const { nextUrl } = req;

  const isAuthApiRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAuthPage = ["/login", "/register"].includes(nextUrl.pathname);
  const isActionRoute = ["/create", "/edit", "/delete", "/admin"].some((key) =>
    nextUrl.pathname.includes(key),
  );

  if (isAuthApiRoute) {
    return;
  }

  if (isAuthPage) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/people", nextUrl));
    }
    return;
  }
  if (isActionRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

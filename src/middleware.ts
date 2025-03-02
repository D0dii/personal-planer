import { auth } from "@/auth";

export default auth((req) => {
  if (
    req.auth &&
    (req.nextUrl.pathname === "/signin" || req.nextUrl.pathname === "/signup")
  ) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

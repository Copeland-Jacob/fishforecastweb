// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are public (sign-in, sign-up, etc.)
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  // 1. If user is signed in and tries to access a public route (like /sign-in)
  // redirect them to the dashboard immediately.
  if (userId && isPublicRoute(request)) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  // 2. If user is NOT signed in and tries to access a protected route
  if (!userId && !isPublicRoute(request)) {
    return (await auth()).redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

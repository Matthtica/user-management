import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/'],
  ignoredRoutes: ['/']
});

export const config = {
  matcher: ["/workspace/users", "/workspace/roles", "/workspace/editor"],
}

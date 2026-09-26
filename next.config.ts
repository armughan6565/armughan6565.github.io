import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages as a user site (https://armughan6565.github.io/), served
 * from the domain root, so no basePath/assetPrefix. Moving to a project site
 * (https://USER.github.io/REPO/) would need basePath plus fixing raw "/…" <a>/<img> paths.
 *
 * Security headers: static export cannot set response headers (`headers()` is unsupported
 * and GitHub Pages doesn't allow custom headers). github.io already enforces HTTPS + HSTS.
 * On a host that supports headers, re-add: X-Content-Type-Options: nosniff,
 * Referrer-Policy: strict-origin-when-cross-origin, X-Frame-Options: DENY,
 * Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=(),
 * Strict-Transport-Security: max-age=63072000; includeSubDomains.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;

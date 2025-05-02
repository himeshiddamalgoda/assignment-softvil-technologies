import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async headers() {
  //   const isDev = process.env.NODE_ENV === 'development';
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: isDev
  //             ? "script-src 'self' 'unsafe-eval';"
  //             : "script-src 'self';"
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;

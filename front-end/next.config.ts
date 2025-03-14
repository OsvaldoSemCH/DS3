/** @type {import('next').NextConfig} */

const nextConfig =
{
    images:
    {
        remotePatterns:
        [
            {protocol: "https", hostname: "**"}
        ]
    },
    rewrites: () =>
    {
        return [
            {
              source: "/",
              destination: "/auth",
            },
            {
                source: "/home",
                destination: "/home",
            },
        ]
    }
};

export default nextConfig;

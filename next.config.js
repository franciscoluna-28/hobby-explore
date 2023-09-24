/** @type {import('next').NextConfig} */
const nextConfig = {
    supabase: {
        client: {
            auth: {
                persistSession: true
            }
        }
      }
}



module.exports = nextConfig


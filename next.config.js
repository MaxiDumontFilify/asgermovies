/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
}


module.exports = {
  env: { 
    NEXT_PUBLIC_API_KEY:"65442aaeb9545a4b3c15a12cc419644b",
    NEXT_PUBLIC_API_URL:"https://api.themoviedb.org/3",

    NEXT_PUBLIC_FIREBASE_API_KEY:"AIzaSyAGWNSyQWQewWX-eab8k-ofiDMFKo6qVaU",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:"asgermovies2.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:"asgermovies2",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:"asgermovies2.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:"834539627185",
    NEXT_PUBLIC_FIREBASE_APP_ID:"1:834539627185:web:634f7fb1624f5cbab47890",
  },
  ...nextConfig,
}

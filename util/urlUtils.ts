const env:any = 'production'
// const env = 'dev'

export const loginApiUrl = env === 'dev' ? "http://localhost:3001/graphql" : "http://35.208.48.138/seller-signin";

export const loginUrl = env === 'dev' ? "http://localhost:3000/api/auth/" : "http://35.208.48.138/api/auth/";

export const baseUrl = env === 'dev' ? "http://localhost:3001/graphql" : "http://35.208.48.138/api/graphql/"
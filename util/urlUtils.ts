const env:any = 'production'
// const env = 'dev'
export const loginApiUrl = env === 'dev' ?"http://localhost:3001/graphql" : "http://kocart.com/api/graphql/";
export const loginUrl = env === 'dev' ? "http://localhost:3000/api/auth/" : "http://kocart.com/api/auth/";
export const baseUrl = env === 'dev' ? "http://localhost:3001/graphql" : "http://kocart.com/api/graphql/" 
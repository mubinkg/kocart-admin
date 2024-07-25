// const env:any = 'production'
// const env = 'dev'
const env:any = 'uat'
export const loginApiUrl = env === 'dev' ?"http://localhost:3001/graphql" : env === 'uat' ? "http://52.201.228.135/api/graphql/": "http://kocart.com/api/graphql/";

export const loginUrl = env === 'dev' ? "http://localhost:3000/api/auth/" : env === 'uat' ? "http://52.201.228.135/api/auth/": "http://kocart.com/api/auth/";

export const baseUrl = env === 'dev' ? "http://localhost:3001/graphql" : env === 'uat' ? "http://52.201.228.135/api/graphql/" : "http://kocart.com/api/graphql/"
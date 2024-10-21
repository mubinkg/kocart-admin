const env:any = 'production'
// const env = 'dev'
// const env:any = 'uat'

export const loginApiUrl = env === 'dev' ?"http://localhost:3001/graphql" : env === 'uat' ? "http://52.201.228.135/api/graphql/": "http://35.208.70.7/seller-signin";

export const loginUrl = env === 'dev' ? "http://localhost:3000/api/auth/" : env === 'uat' ? "http://52.201.228.135/api/auth/": "http://35.208.70.7/api/auth/";

export const baseUrl = env === 'dev' ? "http://localhost:3001/graphql" : env === 'uat' ? "http://52.201.228.135/api/graphql/" : "http://35.208.70.7/api/graphql/"
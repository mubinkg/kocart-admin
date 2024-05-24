const env:any = 'production'
// const env = 'dev'
export const loginApiUrl = env === 'dev' ?"http://localhost:3001/graphql" : "http://35.208.204.126/api/graphql/";
export const loginUrl = env === 'dev' ? "http://localhost:3000/api/auth/" : "http://35.208.204.126/api/auth/";
export const baseUrl = env === 'dev' ? "http://localhost:3001/graphql" : "http://35.208.204.126/api/graphql/" 
const env: any = 'production';
// const env = 'dev'

export const loginApiUrl =
  env === 'dev'
    ? 'http://localhost:3001/graphql'
    : 'http://34.170.86.152/seller-signin';

export const loginUrl =
  env === 'dev'
    ? 'http://localhost:3000/api/auth/'
    : 'http://34.170.86.152/api/auth/';

export const baseUrl =
  env === 'dev'
    ? 'http://localhost:3001/graphql'
    : 'http://34.170.86.152/api/graphql/';

import { GET_PRODUCT_DETAILS } from '@/graphql/product';
import { useQuery } from '@apollo/client';

export function useProductDetails(productId: string) {
  const { data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { productId },
    fetchPolicy: 'no-cache',
  });
  return { productDetails: data?.product };
}

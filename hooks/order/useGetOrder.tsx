import { GET_ORDER_DETIALS } from '@/graphql/order';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';

export default function useGetOrder(orderId: string) {
  const [getOrder, { data }] = useLazyQuery(GET_ORDER_DETIALS, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getOrder({
      variables: { orderId: orderId },
    });
  }, []);

  return { order: data?.order };
}

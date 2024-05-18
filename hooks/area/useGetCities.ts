import { ADMIN_CITY_LIST } from "@/graphql/city";
import { useLazyQuery, useQuery } from "@apollo/client";

export function useGetCities(){
    const [getCities,{data, loading, error}] = useLazyQuery(ADMIN_CITY_LIST, {fetchPolicy:'no-cache'})
    const cities = data?.adminCityList?.cities ? data?.adminCityList?.cities : []
    const count = data?.adminCityList?.count ? data?.adminCityList?.count : 0
    return {cities, count, loading, error, getCities}
}
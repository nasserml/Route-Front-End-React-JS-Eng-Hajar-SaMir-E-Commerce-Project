import { useQuery } from "@tanstack/react-query";


// share the logic
export default function useQueryCart(key, fn) {

    return useQuery({queryKey:[key], queryFn:fn, select: (data)=> data?.data})
 
}

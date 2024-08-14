import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCartApi } from "../APIS/cartApi";


export default function useMutationCart(key,fn) {
    
    const queryClient = useQueryClient()
    return useMutation({queryKey: [key],mutationFn:fn,onSuccess: ()=>{

        queryClient.invalidateQueries({ queryKey: ["getcart"]});
        if(fn === clearCartApi) {
            queryClient.setQueriesData('getcart', null);
        }

    } } );
 
}

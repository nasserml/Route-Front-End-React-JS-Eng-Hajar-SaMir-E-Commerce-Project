

import axios from "axios";

export async function getCategories() {

    try {

        
    let {data}  = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    return data;
        
    } catch (error) {

        return error?.message
        
    }
    
}

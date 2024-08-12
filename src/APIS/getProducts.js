
import axios from "axios";

export async function getProducts() {

    try {

        
    let {data}  = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    return data;
        
    } catch (error) {

        return error?.message
        
    }
    
}


export async function getProductsWithCategories(categoryId) {

    try {

        
    let {data}  = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`);
    return data;
        
    } catch (error) {

        return error?.message
        
    }
    
}

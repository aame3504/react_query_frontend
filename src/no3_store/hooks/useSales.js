import { userAllGetApi } from "../apis/user.api";
import { productAllGetApi } from "../apis/product.api";
import { salesAllGetApi } from "../apis/sales.api";

const userList =  userAllGetApi()
const productList = productAllGetApi()
const salesList = salesAllGetApi()

export const useAllGetSales = ()=>{

    const userObj = {}
    userList.forEach(item => {
        userObj[item.id]=item
    });
    const productObj = {}
    productList.forEach(item => {
        productObj[item.id]=item
    });
    const rowData = salesList.map(item=>({
        ...item,
        user_name: userObj[String(item.user_id)].name,
        product_name: productObj[String(item.product_id)    ].product_name,

    }))
    return rowData;
}


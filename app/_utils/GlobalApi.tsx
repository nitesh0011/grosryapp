import axios from 'axios';

interface RegisterData {
   username: string;
   email: string;
   password: string;
}
interface LoginData {
   email: string;
   password: string;
}


const axiosClient = axios.create({
   baseURL: "http://localhost:1337/api"
})

const getCategory = () => {
   return axiosClient.get("/categories?populate=*");
}
const getSliders = () => {
   return axiosClient.get("/sliders?populate=*").then(resp => { return resp.data.data });
}

const getCategoryList = () => {
   return axiosClient.get("/categories?populate=*").then(resp => { return resp.data.data });
}
const getProducts = () => {
   return axiosClient.get("/products?populate=*").then(resp => { return resp.data.data });
}
const getProductsList = (category: string) => {
   return axiosClient.get("/products?filters[categories][name][$in]=" + category + '&populate=*').then(resp => { return resp.data.data });
}
const PostProductsList = (data: any, jwt: string) => {
   return axiosClient.post("/user-carts", data, {
      headers: {
         Authorization: 'Bearer ' + jwt
      }
   });
}
const getItemsCart = (userID: any, jwt: string) => {
   return axiosClient.get("/user-carts?filters[userID][$eq]=" + userID + "&populate=*", {
      headers: {
         Authorization: 'Bearer ' + jwt
      }
   }).then(response => {
      return response.data.data
   })
}
const deleteItemsCart = (productid: number, jwt: string) => {
   return axiosClient.delete("/user-carts/" + productid, {
      headers: {
         Authorization: `Bearer ${jwt}`,

      },
   })
}

const RegisterUser = ({ username, email, password }: RegisterData) => {
   return axiosClient.post("/auth/local/register", { username: username, email: email, password: password });
}
const LoginUser = ({ email, password }: LoginData) => {
   return axiosClient.post("/auth/local", { identifier: email, password: password });
}

export default {
   getCategory,
   getSliders,
   getCategoryList,
   getProducts,
   getProductsList,
   PostProductsList,
   RegisterUser,
   LoginUser,
   getItemsCart,
   deleteItemsCart
}
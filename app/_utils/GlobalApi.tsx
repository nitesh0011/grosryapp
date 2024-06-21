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
});

const getCategory = async () => {
   try {
     const response = axiosClient.get("/categories?populate=*");
     return response;
   } catch (error) {
     console.error('Error fetching sliders:', error);
     return [];
   }
 };

 
const getSliders = async () => {
   try {
     const response = await axiosClient.get("/sliders?populate=*");
     return response.data.data;
   } catch (error) {
     console.error('Error fetching sliders:', error);
     return [];
   }
 };

const getCategoryList = () => {
   return axiosClient.get("/categories?populate=*").then(resp => resp.data.data);
};

const getProducts = () => {
   return axiosClient.get("/products?populate=*").then(resp => resp.data.data);
};

const getProductsList = (category: string) => {
   return axiosClient.get("/products?filters[categories][name][$in]=" + category + '&populate=*').then(resp => resp.data.data);
};

const PostProductsList = (data: any, jwt: string) => {
   return axiosClient.post("/user-carts", data, {
      headers: {
         Authorization: 'Bearer ' + jwt
      }
   });
};

const getItemsCart = (userID: any, jwt: string) => {
   return axiosClient.get("/user-carts?filters[userID][$eq]=" + userID + "&populate=*", {
      headers: {
         Authorization: 'Bearer ' + jwt
      }
   }).then(response => response.data.data);
};

const deleteItemsCart = (productid: number, jwt: string) => {
   return axiosClient.delete("/user-carts/" + productid, {
      headers: {
         Authorization: `Bearer ${jwt}`,
      },
   });
};

const RegisterUser = ({ username, email, password }: RegisterData) => {
   return axiosClient.post("/auth/local/register", { username, email, password });
};

const LoginUser = ({ email, password }: LoginData) => {
   return axiosClient.post("/auth/local", { identifier: email, password });
};

const GlobalApi = {
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
};

export default GlobalApi;
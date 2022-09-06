import axios from "axios";

export const getProductList = (searchProduct) => {
  try {
    return axios
      .get(`https://dummyjson.com/products/search?q=${searchProduct}`)
      .then((resonse) => {
        return resonse;
      });
  } catch (error) {
    console.log(error);
  }
};

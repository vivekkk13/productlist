import axios from "axios";

export const getProductList = (searchProduct) => {
  try {
    return axios
      .get(`https://dummyjson.com/products/search?q=${searchProduct}`, {
        params: {
          limit: 100,
          skip: 0,
        },
      })
      .then((resonse) => {
        return resonse;
      });
  } catch (error) {
    console.log(error);
  }
};

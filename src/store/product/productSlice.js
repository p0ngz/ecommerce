import { axiosClient } from "../../config/axios";
const initialProductState = {
  productID: "",
  productName: "",
  productImg: "",
  typeProduct: "",

  rating: 0,
  description: "",
  discount: 0,
  price: 0,
  variants: [], // color, size, inStock, sellingAmount
  inStock: 0,
  sellingAmountTotal: 0,
  createdAt: "",
};

export const createProductSlice = (set, get) => ({
  product: initialProductState,
  setProduct: (productData) => {
    set((state) => ({
      ...state,
      productData,
    }));
  },
  getProduct: () => {
    const product = get().product;
    return product;
  },
  getAllProduct: async (filter) => {
    try {
      let response;
      if (filter && Object.keys(filter).length > 0) {
        response = await axiosClient.get("/product", { params: { ...filter } });
        console.log("response: ", response)
      } else {
        console.log("no filter");
        response = await axiosClient.get("/product");
      }

      const products = response?.data?.products;
      if (!products || products.count === 0) {
        console.error("No products found");
      }

      return products;
    } catch (err) {
      if (err?.response?.status === 404) {
        return [];
      }
      console.error("Error getProduct data: ", err);
    }
  },
  getProductByProductId: async (productId) => {
    try {
      const response = await axiosClient.get("/product/" + productId);
      const product = response?.data;
      if (!product) {
        console.error("No product data found for ID: ", productId);
      }

      return product;
    } catch (err) {
      console.error("Error fetching product by ID: ", err);
    }
  },
  getTypeProduct: async () => {
    try {
      const response = await axiosClient.get("/product/type");
      const typeProducts = response?.data?.typeProducts;
      if (!typeProducts || typeProducts.length === 0) {
        console.error("No type products found");
      }

      return typeProducts;
    } catch (err) {
      console.error("Error fetching type product: ", err);
    }
  },
  getMAxPriceProduct: async () => {
    try {
      const response = await axiosClient.get("/product//price/max");
      const maxPriceProduct = response?.data?.maxPriceProduct;
      if (!maxPriceProduct || Object.keys(maxPriceProduct).length === 0) {
        console.error("No max price product found");
      }

      return maxPriceProduct
    }catch(err) {
      console.error("Error fetching max price product: ", err);
    }
  },
  createProduct: async (productData) => {
    try {
      const response = await axiosClient.post("/product", productData);
      const newProduct = response?.data?.newProduct;
      if (!newProduct || Object.keys(newProduct).length === 0) {
        console.error("Failed to create new product");
      }

      return newProduct;
    } catch (err) {
      console.error("Error creating product: ", err);
    }
  },
  updateProductByProductId: async (productId, productData) => {
    try {
      const response = await axiosClient.put("/product/" + productId, productData);
      const updatedProduct = response?.data?.updatedProduct;
      if (!updatedProduct || Object.keys(updatedProduct).length === 0) {
        console.error("Failed to update product for ID: ", productId);
      }

      return updatedProduct;
    } catch (err) {
      console.error("Error updating product by ID: ", err);
    }
  },
  getNewestProducts: async (limit) => {
    try {
      let response;
      if (!limit || limit <= 0) {
        response = await axiosClient.get("/product/newest");
      } else {
        response = await axiosClient.get("/product/newest", { params: { limit } });
      }
      const newestProducts = response?.data;
      if (!newestProducts || newestProducts.length === 0) {
        console.error("No newest products found");
      }

      return newestProducts;
    } catch (err) {
      console.error("Error getting newest products: ", err);
    }
  },
  getTopProducts: async (limit) => {
    try {
      let response;
      if (!limit || limit <= 0) {
        response = await axiosClient.get("/product/top");
      } else {
        response = await axiosClient.get("/product/top", { params: { limit } });
      }
      const topProducts = response?.data;
      if (!topProducts || topProducts.length === 0) {
        console.error("No top products found");
      }
      return topProducts;
    } catch (err) {
      console.error("Error getting top products: ", err);
    }
  },
  getTopRatingProducts: async (limit) => {
    try {
      let response;
      if (!limit || limit <= 0) {
        response = await axiosClient.get("/product/rating");
      } else {
        response = await axiosClient.get("/product/rating", { params: limit });
      }
      const topRatingProducts = response?.data;
      if (!topRatingProducts || topRatingProducts.length === 0) {
        console.error("No top rating products found");
      }

      return topRatingProducts;
    } catch (err) {
      console.error("Error getting top rating products: ", err);
    }
  },
  SoftDeleteProduct: async (productId, userId) => {
    try {
      const response = await axiosClient.delete("/product/" + productId, userId);
      const softDeletedProduct = response?.data;

      if (!softDeletedProduct.message) {
        console.error("Failed to soft delete product for ID: ", productId);
      }

      return softDeletedProduct;
    } catch (err) {
      console.error("Error soft deleting product by ID: ", err);
    }
  },
  hardDeleteProduct: async (productId) => {
    try {
      const response = await axiosClient.delete("/product/" + productId + "/hard");
      const hardDeletedProduct = response?.data;

      if (!hardDeletedProduct.message) {
        console.error("Failed to hard delete product for ID: ", productId);
      }
      return hardDeletedProduct;
    } catch (err) {
      console.error("Error hard deleting product by ID: ", err);
    }
  },
});

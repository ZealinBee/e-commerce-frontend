import {
  fetchAllProducts,
  createNewProduct,
  selectProduct,
  cleanUpProductReducer,
} from "../../redux/reducers/productsReducer";
import productServer from "../servers/productServer";
import store from "../store";
import { newProduct, invalidProduct } from "../data/products";

beforeEach(() => {
  store.dispatch(cleanUpProductReducer());
});

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

describe("Testing productReducers", () => {
  test("Check initial state", () => {
    expect(store.getState().productsReducer).toEqual({
      products: [],
      loading: false,
      error: null,
      searchResults: [],
      sortByCategory: null,
      sortByPrice: "Default",
      selectedProduct: null,
    });
  });
  test("Check fetchAllProducts", async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().productsReducer.products.length).toBe(4);
  });
  test("Check if a new product is created", async () => {
    await store.dispatch(createNewProduct(newProduct));
    expect(store.getState().productsReducer.products.length).toBe(1);
  });
  test("Check if invalid product created", async () => {
    await store.dispatch(createNewProduct(invalidProduct));
    expect(store.getState().productsReducer.products.length).toBe(0);
    expect(store.getState().productsReducer.error).toBe(
      JSON.stringify({
        statusCode: 400,
        message: [
          "price must be a positive number",
          "images must contain at least 1 image",
          "category does not exist",
        ],
        error: "Bad Request",
      })
    );
  });
});


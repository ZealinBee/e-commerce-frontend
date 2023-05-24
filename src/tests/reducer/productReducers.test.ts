import productReducers from "../../redux/reducers/productsReducer";
import store from "../store";
import { fetchAllProducts, createNewProduct, selectProduct } from "../../redux/reducers/productsReducer";

describe("Testing productReducers", () => {
  test("Check initialState", () => {
    const state = productReducers(undefined, { type: "" });
    expect(state).toEqual({
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
    expect(store.getState().productsReducer.products.length).toBeGreaterThan(0);
  });
  test("Check createProduct", async () => {
    await store.dispatch(createNewProduct({
        id: 1, 
        title: "Test",
        price: 100,
        description: "Test",
        categoryId: 1, 
        images: ["https://picsum.photos/640/640?r=6436"]
    }))
    expect(store.getState().productsReducer.products.length).toBeGreaterThan(0);
  })
});

export {};

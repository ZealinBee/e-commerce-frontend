import  NewProduct from "../../types/simpleProduct";
import  Product  from "../../types/Product";
import { category1, category2, category3 } from "./categories";

const product1: Product = {
    id: 1,
    title: "A  product",
    price: 100,
    description: "product 1",
    images: [],
    category: category1
}

const product2: Product = {
    id: 2,
    title: "B  product",
    price: 300,
    description: "product 2",
    images: [],
    category: category2
}

const product3: Product = {
    id: 3,
    title: "C  product",
    price: 200,
    description: "product 3",
    images: [],
    category: category3
}

const product4: Product = {
    id: 4,
    title: "D  product",
    price: 50,
    description: "product 4",
    images: [],
    category: category1
}

const newProduct: NewProduct = {
    title: "E product",
    price: 500,
    description: "new product",
    images: [""],
    categoryId: 3,
    id:5
}

const invalidProduct: NewProduct = {
    title: "E product",
    price: 0,
    description: "new product",
    images: [],
    categoryId: 5,
    id:12
}

export { product1, product2, product3, product4, newProduct, invalidProduct }
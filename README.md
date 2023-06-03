# Introduction

This project builds an e-commerce website with React, Redux and Typescript as well as SASS and MUI, all from scratch.

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)

## Table of Content

- [Technologies](#technologies)
- [Project Structure](#project-strucutre)
- [Getting Started](#getting-started)

## Technologies

- REACT
- TYPESCRIPT
- REDUX
- SASS
- MUI
- JEST

## Features

- Shows all the products from the API https://fakeapi.platzi.com/
- Contains sorting by price, sorting by category and search by product name functionality
- Admin can create, update and delete product in the product page (also in the modification page): email: admin@mail.com password: admin123
- Contains protected routes, admin and customer have different access privileges
- Register and login functionalities with validation
- Cart reducer, user can add to cart, modify quantity, empty cart and delete single cart items, app also asks for confirmation for emptying cart to prevent accidents

TODOS

- codebase cleanup, some files have too many lines
- search don't work hand in hand with sorting, still buggy need to be fixed
- image upload isn't ideal
- localstorage for the user data
- checkout functionalities for the future

## Project Structure

```
.
├── App.tsx
├── index.tsx
├── components
│   ├── AddProductForm.tsx
│   ├── ConfirmationPrompt.tsx
│   ├── DeleteProductForm.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── SortByCate.tsx
│   ├── SortByPrice.tsx
│   └── UpdateProductForm.tsx
├── pages
│   ├── Cart.tsx
│   ├── HomePage.tsx
│   ├── Login.tsx
│   ├── Modification.tsx
│   ├── NotFoundPage.tsx
│   ├── ProductPage.tsx
│   ├── ProfilePage.tsx
│   └── SignUp.tsx
├── redux
│   ├── store.ts
│   ├── hooks
│   │   ├── useAppDispatch.ts
│   │   └── useAppSelectors.ts
│   └── reducers
│       ├── cartReducer.ts
│       ├── categoriesReducer.ts
│       ├── productsReducer.ts
│       └── usersReducer.ts
├── styles
│   ├── styles.scss
│   ├── components
│   │   ├── _cart.scss
│   │   ├── _confirmation-prompt.scss
│   │   ├── _productcard.scss
│   │   └── _productlist.scss
│   └── pages
│       ├── _favpage.scss
│       ├── _homepage.scss
│       ├── _login.scss
│       ├── _modifications.scss
│       ├── _notfoundpage.scss
│       ├── _productpage.scss
│       └── _profilepage.scss
├── tests
│   ├── store.ts
│   ├── components
│   ├── data
│   │   ├── categories.ts
│   │   └── products.ts
│   ├── reducer
│   │   ├── cartReducer.test.ts
│   │   ├── productReducers.test.ts
│   │   └── usersReducer.test.ts
│   └── servers
│       └── productServers.ts
└── types
    ├── Authorization.ts
    ├── Category.ts
    ├── loginUser.ts
    ├── Product.ts
    ├── simpleProduct.ts
    ├── simpleUser.ts
    ├── updateProduct.ts
    └── User.ts

```

## Getting Started

Clone the repository from github with `git clone`  
Install the dependencies: `npm install`
Run the application: `npm start`
Link to the deployed website:[website]

[website]: https://zhiyuan-shop.netlify.app/

import { createContext, useState, useEffect } from "react";

// data
import PRODUCTS_DATA from "../shop-data.json"

export const ProductsContext = createContext({
    products: [],
    setProducts: () => null
})

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS_DATA)
    const value = { products, setProducts }

    // useEffect(() => {
    //     setProducts(PRODUCTS_DATA)
    // }, [])

    return(
        <ProductsContext.Provider
            value={value}
        >
            {children}
        </ProductsContext.Provider>
    )
}
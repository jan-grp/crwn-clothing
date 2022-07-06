import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // try to find index of product in items array
    const productInCartItems = cartItems.findIndex(product => product.id === productToAdd.id) // if found -> returns index - if not found -> returns -1

    // if found, increment quantity - else add product to cartItems with quantity of 1
    productInCartItems >= 0 ? cartItems[productInCartItems].quantity ++: cartItems.push({...productToAdd, quantity: 1 })

    // return new array with modified cart items
    return [...cartItems]
}

const removeCartItem = (cartItems, productToRemove) => {
    // try to find index of product in items array
    const productIndex = cartItems.findIndex(item => item.id === productToRemove.id) // returns -1 if items array doesn't contain product

    // decrease quantity or delete item/product from card if quantity is 0
    if(productIndex >= 0) {
        // product does exist in cartItems
        
        if(cartItems[productIndex].quantity === 1) {
            // quantity of item is 1 -> remove item from cart
            cartItems.splice(productIndex, 1)
        } else {
            // quantity is > 1 -> decrease quantity of item
            cartItems[productIndex].quantity--
        }
    }

    return [...cartItems]
}

const clearCartItem = (cartItems, productToRemove) => {
    // try to find index of product in items array
    const productIndex = cartItems.findIndex(item => item.id === productToRemove.id) // returns -1 if items array doesn't contain product

    // if product exists in items array, remove it from cart
    productIndex >= 0 && cartItems.splice(productIndex, 1)

    return [...cartItems]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {}
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartTotalPrice, setCartTotalPrice] = useState(0)

    useEffect(() => {
        const amount = cartItems.reduce((total, item) => total + item.quantity * item.price, 0)

        setCartTotalPrice(amount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)

        setCartItems(newCartItems)
    }

    const removeItemFromCart = (product) => {
        const newCartItems = removeCartItem(cartItems, product)

        setCartItems(newCartItems)
    }

    const clearItemFromCart = (product) => {
        const newCartItems = clearCartItem(cartItems, product)

        setCartItems(newCartItems)
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        removeItemFromCart,
        clearItemFromCart,
        cartTotalPrice
    }

    return(
        <CartContext.Provider
            value={value}
        >
            {children}
        </CartContext.Provider>
    )
}
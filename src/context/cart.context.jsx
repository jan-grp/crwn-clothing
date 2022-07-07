import { createContext, useReducer } from "react";

import { createAction } from '../utils/reducer/reducer.utils'

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
    removeItemFromCart: () => {},
    clearCartItem: () => {},
    cartTotalPrice: 0,
})

export const CART_ACTION_TYPES = {
    "SET_CART_ITEMS": "SET_CART_ITEMS"
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }

        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
  };

const INITIAL_STATE = {
    cartItems: [],
    isCartOpen: false,
    cartTotalPrice: 0,
}

export const CartProvider = ({ children }) => {
    const [{ cartItems, isCartOpen, cartTotalPrice }, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        // calc total amount to pay
        const totalAmount = newCartItems.reduce((total, item) => total + item.quantity * item.price, 0)

        // dispatch({ 
        //     type: CART_ACTION_TYPES.SET_CART_ITEMS, 
        //     payload: {
        //         cartItems: newCartItems,
        //         cartTotalPrice: totalAmount
        //     }
        // })

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotalPrice: totalAmount
            })
        )
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)

        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (product) => {
        const newCartItems = removeCartItem(cartItems, product)

        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (product) => {
        const newCartItems = clearCartItem(cartItems, product)

        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        if(typeof bool !== "boolean") return Error("function only accepts a boolen as parameter")

        // dispatch({
        //     type: CART_ACTION_TYPES.SET_CART_ITEMS,
        //     payload: {
        //         cartItems,
        //         cartTotalPrice,
        //         isCartOpen: bool
        //     }
        // })

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems,
                cartTotalPrice,
                isCartOpen: bool
            })
        )
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
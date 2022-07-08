import { createAction } from "../../utils/reducer/reducer.utils";

// action types
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    // try to find index of product in items array
    const productIndex = cartItems.findIndex(product => product.id === productToAdd.id) // if found -> returns index - if not found -> returns -1

    // product already is in cart -> increase quantity
    if(productIndex >= 0) {
        console.log("current quantity: ", productToAdd.quantity)
        cartItems[productIndex] = {...productToAdd, quantity: cartItems[productIndex].quantity + 1}
        return [...cartItems]
    }

    // product is not cart yet -> add to cart with quantity of 1
    return [...cartItems, {...productToAdd, quantity: 1}]
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

const clearCartItem = (cartItems, productToClear) => {
    // try to find index of product in items array
    const productIndex = cartItems.findIndex(item => item.id === productToClear.id) // returns -1 if items array doesn't contain product

    // if product exists in items array, remove it from cart
    productIndex >= 0 && cartItems.splice(productIndex, 1)

    return [...cartItems]
}

export const addItemToCart = (cartItems, itemToAdd) => {
    console.log("current cart items: ", cartItems)
    console.log("item to add: ", itemToAdd)
    const newCartItems = addCartItem(cartItems, itemToAdd)
    console.log("new cart items: ", newCartItems)

    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, itemToRemove) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove)

    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, itemToClear) => {
    const newCartItems = clearCartItem(cartItems, itemToClear)

    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const setCartIsOpen = bool => createAction(
    CART_ACTION_TYPES.SET_CART_IS_OPEN,
    bool
)
// utils
import { 
    createAction, 
    withMatcher, 
    ActionWithPayload
} from "../../utils/reducer/reducer.utils";

// types
import { 
    CART_ACTION_TYPES,
    CartItem
} from "./cart.types";
import { CategoryItem } from "../categories/categories.types";

const addCartItem = (
    cartItems: CartItem[], 
    productToAdd: CategoryItem
) : CartItem[] => {
    // try to find index of product in items array
    console.log("cartItems: ", cartItems)
    const productIndex = cartItems.findIndex(product => product.id === productToAdd.id) // if found -> returns index - if not found -> returns -1

    // product already is in cart -> increase quantity
    if(productIndex >= 0) {
        cartItems[productIndex] = {...productToAdd, quantity: cartItems[productIndex].quantity + 1}
        return [...cartItems]
    }

    // product is not cart yet -> add to cart with quantity of 1
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (
    cartItems: CartItem[], 
    productToRemove: CartItem
) : CartItem[] => {
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

const clearCartItem = (
    cartItems: CartItem[], 
    productToClear: CartItem
) : CartItem[] => {
    // try to find index of product in items array
    const productIndex = cartItems.findIndex(item => item.id === productToClear.id) // returns -1 if items array doesn't contain product

    // if product exists in items array, remove it from cart
    productIndex >= 0 && cartItems.splice(productIndex, 1)

    return [...cartItems]
}

export type SetCartIsOpen = ActionWithPayload<CART_ACTION_TYPES.SET_CART_IS_OPEN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setCartItems = withMatcher(
    (cartItems: CartItem[]) : SetCartItems => createAction(
        CART_ACTION_TYPES.SET_CART_ITEMS, 
        cartItems
    )
)

export const addItemToCart = (
    cartItems: CartItem[],
    productToAdd: CategoryItem
) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], itemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove)

    return setCartItems(newCartItems)
}

export const clearItemFromCart = (cartItems: CartItem[], itemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, itemToClear)

    return setCartItems(newCartItems)
}

export const setCartIsOpen = withMatcher(
    (bool: boolean) : SetCartIsOpen => createAction(
        CART_ACTION_TYPES.SET_CART_IS_OPEN,
        bool
    )
)
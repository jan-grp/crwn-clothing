import { AnyAction } from "redux";

// types
import { 
    CartItem 
} from "./cart.types";

// actions
import { setCartItems, setCartIsOpen } from "./cart.action";


export type CartState = {
    readonly isCartOpen: boolean
    readonly cartItems: CartItem[]
}

export const CART_INITIAL_STATE: CartState = {
    cartItems: [],
    isCartOpen: false,
}

export const cartReducer = (
    state = CART_INITIAL_STATE,
    action: AnyAction
) : CartState => {
    
    if(setCartIsOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload! // quick fix -> not type safe
        }
    }

    if(setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload! // quick fix -> not type safe
        }
    }

    return state
}
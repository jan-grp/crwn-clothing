import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTION_TYPES {
    SET_CART_IS_OPEN = "cart/SET_CART_IS_OPEN",
    SET_CART_ITEMS = "cart/SET_CART_ITEMS",
    // ADD_ITEM_TO_CART = "cart/ADD_ITEM_TO_CART",
    // REMOVE_ITEM_FROM_CART = "cart/REMOVE_ITEM_FROM_CART",
    // CLEAR_CART_ITEM = "cart/CLEAR_CART_ITEM"
}

export type CartItem = CategoryItem & {
    quantity: number
}


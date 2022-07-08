import { createSelector } from 'reselect'

const selectCartState = state => state.cart

export const selectCartItems = createSelector(
    [selectCartState],
    cart => cart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartState],
    cart => cart.isCartOpen
)

export const selectTotalCartPrice = createSelector(
    [selectCartItems],
    items => items.reduce((total, item) => total + item.price * item.quantity, 0)
)

export const selectAmountOfItemsInCart = createSelector(
    [selectCartItems],
    items => items.reduce((total, item) => total + item.quantity, 0)
)
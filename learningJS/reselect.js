const  { createSelector } = require("reselect")

const selectShopItems = state => state.shop.items
const selectTaxPercent = state => state.shop.taxPercent

const selectSubtotal = createSelector(selectShopItems, items =>{
    console.log("1")
    return items.reduce((subtotal, item) => subtotal + item.value, 0)
})

const selectTax = createSelector(
    selectSubtotal,
    selectTaxPercent,
    (subtotal, taxPercent) => {
        console.log("2")
        return subtotal * (taxPercent / 100)
    }
)

const selectTotal = createSelector(
    selectSubtotal,
    selectTax,
    (subtotal, tax) => {
        console.log("3")
        return { total: subtotal + tax }
    }
)

const selectSubtotal2 = (state) => {
    console.log("1a")
    const items = selectShopItems(state)
    return items.reduce((subtotal, item) => subtotal + item.value, 0)
}

const selectTax2 = (state) => {
    console.log("2a")
    const taxPercent = selectTaxPercent(state)
    const subtotal = selectSubtotal2(state)

    return subtotal * (taxPercent / 100)
}

const selectTotal2 = state => {
    console.log("3a")
    const subTotal = selectSubtotal2(state)
    const tax = selectTax2(state)

    return { total: subTotal + tax}
}

const exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.2 },
      { name: 'orange', value: 0.95 }
    ]
  }
}

function callSelectorsInSequence(times) {
    for(let i = 0; i < times; i++) {
        console.log(`----------run ${i}----------`)
        console.log(selectSubtotal(exampleState))
        console.log(selectTax(exampleState))
        console.log(selectTotal(exampleState))
    }
}

function callWithoutReselect(times) {
    for(let i = 0; i < times; i++) {
        console.log(`----------run ${i}----------`)
        console.log(selectSubtotal2(exampleState))
        console.log(selectTax2(exampleState))
        console.log(selectTotal2(exampleState))
    }
}

console.log("============WITH RESLECT============")
callSelectorsInSequence(2)

console.log("============WITHOUT RESLECT============")
callWithoutReselect(2)


// console.log(selectSubtotal(exampleState)) // 2.15
// console.log(selectTax(exampleState)) // 0.172
// console.log(selectTotal(exampleState)) // { total: 2.322 }

// console.log(selectSubtotal(exampleState)) // 2.15
// console.log(selectTax(exampleState)) // 0.172
// console.log(selectTotal(exampleState)) // { total: 2.322 }
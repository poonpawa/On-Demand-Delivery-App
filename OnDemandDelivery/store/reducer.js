const initialState = {
    products: [],
    total: 0,
    price: 0,

}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                products: [...state.products, action.product],
                total: state.total + 1,
                price: state.price + action.product.Price
            }
        case 'REMOVE_FROM_CART':
            return {
                products: state.products.filter(item => item.id !== action.product[0].ProductID),
                total: state.total - 1,
                price: state.price - action.product.Price
            }
        default:
            return state
    }
}

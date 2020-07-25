const initialState = {
    products: [],
    total: 0,
    price: 0,

}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            action.product.quantity++;
            let productInStore = state.products.find((item) => item.ProductId === action.product.ProductId);
            let newPrice = state.price + action.product.Price
            return {
                products: productInStore ? state.products : [...state.products, action.product],
                total: state.total + 1,
                price: +newPrice.toFixed(2)
            }
        case 'REMOVE_FROM_CART':
            let remainingPrice = state.price - action.product.Price;
            if (action.product.quantity > 0) {
                action.product.quantity--;
            }
            return {
                products: state.products.filter(item => item.id !== action.product.ProductId),
                total: state.total - 1,
                price: +remainingPrice.toFixed(2)
            }
        default:
            return state
    }
}

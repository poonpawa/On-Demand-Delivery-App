import { act } from "react-test-renderer";

const initialState = {
    products: [],
    total: 0,
    price: 0,
    store: ''

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
                price: +newPrice.toFixed(2),
                store: state.store
            }
        case 'REMOVE_FROM_CART':
            let remainingPrice = 0;         
            if (action.product.quantity > 0) {
                remainingPrice = state.price - action.product.Price;
                action.product.quantity--;
            }

            if (state.total > 0) {
                state.total--;
            }
            return {
                products: action.product.quantity === 0
                    ? state.products.filter(item => item.ProductId !== action.product.ProductId)
                    : state.products,
                total: state.total,
                price: +remainingPrice.toFixed(2),
                store: state.store
            }
        case 'DELETE_ITEM':
            let itemPrice = state.price - (action.product.Price * action.product.quantity);
            let itemQuantity = action.product.quantity;
            action.product.quantity = 0;

            return {
                products: state.products.filter(item => item.ProductId !== action.product.ProductId),
                total: state.total - itemQuantity,
                price: +itemPrice.toFixed(2),
                store: state.store

            }
        case 'UPDATE_STORE':
            return {
                products: state.products,
                total: state.total,
                price: state.price,
                store: action.store
            }
        case 'CLEAR_CART':
            return {
                products: initialState.products,
                total: initialState.total,
                price: initialState.price,
                store: state.store
            }
        default:
            return state
    }
}

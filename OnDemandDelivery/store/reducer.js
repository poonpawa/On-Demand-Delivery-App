const initialState = {
    products: [],
    total: 0,
    price: 0,

}

export default (state = initialState, action) => {
    switch (action.type) {
        /* case ADD_TO_CART:
            return { ...state }
        case REMOVE_FROM_CART:
            return { ...state } */

        default:
            return state
    }
}

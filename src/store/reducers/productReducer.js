const initState = {
    message:null
};
const productReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return state;
        case 'ADD_MESSAGE_ERROR':
               return state;
        case 'PRODUCT_ADDED':
            return {
                ...state,
                message:"PRODUCT ADDED TO CART"
            }
        case 'PRODUCT_ADDED_ERROR':
            return {
                ...state,
                message:"PRODUCT DIDN'T ADDED TO CART"
            }
        case 'ORDER_ADD':
            return {
                ...state,
                message:"ORDER SUBMITTED"
            }
        case 'ORDER_ADD_ERROR':
            return {
                ...state,
                message:"ORDER FAILED"
            }
        case 'DELETE_PRODUCT':
             return state;
        case 'DELETE_PRODUCT_ERROR':
             return state;
        default:
            return state;
    }
}
export default productReducer;
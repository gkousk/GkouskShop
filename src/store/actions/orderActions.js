export const createOrder = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const order = firestore.collection('orders').doc(id);
        order.update({ progress: "done" }).then(() => {
            dispatch({ type: 'UPDATE_ORDER', id });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_ORDER_ERROR', err });
        })
    }
};
export const ChangeQuantiti = (state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const quantities = state.quantities;
        const email = state.email;
        const products = state.products;
        const firestore = getFirestore();
        const cart = firestore.collection('cart').doc(email);
        cart.update({
            products: products,
            quantities: quantities
        }).then(() => {
            dispatch({ type: 'DELETE_PRODUCT' });
        }).catch((err) => {
            dispatch({ type: 'DELETE_PRODUCT_ERROR', err });
        })

    }
};
export const Order = (orde) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        console.log(orde);
        firestore.collection('orders').add({
            ...orde,
            courier: "ACS COURIER",
            progress: "processing",
            time: new Date()
        }).then(() => {
           dispatch({ type: 'ORDER_ADD'});
        }).catch((err) => {
            dispatch({ type: 'ORDER_ADD_ERROR', err });
        })
    }
};

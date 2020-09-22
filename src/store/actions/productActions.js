export const createProduct = (product)=>{
    return(dispatch,getState,{getFirebase,getFirestore}) => {
        const firestore =getFirestore();

        firestore.collection('products').add({
            ...product
        }).then(()=>{
            dispatch({type:'CREATE_PRODUCT',product});
        }).catch((err)=>{
            dispatch({type:'CREATE_PRODUCT_ERROR',err});
        })        
        
    }
};
export const SendMessage = (state)=>{
    return(dispatch,getState,{getFirebase,getFirestore}) => {
        const firestore =getFirestore();
        firestore.collection('messages').add({
            ...state
        }).then(()=>{
            dispatch({type:'ADD_MESSAGE',state});
        }).catch((err)=>{
            dispatch({type:'ADD_MESSAGE_ERROR',err});
        })        
        
    }
};
export const AddToCart = (product)=>{
    return(dispatch,getState,{getFirebase,getFirestore}) => {
        const firestore =getFirestore();
        var products=[];
        var quantities=[];
        var cart = firestore.collection('cart').doc(product.email);

        cart.get()
        .then(doc => {
            if (!doc.exists) {
                firestore.collection('cart').doc(product.email).set({
                    products:[product.id],
                    quantities:[1]
                }).then(()=>{
                    dispatch({type:'PRODUCT_ADDED',product});
                }).catch((err)=>{
                    dispatch({type:'PRODUCT_ADDED_ERROR',err});
                })  
            } else {
               products=doc.data().products;
               quantities=doc.data().quantities;
               products.push(product.id);
               quantities.push(1);
               firestore.collection('cart').doc(product.email).set({
                products:products,
                quantities:quantities
            }).then(()=>{
                dispatch({type:'PRODUCT_ADDED',product});
            }).catch((err)=>{
                dispatch({type:'PRODUCT_ADDED_ERROR',err});
            })  
            }
        })
        
              
        
    }
};
export const updateProduct = (product)=>{
    return(dispatch,getState,{getFirebase,getFirestore}) => {
        const firestore =getFirestore();  
        const id=product.id;
        const name=product.pname;
        const desc=product.desc;
        const price=product.price;
        const image=product.image;
        const category=product.category;
        const productupdate=firestore.collection('products').doc(id);



        if(name!==''){
            productupdate.update({ 
                name: name
            }).then(()=>{
                dispatch({type:'UPDATE_PRODUCT',id});
            }).catch((err)=>{
                dispatch({type:'UPDATE_PRODUCT_ERROR',err});
            })  
        }
        if(desc!==''){
            productupdate.update({ 
                description: desc
            }).then(()=>{
                dispatch({type:'UPDATE_PRODUCT',id});
            }).catch((err)=>{
                dispatch({type:'UPDATE_PRODUCT_ERROR',err});
            })  
        }
        if(price!==''){
            productupdate.update({ 
                price: price
            }).then(()=>{
                dispatch({type:'UPDATE_PRODUCT',id});
            }).catch((err)=>{
                dispatch({type:'UPDATE_PRODUCT_ERROR',err});
            })  
        }
        if(image!==''){
            productupdate.update({ 
                image: image
            }).then(()=>{
                dispatch({type:'UPDATE_PRODUCT',id});
            }).catch((err)=>{
                dispatch({type:'UPDATE_PRODUCT_ERROR',err});
            })  
        }
        if(category!==''){
            productupdate.update({ 
                category: category
            }).then(()=>{
                dispatch({type:'UPDATE_PRODUCT',id});
            }).catch((err)=>{
                dispatch({type:'UPDATE_PRODUCT_ERROR',err});
            })  
        }
    }
};


export const ChangeQuantities = (state)=>{
    return(dispatch,getState,{getFirebase,getFirestore}) => {
        const quantities=state.quantities;
        const email=state.email;
        const firestore =getFirestore();
        const cart=firestore.collection('cart').doc(email);
        cart.update({ 
            quantities: quantities
        })
    }
};

export const DeleteProduct = (state)=>{
    return(dispatch,getState,{getFirebase,getFirestore}) => {
        const quantities=state.quantities;
        const email=state.email;
        const products=state.products;
        const firestore =getFirestore();
        var cart=firestore.collection('cart').doc(email);
        cart.update({ 
            products:products,
            quantities: quantities
        }).then(()=>{
            dispatch({type:'DELETE_PRODUCT'});
        }).catch((err)=>{
            dispatch({type:'DELETE_PRODUCT_ERROR',err});
        })  
        
    }
};
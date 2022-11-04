import { createContext, useState, useEffect } from 'react';

import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';

//import SHOP_DATA from '../shop-data';         //we only need this import one time to set/create our collection on firestore, once its in there we dont need this import 

export const ProductsContext = createContext({
    products: []
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts ] = useState([]);

    // //we want to run useEffect on mount once to save our SHOP_DATA to firestore after creating the collection 
    // //we will delete this block of code b/c we dont want this block to run every time we login b/c it will reset our colleciton 
    // useEffect(() => {
    //     addCollectionAndDocuments('catagories', SHOP_DATA)   //addCollectionAndDocuments takes the collection name and bunch of objects(w/c are going to be documents within the collection)
    // }, [])

    const value = { products, setProducts };
    
    return (
        <ProductsContext.Provider value={value}>
            { children }
        </ProductsContext.Provider>
    );
    
};

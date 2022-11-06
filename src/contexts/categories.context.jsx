import { createContext, useState, useEffect } from 'react';

import {  getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

// import SHOP_DATA from '../shop-data';         //we only need this import one time to set/create our collection on firestore, once its in there we dont need this import 

export const CategoriesContext = createContext({
    categoriesMap: []
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap ] = useState({});

    // //we want to run useEffect on mount once to save our SHOP_DATA to firestore after creating the collection 
    // //we will delete this block of code b/c we dont want this block to run every time we login b/c it will reset our colleciton 
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)   //addCollectionAndDocuments takes the collection name and bunch of objects(w/c are going to be documents within the collection)
    // }, [])

    useEffect(() => {    //to pass an async function inside useEffect, we need to make our own async function inside the callback function and call it within the same callback(after we initialize it). rememeber getCategoriesAndDocuments is an async function w/c awaits getDocs and then reduce over its result to produce categoriesMap 
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap();
    }, [])

    const value = { categoriesMap, setCategoriesMap };
    
    return (
        <CategoriesContext.Provider value={value}>
            { children }
        </CategoriesContext.Provider>
    );
    
};

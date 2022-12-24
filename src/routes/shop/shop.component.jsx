import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch} from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { setCategories } from '../../store/categories/category.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import './shop.styles.scss';

//Shop contains nested route 
const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {    //to pass an async function inside useEffect, we need to make our own async function inside the callback function and call it within the same callback(after we initialize it). rememeber getCategoriesAndDocuments is an async function w/c awaits getDocs and then reduce over its result to produce categoriesMap 
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            //console.log(categoriesArray);
            dispatch(setCategories(categoriesArray));
        }
        getCategoriesMap();
    }, [])

    return(
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=':category' element={<Category/>} />
        </Routes>
        );
};

export default Shop;
import { useContext, Fragment } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.components';


const CategoriesPreview = () => {
    const { categoriesMap} = useContext(CategoriesContext);
    return(
        <Fragment>
            {
                //Object.keys(categoriesMap) will give us an array of object keys of our collection([hats, jackets, mens, sneakers, womens]) then map through the keys, then categoriesMap[title] will give back an array of products(i.e if title is hats, will give an array of hats products) 
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (<CategoryPreview key={title} title={title} products={products}/>)
                    }
            )}
        </Fragment>
        );
};

export default CategoriesPreview;
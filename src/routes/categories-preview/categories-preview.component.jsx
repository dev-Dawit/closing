import { Fragment } from 'react';
import { useSelector} from 'react-redux';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.components';
import Spinner from '../../components/spinner/spinner.component';

const CategoriesPreview = () => {
    const categoriesMap  = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading); 

    return(
        <Fragment>
            { isLoading ? <Spinner/> :
                //Object.keys(categoriesMap) will give us an array of object keys of our collection([hats, jackets, mens, sneakers, womens]) then map through the keys, then categoriesMap[title] will give back an array of products(i.e if title is hats, will give an array of hats products) 
                (Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (<CategoryPreview key={title} title={title} products={products}/>)
                    })
                )
            }
        </Fragment>
        );
};

export default CategoriesPreview;
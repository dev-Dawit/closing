import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';             //is used in dynamic routing to direct a route using a parameter passed as a path 
import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import './category.styles.scss';

//rendering a specific UI from a specific url
const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    },[category, categoriesMap]);

    return(
        <div className='category-container'>
            {
                products && products.map((product) => (<ProductCard key={product.id} product={product}/>)   )
            }
        </div>
    )
}

export default Category;
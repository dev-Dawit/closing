import { useContext } from "react";
//import shop_data from '../../shop_data.json';
import { ProductsContext } from "../../contexts/products.context";

const Shop = () => {

    const {products} = useContext(ProductsContext);
    return(
        <div>
            {products.map(({ id, name }) => (
                <div key={id}>
                    <h1>{name}</h1>
                </div>
            ))}
        </div>
    )
}

export default Shop;
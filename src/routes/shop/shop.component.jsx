import { useContext } from 'react'

// context
import { ProductsContext } from '../../context/products.context'

// components
import ProductCard from '../../components/product-card/product-card.component'

// styles
import "./shop.styles.scss"

const Shop = () => {
    const { products } = useContext(ProductsContext)
    
    return(
        <div className='products-container'>
            {
                products.map(product => {
                    const { id } = product
                    return (
                        <ProductCard 
                            key={id}
                            product={product}
                        />
                    )
                })
            }
        </div>
    )
}

export default Shop
import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'


// context
import { CategoriesContext } from '../../context/categories.context'

// component
import ProductCard from '../../components/product-card/product-card.component'

// styles
import "./category.styles.scss"

const Category = () => {
    const { categoriesMap } = useContext(CategoriesContext)

    const { category } = useParams()

    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return(
        <>    
            <h2 className='category-titleee'>{category}</h2>
            <div className='shop-category-container'>
                { products &&
                    products.map(product => (
                        <ProductCard 
                            key={product.id}
                            product={product}    
                        />
                    ))
                }
            </div>
        </>
    )
}

export default Category
import { useParams } from 'react-router-dom'
import {  useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// selectors
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selector'

// component
import ProductCard from '../../components/product-card/product-card.component'
import Spinner from '../../components/spinner/spinner'

// styles
import "./category.styles.scss"

const Category = () => {
    const { category } = useParams()
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)

    const [products, setProducts] = useState(categoriesMap[category])


    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return(
        <>    
            <h2 className='category-titleee'>{category}</h2>
            {
                isLoading ? (
                    <Spinner />
                ) : (
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
                )
            }

        </>
    )
}

export default Category
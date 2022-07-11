import { useParams } from 'react-router-dom'
import {  useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// selectors
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selector'

// component
import ProductCard from '../../components/product-card/product-card.component'
import Spinner from '../../components/spinner/spinner'

// styles
import { CategoryContainer, Title } from './category.styles'


type CategoryRouteParams = {
    category: string
}

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)

    const [products, setProducts] = useState(categoriesMap[category])


    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return(
        <>    
            <Title>{category}</Title>
            {
                isLoading ? (
                    <Spinner />
                ) : (
                    <CategoryContainer>
                        { products &&
                            products.map(product => (
                                <ProductCard 
                                    key={product.id}
                                    product={product}    
                                />
                            ))
                        }
                    </CategoryContainer>
                )
            }

        </>
    )
}

export default Category
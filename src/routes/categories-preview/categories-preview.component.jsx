import { useContext } from 'react'

// context
import { CategoriesContext } from '../../context/categories.context'

// components
import ProductCard from '../../components/product-card/product-card.component'
import CategoryPreview from '../../components/category-preview/category-preview.component'

// styles

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)
    return(
        <>
            {
                Object.keys(categoriesMap).map(key => {
                    const products = categoriesMap[key]

                    return(
                        <CategoryPreview 
                            key={key}
                            title={key}
                            products={products}
                        />
                    )
                })
            }

        </>
    )
}

export default CategoriesPreview
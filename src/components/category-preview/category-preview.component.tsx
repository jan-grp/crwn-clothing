import { FC } from 'react'

// types
import { CategoryItem } from '../../store/categories/categories.types'

// components
import ProductCard from '../product-card/product-card.component'

// styles
import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles'

type CategoryPreviewProps = {
    title: string
    products: CategoryItem[]
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
    return(
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>

            <Preview>
                {
                    products
                        .filter((_, i) => i < 4 )
                        .map(product => (
                            <ProductCard 
                                key={product.id}
                                product={product}
                            />
                        ))
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview
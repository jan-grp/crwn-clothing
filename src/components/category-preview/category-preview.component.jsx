import { Link } from 'react-router-dom'

// components
import ProductCard from '../product-card/product-card.component'

// styles
import "./category-preview.styles.scss"


const CategoryPreview = ({ title, products }) => {
    return(
        <div className="category-preview-container">
            <Link to={`/shop/${title.toLowerCase()}`}>
                <h2>
                    <span className="title">{title.toUpperCase()}</span>
                </h2>
            </Link>

            <div className="preview">
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
            </div>
        </div>
    )
}

export default CategoryPreview

// styles
import './categories.styles.scss';

// components
import CategoryItem from "../category-item/category-item.component"

const CategoriesMenu = ({ categories }) => {

    return(
        <div className="categories-container">
            {
                categories.map((category, i) => (
                    <CategoryItem 
                        category={category}
                        key={category.id}
                    />)
                )
            }
        </div>
    )
}

export default CategoriesMenu
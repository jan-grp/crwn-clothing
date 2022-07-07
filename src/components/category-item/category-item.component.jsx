import { useNavigate } from 'react-router-dom'

// styles
import "./category-item.styles.scss"

const CategoryItem = ({ category }) => {
    const { id, title, imageUrl, route } = category
    
    const navigate = useNavigate()

    const handleNavigation = () => navigate(route)

    return(
        <div 
            className="category-container"
            key={id}
            onClick={handleNavigation}
        >
            <div 
                className='background-image' 
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}  
            />
            <div className='category-body-container'>
                <h2>{title}</h2> 
                <p>Shop Now</p>
            </div>
        </div>


    )
}

export default CategoryItem
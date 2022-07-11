import { useNavigate } from 'react-router-dom'
import { FC } from 'react'

// styles
import { BackgroundImage, Body, DirectoryItemContainer } from './category-item.styles'

// types
import { MenuCategory } from '../categories-menu/categories-menu.component'

type CategoryItemProps = {
    category: MenuCategory
}

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
    const { id, title, imageUrl, route } = category
    
    const navigate = useNavigate()

    const handleNavigation = () => navigate(route)

    return(
        <DirectoryItemContainer 
            key={id}
            onClick={handleNavigation}
        >
            <BackgroundImage imageUrl={imageUrl}/>

            <Body>
                <h2>{title}</h2> 
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>


    )
}

export default CategoryItem
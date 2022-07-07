import { Routes, Route } from "react-router-dom"

// components
import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"

// styles
import "./shop.styles.scss"

const Shop = () => {
    
    return(
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
}

export default Shop
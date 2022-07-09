import { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { useDispatch } from 'react-redux';

// actions
import { fetchCategoriesStart } from '../../store/categories/categories.action'

// components
import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"

// styles
import "./shop.styles.scss"

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, [dispatch]);
  
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    );
}

export default Shop
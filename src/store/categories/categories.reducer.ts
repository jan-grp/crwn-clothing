import { AnyAction } from "redux"

// types
import { Category } from "./categories.types"

// actions
import { 
    fetchCategoriesStart, 
    fetchCategoriesSuccess, 
    fetchCategoriesFailed 
} from './categories.action'

export type CategoriesState = {
    readonly categories: Category[]
    readonly isLoading: boolean
    readonly error: Error | null
}
  
export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE,
    action = {} as AnyAction
  ): CategoriesState => {
    if (fetchCategoriesStart.match(action)) {
        return { 
            ...state, 
            isLoading: true 
        }
    }
  
    if (fetchCategoriesSuccess.match(action)) {
        return { 
            ...state, 
            categories: action.payload!, // quick fix -> not type safe
            isLoading: false 
        }
    }
  
    if (fetchCategoriesFailed.match(action)) {
      return { 
            ...state, 
            error: action.payload!, // quick fix -> not type safe
            isLoading: false 
        }
    }
  
    return state;
};
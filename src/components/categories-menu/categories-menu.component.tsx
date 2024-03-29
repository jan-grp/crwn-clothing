import { Key } from 'react'

// styles
import { DirectoryContainer } from './categories.styles'

// components
import CategoryItem from "../category-item/category-item.component"

export type MenuCategory = {
  id: Key;
  title: string;
  imageUrl: string;
  route: string;
}

const CategoriesMenu = () => {

  const categories: MenuCategory[] = [
    {
      id: 1,
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
      route: "shop/hats"
    },
    {
      id: 2,
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      route: "shop/jackets"
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      route: "shop/sneakers"
    },
    {
      id: 4,
      title: "womens",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
      route: "shop/womens"
    },
    {
      id: 5,
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
      route: "shop/mens"
    }
  ]

  return(
    <DirectoryContainer>
      {
        categories.map((category, i) => (
          <CategoryItem 
            category={category}
            key={category.id}
          />)
        )
      }
    </DirectoryContainer>
  )
}

export default CategoriesMenu
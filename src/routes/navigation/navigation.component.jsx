import { Outlet, Link } from "react-router-dom"
import { Fragment } from "react"
import { useSelector } from 'react-redux'

// utils
import { signOutUser } from '../../utils/firebase/firebase.utils'

// selectors
import { selectCurrentUser } from "../../store/user/user.selector"
import { selectIsCartOpen } from "../../store/cart/cart.selector"

// components
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

// styles
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import {
    LogoContainer,
    NavLink,
    NavLinksContainer,
    NavigationContainer
} from './navigation.styles'

const Navigation = () => {
    // const { isCartOpen } = useContext(CartContext)

    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    const handleSignOut = async () => {
        try {
            await signOutUser()
        } catch (err) {
            console.error("error while signing out user: ", err)
        }
    }

    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo />
            </LogoContainer>

            <NavLinksContainer>
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>

                {
                    currentUser ? (
                        <NavLink 
                            as="span"
                            onClick={handleSignOut}
                        >
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink className="nav-link" to="/authentication">
                            SIGN IN
                        </NavLink>
                    )
                }

                <CartIcon />

            </NavLinksContainer>

            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
}

export default Navigation
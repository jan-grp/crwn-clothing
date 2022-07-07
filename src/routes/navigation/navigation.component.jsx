import { Outlet, Link } from "react-router-dom"
import { Fragment, useContext } from "react"

// styles
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import {
    LogoContainer,
    NavLink,
    NavLinksContainer,
    NavigationContainer
} from './navigation.styles'

// utils
import { signOutUser } from '../../utils/firebase/firebase.utils'

// context
import { UserContext } from '../../context/user.context'
import { CartContext } from "../../context/cart.context"

// components
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

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
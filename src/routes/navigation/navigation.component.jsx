import { Outlet, Link } from "react-router-dom"
import { Fragment } from "react"
import { useSelector, useDispatch } from 'react-redux'

// actiosn
import { signOut } from "../../store/user/user.action"

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
    const dispatch = useDispatch()

    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    const handleSignOut = () => dispatch(signOut())

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
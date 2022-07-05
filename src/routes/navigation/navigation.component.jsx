import { Outlet, Link } from "react-router-dom"
import { Fragment, useContext } from "react"

// styles
import "./navigation.styles.scss"
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

// utils
import { signOutUser } from '../../utils/firebase/firebase.utils'

// context
import { UserContext } from '../../context/user.context'

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const handleSignOut = async () => {
        try {
            await signOutUser()
        } catch (err) {
            console.error("error while signing out user: ", err)
        }
    }

    return(
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo />
            </Link>

            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>

                {
                    currentUser ? (
                        <span 
                            className="nav-link"
                            onClick={handleSignOut}
                        >
                            SIGN OUT
                        </span>
                    ) : (
                        <Link className="nav-link" to="/authentication">
                            SIGN IN
                        </Link>
                    )
                }

            </div>
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation
import React from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../store"
// import { SkipNavLink, SkipNavContent } from "@chakra-ui/skip-nav"

//First Thing we can do is change this into react hooks 


const Navbar = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
    const auth = useSelector((state) => state.auth)
    const isLoggedIn = !!auth.id
    
    const handleClick = () =>  {
      dispatch(logout())
    }

    return (
        <div>
            <nav>
                <img
                    src="https://gamingymas.files.wordpress.com/2016/05/logo-pokemon.png"
                    alt="logo"
                />
                {isLoggedIn ? (
                    <div>
                        {/* The navbar will show these links after you log in */}
                        <Link to="/home">Home</Link>
                        <Link to={`/users/${auth.id}/cart`}>
                            {/* Cart ({user.updatedPrices.length}) */}
                            Cart ({user.updatedPrices ? user.updatedPrices.length : 0})
                        </Link>
                        <Link to="/products">Products</Link>
                        <Link to={`/users/${auth.id}`}>My Profile</Link>
                        {auth.isAdmin ? (
                            <Link to={`/users`}>All Users</Link>
                        ) : (
                            console.log("NOT ADMIN ALL USERS NOT RENDERING ")
                        )}
                        <a href="#" onClick={handleClick}>
                            Logout
                        </a>
                    </div>
                ) : (
                    <div>
                        {/* The navbar will show these links before you log in */}
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/products">Products</Link>
                    </div>
                )}
            </nav>
        </div>
    )
}

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     auth: state.auth,
//     isLoggedIn: !!state.auth.id,
//     user: state.user,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     },
//   }
// }

export default Navbar

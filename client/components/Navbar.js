import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../store"
import { fetchUserCart, fetchUser } from "../redux/singleUser"

const Navbar = ({ handleClick, isLoggedIn, user, auth }) => (
  <div>
    <nav>
      {console.log("USERRRRRR", user)}
      <img
        src="https://gamingymas.files.wordpress.com/2016/05/logo-pokemon.png"
        alt="logo"
      />
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to={`/users/${auth.id}/cart`}>
            Cart ({user.updatedPrices.length})
          </Link>
          <Link to="/products">Products</Link>
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

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

//TRYING TO GET NAVBAR CART(X) TO POPULATE DYNAMICALLY UPON LOGIN
//REFACTORED NAVBAR STATELESS FUNCTIONAL COMPONENT INTO A CLASS COMPONENT
//LIMITED SUCCESS SEE BELOW COMMENTS
// class Navbar extends React.Component {
//   // const Navbar = ({ handleClick, isLoggedIn, user, auth }) => (

//   // componentDidMount() {
//   //   if (this.props.isLoggedIn) {
//   //     this.props.getUser(Number(this.props.auth.id))
//   //     let yo = this.props.getOrders(Number(this.props.auth.id))
//   //     console.log(yo)
//   //   }
//   // }

//   getOrdersUponLogin = () => {
//     if (this.props.isLoggedIn) {
//       this.props.getUser(Number(id))
//       this.props.getOrders(Number(this.props.auth.id))
//       return
//     }
//   }

//   //Im able to get it populate under ComponentDidUpdate Lifecylce but it infinitley loops because
//   //i am changing props/state. dont know why its infinitley looping if i am just fetching something one time tho
//   // componentDidUpdate() {
//   //   this.getOrdersUponLogin()
//   // }

//   render() {

//     // ({ handleClick, isLoggedIn, user, auth } = this.props)
//     const handleClick = this.props.handleClick
//     const isLoggedIn = this.props.isLoggedIn
//     const user = this.props.user
//     const auth = this.props.auth
//     return (
//       <div>
//         <nav>
//           <img
//             src="https://gamingymas.files.wordpress.com/2016/05/logo-pokemon.png"
//             alt="logo"
//           />
//           {isLoggedIn ? (
//             <div>
//               {/* The navbar will show these links after you log in */}
//               <Link to="/home">Home</Link>
//               <Link to={`/users/${auth.id}/cart`}>
//                 Cart ({user.itemQuantities.length})
//               </Link>
//               <Link to="/products">Products</Link>
//               <a href="#" onClick={handleClick}>
//                 Logout
//               </a>
//             </div>
//           ) : (
//             <div>
//               {/* The navbar will show these links before you log in */}
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Sign Up</Link>
//               <Link to="/products">Products</Link>
//             </div>
//           )}
//         </nav>
//       </div>
//     )
//   }
// }

// /**
//  * CONTAINER
//  */
// function mapState(state) {
//   return {
//     auth: state.auth,
//     isLoggedIn: !!state.auth.id,
//     user: state.user,
//   }
// }

// function mapDispatch(dispatch) {
//   return {
//     handleClick() {
//       dispatch(logout())
//     },
//     getOrders: (id) => dispatch(fetchUserCart(id)),
//     getUser: (id) => dispatch(fetchUser(id)),
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)

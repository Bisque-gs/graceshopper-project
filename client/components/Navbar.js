import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../store"
import Search from "./Search"

const Navbar = ({ handleClick, isLoggedIn, user, auth }) => {
  return (
    <div>
      <nav>
        <a href={`/home`}>
          <img
            src="https://gamingymas.files.wordpress.com/2016/05/logo-pokemon.png"
            alt="logo"
          />
        </a>
        <Search auth={auth} />

        {/* <iframe
          src="https://www.google.com/webhp?igu=1&gws_rd=ssl"
          width="640"
          height="480"
          frameborder="0"
        >
          Your browser does not support <code>iframe</code>s. Please consider
          using a <a href="http://browsehappy.com/">modern</a> browser.
        </iframe> */}
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
            <Link to="/users/guest/cart">Cart</Link>
          </div>
        )}
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    user: state.user,
    products: state.products,
    users: state.allUsers,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchUserSearch() {
      dispatch
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

// // TRYING TO GET NAVBAR CART(X) TO POPULATE DYNAMICALLY UPON LOGIN
// // REFACTORED NAVBAR STATELESS FUNCTIONAL COMPONENT INTO A CLASS COMPONENT
// // LIMITED SUCCESS SEE BELOW COMMENTS

// //Try having the local state be the number of the orders
// //then use setState to update the value dynamically
// class Navbar extends React.Component {
//   // const Navbar = ({ handleClick, isLoggedIn, user, auth }) => (

//   componentDidMount() {
//     if (this.props.isLoggedIn) {
//       this.getOrdersUponLogin()
//       // this.props.getUser(Number(this.props.auth.id))
//       // let yo = this.props.getOrders(Number(this.props.auth.id))
//       // console.log(yo)
//     }
//   }

//   getOrdersUponLogin = () => {
//     if (this.props.isLoggedIn) {
//       this.props.getUser(this.props.auth.id)
//       this.props.getOrders(Number(this.props.auth.id))
//       return
//     }
//   }

//   componentDidUpdate(prevProps) {
//     console.log('componentDidUpdate')
//     //  this.getOrdersUponLogin()
//     // if (
//     //   prevProps.getUser(Number(this.props.auth.id)) !==
//     //   this.props.getUser(Number(this.props.auth.id))
//     // ) {
//     if (prevProps.auth.id !== this.props.auth.id) {
//       this.getOrdersUponLogin()
//     }

//      if (
//        prevProps.user.updatedPrices.length !==
//        this.props.user.updatedPrices.length
//      ) {
//        console.log('ONE')
//      this.getOrdersUponLogin()
//   }
// }

//   //Im able to get it populate under ComponentDidUpdate Lifecylce but it infinitley loops because
//   //i am changing props/state. dont know why its infinitley looping if i am just fetching something one time tho
//   // componentDidUpdate() {
//   //   this.getOrdersUponLogin()
//   // }

//   //It renders the cart quantity upon login..... but is not dynamically updating whenever i add or remove an item from the cart
//   //which is strange because im mapping state to props from the user from the store
//   //user in the store refers to the single user Redux file & whenever i add or remove something it changes the: this.props.user.updatedPrices
//   //thus my props are changing so why isnt react triggering a re render ?
//   //its because my component did update only re renders upon login and not when the cart changes
//   //change the if statement in the Component did update to trigger a re render

//   //Maybe check out thunks/routes? connect some buttons with eachother?
//   //

//   render() {
//     console.log("THIS.PROPS", this.props.user.updatedPrices)
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
//                 Cart ({user.updatedPrices.length})
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

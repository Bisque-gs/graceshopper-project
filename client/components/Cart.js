import React from "react"
import { connect } from "react-redux"
import {
  fetchUser,
  fetchUserCart,
  deleteItemCartThunk,
  updateQuantityThunk,
} from "../redux/singleUser"
import CartUser from "./CartUser"
import CartGuest from "./CartGuest"

//We will grab a user orders from singleUser redux store
// Have an option to grab all orders
//have an option to grab current orders
//reducer
class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      guestCart: window.localStorage.getItem("cart") || "",
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params
    // also gets info for guests
    this.props.getUser(Number(id))
    if (id) {
      this.props.getOrders(Number(id))
    } else {
      this.setState({
        guestCart: window.localStorage.getItem("cart"),
      })
    }
  }

  clickDelete = (deleteInfo) => {
    const { id } = this.props.match.params
    if (id) {
      this.props.deleteItemfromCart(deleteInfo)
    } else {
      const cart = JSON.parse(this.state.guestCart)
      const updatedCart = cart.filter((x) => x.id != deleteInfo.productId)

      window.localStorage.setItem("cart", JSON.stringify(updatedCart))

      this.setState({
        guestCart: JSON.stringify(updatedCart),
      })
    }
  }

  adjustQuantity = (obj) => {
    const { id } = this.props.match.params

    if (id) {
      this.props.updateQuantity(obj)
    } else {
      const cart = JSON.parse(this.state.guestCart)
      const updatedCart = cart.reduce((acc, x) => {
        if (x.id == obj.productId && Number(x.quantity) + obj.quantity >= 0) {
          x.quantity = Number(x.quantity) + obj.quantity
        }
        return acc.concat(x)
      }, [])

      window.localStorage.setItem("cart", JSON.stringify(updatedCart))
      // console.log(guestCart)

      this.setState({
        guestCart: JSON.stringify(updatedCart),
      })
      // console.log(this.state.guestCart)
    }
  }

  render() {
    const { userInfo, auth } = this.props
    // userInfo.cartItems messes up in here
    const user = userInfo.user
    let cartItems = userInfo.cartItems || []
    const isGuest = auth.id ? false : true
    const cartAuthorization = user.id === auth.id
    const { id } = this.props.match.params

    return (
      <React.Fragment>
        <div>
          {isGuest ? (
            <CartGuest
              user={user}
              cartItems={cartItems}
              adjustQuantity={this.adjustQuantity}
              clickDelete={this.clickDelete}
              guestCart={this.state.guestCart}
            />
          ) : (
            <CartUser
              id={id}
              auth={auth}
              cartAuthorization={cartAuthorization}
              userInfo={userInfo}
              cartItems={cartItems}
              adjustQuantity={this.adjustQuantity}
              clickDelete={this.clickDelete}
            />
          )}
        </div>
      </React.Fragment>
    )
  }
}

function mapState(state) {
  return {
    userInfo: state.user,
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  }
}

function mapDispatch(dispatch) {
  return {
    getUser: (id) => dispatch(fetchUser(id)),
    getOrders: (id) => dispatch(fetchUserCart(id)),
    deleteItemfromCart: (obj) => dispatch(deleteItemCartThunk(obj)),
    updateQuantity: (obj) => dispatch(updateQuantityThunk(obj)),
  }
}

export default connect(mapState, mapDispatch)(Cart)

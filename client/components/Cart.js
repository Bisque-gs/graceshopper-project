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
  componentDidMount() {
    const { id } = this.props.match.params
    // also gets info for guests
    this.props.getUser(Number(id))
    if (id) this.props.getOrders(Number(id))
  }

  clickDelete = (deleteInfo) => {
    this.props.deleteItemfromCart(deleteInfo)
  }

  adjustQuantity = (obj) => {
    // for guest, obj.id === undefined
    this.props.updateQuantity(obj)
  }

  render() {
    const { userInfo, auth } = this.props
    // userInfo.cartItems messes up in here
    const user = userInfo.user
    let cartItems = userInfo.cartItems || []
    const isGuest = auth.id ? false : true
<<<<<<< HEAD

    const itemQuantities = auth.id // if user is logged in
      ? userInfo.updatedPrices // helps with rendering?
        ? userInfo.updatedPrices.sort((a, b) => a.productId - b.productId) || []
        : []
      : // if guest
        cartItems

    let cartAuthorization = user.id === auth.id
=======
    const cartAuthorization = user.id === auth.id
    const { id } = this.props.match.params
>>>>>>> 33787e1ad68bcd84185c6bfe916ebba9e651bcc2

    return (
      <React.Fragment>
        <div>
          {isGuest ? (
            <CartGuest
              auth={auth}
              user={user}
              cartItems={cartItems}
              adjustQuantity={this.adjustQuantity}
              clickDelete={this.clickDelete}
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

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
    // console.log(id)
    // also gets info for guests
    this.props.getUser(Number(id))
    if (id) this.props.getOrders(Number(id))
  }

  clickDelete = (deleteInfo) => {
    this.props.deleteItemfromCart(deleteInfo)
  }

  // NOTE: the next two functions can just be one "adjustQuantity" function, right?
  adjustQuantity = (obj) => {
    // for guest, obj.id === undefined
    this.props.updateQuantity(obj)
  }

  render() {
    const { userInfo, auth } = this.props
    const user = userInfo.user
    let cartItems = userInfo.cartItems || []
    const isGuest = auth.id ? false : true

    const itemQuantities = auth.id // if user is logged in
      ? userInfo.updatedPrices // helps with rendering?
        ? userInfo.updatedPrices.sort((a, b) => a.productId - b.productId) || []
        : []
      : // if guest
        cartItems

    let cartAuthorization = user.id === auth.id

    return (
      <React.Fragment>
        <div>
          {isGuest ? (
            <CartGuest
              user={user}
              cartItems={cartItems}
              itemQuantities={itemQuantities}
              adjustQuantity={this.adjustQuantity}
              clickDelete={this.clickDelete}
            />
          ) : (
            <CartUser
              auth={auth}
              cartAuthorization={cartAuthorization}
              user={user}
              cartItems={cartItems}
              itemQuantities={itemQuantities}
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

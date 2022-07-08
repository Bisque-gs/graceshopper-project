import React from "react"
import { connect } from "react-redux"
import { fetchUser, fetchUserCart, checkoutThunk } from "../redux/singleUser"
import { Link } from "react-router-dom"
import PayPal from "./PayPal"

//We will grab a user orders from singleUser redux store
// Have an option to grab all orders
//have an option to grab current orders
//reducer
class Checkout extends React.Component {
  checkout = (orderobj) => {
    this.props.checkout(orderobj)
  }
  render() {
    const { userInfo } = this.props
    const { user } = userInfo
    const cartItems = userInfo.cartItems || []
    const itemQuantities = userInfo.updatedPrices
    ? userInfo.updatedPrices.sort((a, b) => a.productId - b.productId) || []
    : []
    let cartIsEmpty = cartItems.length === 0
    let total = 0
    console.log(itemQuantities)
    console.log('cart items', cartItems)
    return (
      <React.Fragment>
        <div className="container">
          <div>
            <br />
            <div className="column">
              <h2>Guest's CHECKOUT CONFIRMATION PAGE</h2>
            </div>
            <div className="unit">
              {cartItems
                .sort((a, b) => a.id - b.id)
                .map((item, i) => (
                  <div key={item.id} className={item.pokeType + " profile"}>
                    <h3>
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </h3>
                    <img src={item.imageUrl} />
                    <div className="column">
                      <h3>
                        UNIT PRICE: $
                        {(item.price / 100).toFixed(2)}
                      </h3>
                      <p>QUANTITY: {item.quantity}</p>
                      <h3>
                        SUBPRICE: $
                        {(
                          (item.price *
                            item.quantity) /
                          100
                        ).toFixed(2)}
                      </h3>
                    </div>
                    <div style={{ display: "none" }}>
                      {
                        (total +=
                          item.price * item.quantity)
                      }
                    </div>
                  </div>
                ))}
            </div>
            <div>TOTAL PRICE: ${(total / 100).toFixed(2)}</div>
            {userInfo.error && (
              <p>{userInfo.error}. Please adjust your cart.</p>
            )}
            {cartIsEmpty ? (
              (cartIsEmpty = true)
            ) : (
              <div className="column">
                <PayPal
                  totalPrice={(total / 100).toFixed(2)}
                  userId={user.id}
                  itemQuantities={cartItems}
                  checkout={this.checkout}
                />
              </div>
            )}
          </div>
          <div className="spacer"></div>
        </div>
      </React.Fragment>
    )
  }
}

function mapState(state) {
  return {
    userInfo: state.user,
  }
}

function mapDispatch(dispatch) {
  return {
    getUser: (id) => dispatch(fetchUser(id)),
    getOrders: (id) => dispatch(fetchUserCart(id)),
    checkout: (orderObj) => dispatch(checkoutThunk(orderObj)),
  }
}

export default connect(mapState, mapDispatch)(Checkout)

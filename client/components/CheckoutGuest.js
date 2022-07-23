import React from "react"
import { connect } from "react-redux"
import {
  fetchUser,
  fetchUserCart,
  checkoutThunk,
} from "../redux/singleUser"
import { Link } from "react-router-dom"
import PayPal from "./PayPal"
import SendGuestEConf from "./SendGuestEConf"

//We will grab a user orders from singleUser redux store
// Have an option to grab all orders
//have an option to grab current orders
//reducer
class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      isEmailConfVisible: false,
      isPaid: false,
      showPayPal: false,
      guestName: "",
      guestEmail: "",
    }
    this.isEmailConfVisibleToggle = this.isEmailConfVisibleToggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.isPaidToggle = this.isPaidToggle.bind(this)
    this.showPayPalToggle = this.showPayPalToggle.bind(this)
  }

  isEmailConfVisibleToggle() {
    this.setState({ isEmailConfVisible: false })
  }

  isPaidToggle() {
    this.setState({ isPaid: true })
  }

  showPayPalToggle(name, email) {
    this.setState({ showPayPal: true, guestName: name, guestEmail: email })
    console.log("gN showPPT", this.state.guestName)
    console.log("gE showPPT", this.state.guestEmail)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  checkout = (orderobj) => {
    this.props.checkout(orderobj)
    window.localStorage.setItem("cart", "[]")
  }
  render() {
    const { userInfo } = this.props
    const { user } = userInfo
    const isPaid = this.state.isPaid
    const showPayPal = this.state.showPayPal
    const cartItems = userInfo.cartItems || []
    const itemQuantities = userInfo.updatedPrices
      ? userInfo.updatedPrices.sort((a, b) => a.productId - b.productId) || []
      : []
    let cartIsEmpty = cartItems.length === 0
    let total = 0
    // console.log(itemQuantities)
    // console.log("cart items", cartItems)
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
                      <h3>UNIT PRICE: ${(item.price / 100).toFixed(2)}</h3>
                      <p>QUANTITY: {item.quantity}</p>
                      <h3>
                        SUBPRICE: $
                        {((item.price * item.quantity) / 100).toFixed(2)}
                      </h3>
                    </div>
                    <div style={{ display: "none" }}>
                      {(total += item.price * item.quantity)}
                    </div>
                  </div>
                ))}
            </div>
            <div>TOTAL PRICE: ${(total / 100).toFixed(2)}</div>
            {userInfo.error && (
              <p>{userInfo.error}. Please adjust your cart.</p>
            )}
            <div className="column">
              {!cartIsEmpty && !isPaid && (
                <button
                  type="button"
                  onClick={() => this.setState({ isEmailConfVisible: true })}
                >
                  Finalize the order
                </button>
              )}
              {this.state.isEmailConfVisible && (
                <SendGuestEConf
                  itemQuantities={cartItems}
                  checkout={this.checkout}
                  isPaid={this.isPaidToggle}
                  showPayPalToggle={this.showPayPalToggle}
                  isEmailConfVisible={this.isEmailConfVisibleToggle}
                />
              )}
              {!cartIsEmpty && showPayPal && (
                <PayPal
                  totalPrice={(total / 100).toFixed(2)}
                  userId={user.id}
                  itemQuantities={cartItems}
                  guestEmail={this.state.guestEmail}
                  guestName={this.state.guestName}
                  checkout={this.checkout}
                />
              )}
            </div>
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

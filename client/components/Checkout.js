import React from "react"
import { connect } from "react-redux"
import { fetchUser, fetchUserCart, checkoutThunk } from "../redux/singleUser"
import { Link } from "react-router-dom"

//We will grab a user orders from singleUser redux store
// Have an option to grab all orders
//have an option to grab current orders
//reducer
class Checkout extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getUser(Number(id))
    this.props.getOrders(Number(id))
  }

  checkout = (orderobj) => {
    this.props.checkout(orderobj)
  }

  ///isLogin doesnt work here, that only checks if anyone at all is logged in
  //we need to check whether the logged in user matches the userId of the cart we are trying to view

  //Checking out is an all in one process, no checking out for individual items. One button will check out every item,
  //going to need a map or some sort on the backend for our routes

  //What does checking out an item mean?

  //REVISION ==> The orders should not dissapear from our through table! That is important for order history
  //Also price needs to be a column inside of through table

  //- the item quantity should be decremented from the item table
  //put route to update the quantities with the decremented value

  //- the 'current order' in the order table should be set to false since the order is closed/completed
  //another put route to modify the isCurrentOrder value to false
  //start on backend

  //VALIDATION ==> before decrementing..... need to check that there is enough of the product quantity to confim the order
  //if not then the order bounces, display message/alert

  render() {
    const { auth, userInfo } = this.props
    const { user } = userInfo
    const cartItems = userInfo.cartItems || []
    const itemQuantities = userInfo.updatedPrices
      ? userInfo.updatedPrices.sort((a, b) => a.productId - b.productId) || []
      : []
    let cartAuthorization = user.id === auth.id
    let cartIsEmpty = cartItems.length === 0
    let total = 0
    return (
      <React.Fragment>
        <div className="container">
          {cartAuthorization ? (
            <div>
              <br />
              <div className="column">
                <h2>{user.username}'s CHECKOUT CONFIRMATION PAGE</h2>
              </div>
              <div className="unit">
                {cartItems
                  .sort((a, b) => a.id - b.id)
                  .map((item, i) => (
                    <div key={item.id} className="profile">
                      <h3>
                        <Link to={`/products/${item.id}`}>{item.name}</Link>
                      </h3>
                      <img src={item.imageUrl} />
                      <div className="column">
                        <h3>
                          UNIT PRICE: $
                          {(itemQuantities[i].price / 10000).toFixed(2)}
                        </h3>
                        <p>QUANTITY: {itemQuantities[i].quantity}</p>
                        <h3>
                          SUBPRICE: $
                          {(
                            (itemQuantities[i].price *
                              itemQuantities[i].quantity) /
                            10000
                          ).toFixed(2)}
                        </h3>
                      </div>
                      <div style={{ display: "none" }}>
                        {
                          (total +=
                            itemQuantities[i].price *
                            itemQuantities[i].quantity)
                        }
                      </div>
                    </div>
                  ))}
              </div>
              <div>TOTAL PRICE: ${(total / 10000).toFixed(2)}</div>
              {userInfo.error && (
                <p>{userInfo.error}. Please adjust your cart.</p>
              )}
              <button
                onClick={() =>
                  this.checkout({
                    userId: user.id,
                    itemQuantities: itemQuantities,
                  })
                }
                type="button"
                disabled={cartIsEmpty}
                style={{ opacity: cartIsEmpty && 0.5 }}
              >
                SUBMIT ORDER
              </button>
            </div>
          ) : (
            <div>
              STOP! YOU VIOLATED THE LAW! PAY THE COURT A FINE OR SERVE YOUR
              SENTENCE, YOUR STOLEN GOODS ARE NOW FORFEIT{" "}
            </div>
          )}
          <div className="spacer"></div>
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
    checkout: (orderObj) => dispatch(checkoutThunk(orderObj)),
  }
}

export default connect(mapState, mapDispatch)(Checkout)

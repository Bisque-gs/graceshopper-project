import React from "react"
import { connect } from "react-redux"
import { fetchUser, fetchUserCart } from "../redux/singleUser"
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
    const user = this.props.userInfo.user
    const auth = this.props.auth
    const userId = this.props.userInfo.user
    const ordersInfo = this.props.userInfo.ordersInfo
    const cartItems = this.props.userInfo.cartItems || []
    const isLoggedIn = this.props.isLoggedIn
    const itemQuantities = this.props.userInfo.updatedPrices || []
    let cartAuthorization = user.id === auth.id
    let total = 0
    return (
      <React.Fragment>
        <div className="container">
          {console.log("CHECKING LOGIN STATUS", isLoggedIn)}
          {cartAuthorization ? (
            <div>
              <br/>
              <div className="column">
                {user.username}'s CHECKOUT CONFIRMATION PAGE
              </div>
              <div className="unit">
                {cartItems.map((item, i) => (
                  <div key={item.id} className="profile">
                    <h3>
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </h3>
                    <img src={item.imageUrl} />
                    <div className="column">
                    <h3>UNIT PRICE: {itemQuantities[i].price / 100}</h3>
                    <p>QUANTITY: {itemQuantities[i].quantity}</p>
                    <h3>
                      SUBPRICE:{" "}
                      {(itemQuantities[i].price / 100) *
                        itemQuantities[i].quantity}
                    </h3>
                    </div>
                    <div style={{ display: "none" }}>
                      {
                        (total +=
                          itemQuantities[i].price * itemQuantities[i].quantity)
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div>TOTAL PRICE: ${total / 100}</div>
              <button type="button">SUBMIT ORDER</button>
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
  }
}

export default connect(mapState, mapDispatch)(Checkout)

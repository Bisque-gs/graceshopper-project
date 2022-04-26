import React from "react"
import { connect } from "react-redux"
import {
  fetchUser,
  fetchUserCart,
  deleteItemCartThunk,
  updateQuantityThunk,
} from "../redux/singleUser"
import { Link } from "react-router-dom"

//We will grab a user orders from singleUser redux store
// Have an option to grab all orders
//have an option to grab current orders
//reducer
class Cart extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getUser(Number(id))
    this.props.getOrders(Number(id))
  }

  clickDelete(deleteInfo) {
    this.props.deleteItemfromCart(deleteInfo)
  }

  incrementItem = (obj) => {
    this.props.updateQuantity(obj)
  }
  decrementItem = (obj) => {
    this.props.updateQuantity(obj)
  }
  render() {
    const user = this.props.userInfo.user
    const auth = this.props.auth
    const userId = this.props.userInfo.user
    const ordersInfo = this.props.userInfo.ordersInfo
    const cartItems = this.props.userInfo.cartItems || []
    const isLoggedIn = this.props.isLoggedIn
    const itemQuantities = this.props.userInfo.updatedPrices || []
    let cartAuthorization = user.id === auth.id
    return (
      <React.Fragment>
        <div>
          {cartAuthorization || auth.isAdmin ? (
            <div>
              <br />
              <div className="column">
                This is {user.username ? user.username : 'guest'}'s cart!
                <Link to={`/users/${user.id}/cart/checkout`}>
                  <button type="button">💸CHECKOUT💸</button>
                </Link>
              </div>
              <div className="unit">
                {cartItems.map((item, i) => (
                  <div key={item.id} className="profile">
                    <h3>
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </h3>
                    <img src={item.imageUrl} />

                    <div className="column">
                      <h3>UNIT PRICE: {itemQuantities[i].price / 10000}</h3>
                      <p>QUANTITY: {itemQuantities[i].quantity}</p>
                    </div>

                    <div>
                      <button
                        onClick={() =>
                          this.incrementItem({
                            userId: user.id,
                            productId: item.id,
                            quantity: itemQuantities[i].quantity + 1,
                          })
                        }
                        type="button"
                      >
                        ➕
                      </button>
                      <button
                        onClick={() =>
                          this.decrementItem({
                            userId: user.id,
                            productId: item.id,
                            quantity: itemQuantities[i].quantity - 1,
                          })
                        }
                        type="button"
                      >
                        ➖
                      </button>
                      <button
                        onClick={() =>
                          this.clickDelete({
                            userId: user.id,
                            productId: item.id,
                          })
                        }
                        className="cancel"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              STOP! YOU VIOLATED THE LAW! PAY THE COURT A FINE OR SERVE YOUR
              SENTENCE, YOUR STOLEN GOODS ARE NOW FORFEIT{" "}
            </div>
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

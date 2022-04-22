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
    //this.setState is asynchronous
    //only need local state for a form
    // this.setState({ quantity: this.state.quantity + 1 });
    // console.log(this.state)
    this.props.updateQuantity(obj)
  }
  decrementItem = (obj) => {

    // this.setState({ quantity: this.state.quantity - 1 });
    this.props.updateQuantity(obj)
        // console.log(this.props.userInfo.ordersInfo.itemQuantities)
  }

  ///isLogin doesnt work here, that only checks if anyone at all is logged in
  //we need to check whether the logged in user matches the userId of the cart we are trying to view

  render() {
    const user = this.props.userInfo.user
    const auth = this.props.auth
    // console.log("THE USER RN", user)
    // console.log("AUTH INFO", auth)

    const userId = this.props.userInfo.user
    const ordersInfo = this.props.userInfo.ordersInfo
    const cartItems = this.props.userInfo.cartItems || []
    const isLoggedIn = this.props.isLoggedIn
    const itemQuantities = this.props.userInfo.itemQuantities || []
    let cartAuthorization = user.id === auth.id


    // console.log("CART AUTHO", cartAuthorization)
    return (
      <React.Fragment>
        <div>
          {/* {console.log("CHECKING LOGIN STATUS", isLoggedIn)} */}
          {cartAuthorization ? (
            <div>
              <div>This is {user.username}'s Cart!</div>
              <div>
                {cartItems.map((item, i) => (
                  <div key={item.id}>
                    <button
                      onClick={() =>
                        this.clickDelete({
                          userId: user.id,
                          productId: item.id,
                        })
                      }
                      id="x-button"
                    >
                      X
                    </button>
                    <Link to={`/products/${item.id}`}>
                      <h2 className="nameOf">{item.name}</h2>
                    </Link>
                    <img src={item.imageUrl} />
                    <h3> PRICE: {item.price}</h3>
                    <p>QUANTITY: {itemQuantities[i].quantity}</p>
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
                        Click to increment by 1
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
                        Click to decrease by 1
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Link to={`/users/${user.id}/cart/checkout`}>
                <button type="button">CHECKOUT!</button>
              </Link>
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

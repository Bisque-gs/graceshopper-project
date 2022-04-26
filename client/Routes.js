import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withRouter, Route, Switch, Redirect } from "react-router-dom"
import AllProducts from "./components/AllProducts"
import { Login, Signup } from "./components/AuthForm"
import Home from "./components/Home"
import SingleUser from "./components/SingleUser"
import EditUserProfile from "./components/EditUserProfile"
import SingleProduct from "./components/SingleProduct"
import { me } from "./store"
import Cart from "./components/Cart"
import Checkout from './components/Checkout';
import AllUsersIsAdmin from "./components/AllUsersIsAdmin"
import ViewUserAdmin from "./components/ViewUserAdmin"
import OrderHistory from "./components/OrderHistory"

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/products" exact component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/users" exact component={AllUsersIsAdmin} />
            <Route path="/users/:id/cart/checkout" exact component={Checkout} />
            <Route
              path="/users/:id/cart/orderhistory"
              exact
              component={OrderHistory}
            />
            <Route path="/users/:id/cart" component={Cart} />
            <Route path="/users/:id/edituser" component={EditUserProfile} />
            <Route
              path="/users/:id/admin/:userId"
              exact
              component={ViewUserAdmin}
            />
            <Route path="/users/:id" exact component={SingleUser} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products" exact component={AllProducts} />
            {/* <Route path="/users/:id" component={SingleUser} /> */}
            <Route path="/products/:id" component={SingleProduct} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

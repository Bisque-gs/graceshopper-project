import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchUserCart } from '../redux/singleUser';
import { Link } from "react-router-dom";


//We will grab a user orders from singleUser redux store
// Have an option to grab all orders
//have an option to grab current orders 
//reducer 
class Cart extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getUser(Number(id));
    this.props.getOrders(Number(id));
  }
  render() {
    console.log(this.props);
    const user = this.props.userInfo.user;
    const ordersInfo = this.props.userInfo.ordersInfo;
    const cartItems = ordersInfo.cartItems || [];
    // console.log(user)
    console.log(ordersInfo)
    return (
      <div>
      <div>This is {user.username}'s Cart!</div>
        <div>{cartItems.map((item) => (
            <div key={item.id}>
              {/* <button onClick={() => this.clickDelete(item.id)} id="x-button"> */}
                {/* X
              </button> */}
              <Link to={`/products/${item.id}`}>
              <h2 className="nameOf">{item.name}</h2>
                </Link>
            <img src={item.imageUrl} />
                  <h3> PRICE: {item.price}</h3>
                  <p>QUANTITY: {item.quantity}</p>
                  
  
            </div>
          ))}</div>
      </div>
    )
  }
}

function mapState(state) {
  return {
    userInfo: state.user,
  };
}

function mapDispatch(dispatch) {
  return {
    getUser: (id) => dispatch(fetchUser(id)),
    getOrders: (id) => dispatch(fetchUserCart(id)),
  };
}

export default connect(mapState, mapDispatch)(Cart);

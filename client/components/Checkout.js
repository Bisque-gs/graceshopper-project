import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchUserCart} from '../redux/singleUser';



//We will grab a user orders from singleUser redux store
// Have an option to grab all orders
//have an option to grab current orders 
//reducer 
class Checkout extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getUser(Number(id));
    this.props.getOrders(Number(id));
  }

  ///isLogin doesnt work here, that only checks if anyone at all is logged in
  //we need to check whether the logged in user matches the userId of the cart we are trying to view
    
    //Checking out is an all in one process, no checking out for individual items. One button will check out every item,
        //going to need a map or some sort on the backend for our routes 
    //What does checking out an item mean?
        //- the orders should dissapear from the through table 
            //Simple Delete routue should work, however we need to decremenent the quanity from item table so delete last 
        
        //- the item quantity should be decremented from the item table 
            //put route to update the quantities with the decremented value 
            
        //- the 'current order' in the order table should be set to false since the order is closed/completed
            //another put route to modify the isCurrentOrder value to false 
        //start on backend

  render() {
    const user = this.props.userInfo.user;
    const auth = this.props.auth;
    const userId = this.props.userInfo.user;
    const ordersInfo = this.props.userInfo.ordersInfo;
    const cartItems = this.props.userInfo.cartItems || [];
    const isLoggedIn = this.props.isLoggedIn
    let cartAuthorization = (user.id === auth.id)
    return (
      <React.Fragment>
        <div>
          {console.log('CHECKING LOGIN STATUS',isLoggedIn)}
          {cartAuthorization ? (
            <div>
      <div>{user.username}'s CHECKOUT CONFIRMATION PAGE</div>
        <div>{cartItems.map((item) => (
            <div key={item.id}>
            <img src={item.imageUrl} />
                  <h3> PRICE: {item.price}</h3>
            <p>QUANTITY: {item.quantity}</p>
             <div>
          </div>      
          </div>
        ))}</div>
              <button  type="button">
              CONFIRM ORDER
            </button>
              </div>
          ) : (
            <div>STOP! YOU VIOLATED THE LAW! PAY THE COURT A FINE OR SERVE YOUR SENTENCE, YOUR STOLEN GOODS ARE NOW FORFEIT </div>
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
  };
}

function mapDispatch(dispatch) {
  return {
    getUser: (id) => dispatch(fetchUser(id)),
    getOrders: (id) => dispatch(fetchUserCart(id)),
  };
}

export default connect(mapState, mapDispatch)(Checkout);

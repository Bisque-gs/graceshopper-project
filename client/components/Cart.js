import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../redux/singleUser';


//We will grab a user orders from singleUser redux store
// Have an option to grab all orders
//have an option to grab current orders 
//reducer 
class Cart extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getUser(Number(id));
  }
  render() {
    // console.log(this.props);
    const { user } = this.props;
    return <div>This is {user.username}'s Cart!</div>;
  }
}

function mapState(state) {
  return {
    user: state.user,
  };
}

function mapDispatch(dispatch) {
  return {
    getUser: (id) => dispatch(fetchUser(id)),
  };
}

export default connect(mapState, mapDispatch)(Cart);

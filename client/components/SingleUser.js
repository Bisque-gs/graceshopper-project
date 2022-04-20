import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../store/singleUser';

class SingleUser extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getUser(Number(id));
  }
  render() {
    console.log(this.props);
    const { user } = this.props;
    return <div>Single user {user.username} here</div>;
  }
}

function mapState(state) {
  return {
    user: state.singleUserReducer,
  };
}

function mapDispatch(dispatch) {
  return {
    getUser: (id) => dispatch(fetchUser(id)),
  };
}

export default connect(mapState, mapDispatch)(SingleUser);

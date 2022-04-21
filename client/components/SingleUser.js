import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchUser } from "../redux/singleUser"
// import { EditUserProfile } from "./EditUserProfile"

class SingleUser extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getUser(Number(id))
  }
  render() {
    const { user } = this.props.user
    console.log("user", user.username)
    return (
      <div>
        <div>Single user {user.username} here</div>
        <Link to={`/users/${user.id}/edituser`}>Edit My Profile</Link>
      </div>
    )
  }
}

function mapState(state) {
  return {
    user: state.user,
  }
}

function mapDispatch(dispatch) {
  return {
    getUser: (id) => dispatch(fetchUser(id)),
  }
}

export default connect(mapState, mapDispatch)(SingleUser)

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
    const auth = this.props.auth
    let cartAuthorization = user.id === auth.id
    return (
      <React.Fragment>
        {cartAuthorization && (
          <div>
            <div>Single user {user.username} here</div>
            <Link to={`/users/${user.id}/edituser`}>Edit My Profile</Link>
          </div>
        )}
      </React.Fragment>
    )
  }
}

function mapState(state) {
  return {
    user: state.user,
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  }
}

function mapDispatch(dispatch) {
  return {
    getUser: (id) => dispatch(fetchUser(id)),
  }
}

export default connect(mapState, mapDispatch)(SingleUser)

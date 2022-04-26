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
        {cartAuthorization ? (
          <div>
            <div>Single user {user.username} here</div>
            <Link to={`/users/${user.id}/edituser`}>Edit My Profile</Link>
          </div>
        ) : (
          <div>
            <h3>
              STOP! YOU VIOLATED THE LAW! PAY THE COURT A FINE OR SERVE YOUR
              SENTENCE, YOUR STOLEN GOODS ARE NOW FORFEIT{" "}
            </h3>
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

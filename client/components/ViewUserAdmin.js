import React, { useEffect } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchUser } from "../redux/singleUser"
// import { EditUserProfile } from "./EditUserProfile"

const ViewUserAdmin = (props) => {
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    const { userId } = props.match.params
      dispatch(fetchUser(Number(userId)))
  }, [])

  return (
    <React.Fragment>
      {auth.isAdmin && (
        <div>
          <div>Single user {user.user.username} here</div>
        </div>
      )}
    </React.Fragment>
  )
}

export default ViewUserAdmin



// class ViewUserAdmin extends React.Component {
//   componentDidMount() {
//     const { userId } = this.props.match.params
//     this.props.getUser(Number(userId))
//   }
//   render() {
//     const { user } = this.props.user
//     const auth = this.props.auth
//     console.log("user", user)
//     return (
//       <React.Fragment>
//         {auth.isAdmin ? (
//           <div>
//             <div>Single user {user.username} here</div>
//             <Link to={`/users/${user.id}/edituser`}>Edit My Profile</Link>
//           </div>
//         ) : (<div>
//           STOP! YOU VIOLATED THE LAW! PAY THE COURT A FINE OR SERVE YOUR
//           SENTENCE, YOUR STOLEN GOODS ARE NOW FORFEIT{" "}
//         </div>)}
//       </React.Fragment>
//     )
//   }
// }

// function mapState(state) {
//   return {
//     user: state.user,
//     isLoggedIn: !!state.auth.id,
//     auth: state.auth,
//   }
// }

// function mapDispatch(dispatch) {
//   return {
//     getUser: (id) => dispatch(fetchUser(id)),
//   }
// }

// export default connect(mapState, mapDispatch)(ViewUserAdmin)

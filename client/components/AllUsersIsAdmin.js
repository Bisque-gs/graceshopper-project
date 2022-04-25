import React, { useEffect } from "react"
import { connect } from "react-redux"
import { fetchUsers } from "../redux/admin"
import { useDispatch, useSelector } from "react-redux"

const AllUsersIsAdmin = () => {
  // useEffect() ==> REPLACES COMPONENT DID MOUNT
  //useDispatch() ==> REPLACES MAP DISPATCH TO PROPS
  //THE EMPTY ARRAY OF DEPENDENCIES ENSURES THAT THE useEffect ONLY HAPPENS
  //ONCE, AFTER THE INITIAL RENDER
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      fetchUsers({
        id: 1,
        username: "Dominican",
        email: "Dominican@gmail.com",
      })
    )
  }, [])

  //REPLACES MAPSTATE TO PROPS
  const allUsers = useSelector((state) => state.allUsers)
  const auth = useSelector((state) => state.auth)

  return (
    <div>
      {auth.isAdmin ? (
        <div>
          <div className="column">Users:</div>
          <div className="unit">
            {allUsers.length === 0 ? (
              <p>No Users</p>
            ) : (
              allUsers.map((user) => {
                return (
                  <div key={user.id} className="profile">
                    <h3>{user.id}</h3>
                    <h3>{user.username}</h3>
                    <h3>{user.email}</h3>
                  </div>
                )
              })
            )}
          </div>
        </div>
      ) : (
        <h2>
          {" "}
          STOP! YOU VIOLATED THE LAW! PAY THE COURT A FINE OR SERVE YOUR
          SENTENCE, YOUR STOLEN GOODS ARE NOW FORFEIT{" "}
        </h2>
      )}
    </div>
  )
}

//NO NEED FOR CONNECT 
export default AllUsersIsAdmin

// export class AllUsers extends React.Component {
//   componentDidMount() {
//     this.props.getUsers()
//   }
//   render() {
//     const { auth, allUsers } = this.props

//     return (
//       <div>
//         {auth.isAdmin ? (
//           <div>
//             <div className="column">Users:</div>
//             <div className="unit">
//               {allUsers.length === 0 ? (
//                 <p>No Users</p>
//               ) : (
//                 allUsers.map((user) => {
//                   return (
//                     <div key={user.id} className="profile">
//                       <h3>{user.id}</h3>
//                       <h3>{user.username}</h3>
//                       <h3>{user.email}</h3>
//                     </div>
//                   )
//                 })
//               )}
//             </div>
//           </div>
//         ) : (
//           <h2>
//             {" "}
//             STOP! YOU VIOLATED THE LAW! PAY THE COURT A FINE OR SERVE YOUR
//             SENTENCE, YOUR STOLEN GOODS ARE NOW FORFEIT{" "}
//           </h2>
//         )}
//       </div>
//     )
//   }
// }

// const mapState = (state) => {
//   return {
//     allUsers: state.allUsers,
//     auth: state.auth,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     getUsers: () => dispatch(fetchUsers()),
//   }
// }

// export default connect(mapState, mapDispatch)(AllUsers)

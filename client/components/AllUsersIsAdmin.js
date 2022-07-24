import React, { useEffect, useState } from "react"
import { fetchUsers, fetchUserSearch } from "../redux/admin"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Search from "./Search"

const AllUsersIsAdmin = () => {
  //REPLACES MAPSTATE TO PROPS
  const allUsers = useSelector((state) => state.allUsers)
  const auth = useSelector((state) => state.auth)

  const [search, setSearch] = useState("")

  // useEffect() ==> REPLACES COMPONENT DID MOUNT
  //useDispatch() ==> REPLACES MAP DISPATCH TO PROPS

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers(auth.id))
  }, [])

  useEffect(() => {
    dispatch(fetchUserSearch(auth.id, search))
    console.log(allUsers)
  }, [search])

  return (
    <div>
      {auth.isAdmin ? (
        <div>
          <div className="column">Users:</div>
          <Search setSearch={setSearch} />
          <div className="unit">
            {allUsers.length === 0 ? (
              <p>No Users</p>
            ) : (
              allUsers.map((user) => {
                return (
                  <div key={user.id}>
                    <Link to={`/users/${auth.id}/admin/${user.id}`}>
                      <div className="profile">
                        <h3>{user.id}</h3>
                        <h3>{user.username}</h3>
                        <h3>{user.email}</h3>
                      </div>
                    </Link>
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

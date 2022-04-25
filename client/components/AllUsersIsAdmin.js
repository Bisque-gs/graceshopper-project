import React from "react"
import { connect } from "react-redux"
import { fetchProducts, deleteProductThunk } from "../redux/products"
import { setOrder } from "../redux/singleProduct"
import { Link } from "react-router-dom"
import { fetchUsers } from "../redux/admin"
// import AddProduct from "./AddProduct";

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    const { auth, allUsers } = this.props

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
}

const mapState = (state) => {
  return {
    allUsers: state.allUsers,
    auth: state.auth,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  }
}

export default connect(mapState, mapDispatch)(AllUsers)

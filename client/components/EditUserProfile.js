import React from "react"
import { connect } from "react-redux"
import { updateSingleUser } from "../redux/singleUser"

class EditUserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log(this.state, "!!!!!!")
    // console.log("this.props.user", this.props.user, "this.state", this.state)
    this.props.updateUser({
      id: this.props.match.params.id,
      field: { ...this.state },
    })
  }

  render() {
    const { username, email, password } = this.state
    const { handleChange, handleSubmit } = this
    return (
      <div>
        <form id="edit-user" onSubmit={handleSubmit}>
          <label htmlFor="username">User Name:</label>
          <input name="username" onChange={handleChange} value={username} />

          <label htmlFor="email">Email:</label>
          <input name="email" onChange={handleChange} value={email} />

          <label htmlFor="password">Password:</label>
          <input name="password" onChange={handleChange} value={password} />

          <button type="submit">Update</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user,
})

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(updateSingleUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfile)

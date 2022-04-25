import React from "react"
import { connect } from "react-redux"
import { updateSingleUser, fetchUser } from "../redux/singleUser"

class EditUserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      submitted: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getUser(id)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateUser({
      id: this.props.match.params.id,
      field: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      },
    })
    this.setState({ submitted: true })
  }

  render() {
    const { username, email, password } = this.state
    const { handleChange, handleSubmit } = this
    const { usernameStart, emailStart, passwordStart } = this.props.user.user
    console.log("THIS.PROPS", this.props.user)
    console.log("USERNAME", username)
    return (
      <div>
        <form id="edit-user" onSubmit={handleSubmit}>
          <label htmlFor="username">User Name:</label>
          <input
            name="username"
            onChange={handleChange}
            value={username}
            placeholder={usernameStart}
          />

          <label htmlFor="email">Email:</label>
          <input
            name="email"
            onChange={handleChange}
            value={email}
            placeholder={emailStart}
          />

          <label htmlFor="password">Password:</label>
          <input
            name="password"
            onChange={handleChange}
            value={password}
            placeholder={passwordStart}
          />
          {this.props.user.user.error ? (
            <p>{this.props.user.user.error.response.data}</p>
          ) : (
            this.state.submitted && <p>Successfully updated!</p>
          )}
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
  getUser: (id) => dispatch(fetchUser(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfile)

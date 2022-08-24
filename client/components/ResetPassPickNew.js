import React from "react"
import { connect } from "react-redux"
import { resetPassword } from "../store/auth"

export class ResetNewPass extends React.Component {
  constructor() {
    super()
    this.state = {
      newPassword: "",
      guestEmail: "",
      verifyPassword: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const newPassword = this.state.newPassword;
    const guestEmail = this.state.guestEmail;
    const verifyPassword = this.state.verifyPassword;
    console.log("newPassword", newPassword)
    console.log("guestEmail", guestEmail)
    console.log("verifyPassword", verifyPassword)
    this.props.resetPass(guestEmail, newPassword, verifyPassword);
    
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { newPassword, guestEmail, verifyPassword } = this.state
    return (
      <div
        style={{
          textAlign: "center",
          fontSize: "16" + "px",
          textTransform: "uppercase",
          margin: "0",
          fontWeight: "bold",
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <h4>Please input your information below to reset your password:</h4>
          <label
            style={{
              textAlign: "center",
              fontSize: "14" + "px",
              textTransform: "none",
              margin: "0",
              fontWeight: "normal",
            }}
          >
            Email:
          </label>
          <input
            name="guestEmail"
            type="email"
            value={guestEmail}
            onChange={this.handleChange}
          />
          <label
            style={{
              textAlign: "center",
              fontSize: "14" + "px",
              textTransform: "none",
              margin: "0",
              fontWeight: "normal",
            }}
          >
            New password:
          </label>
          <input
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={this.handleChange}
          />
          <label
            style={{
              textAlign: "center",
              fontSize: "14" + "px",
              textTransform: "none",
              margin: "0",
              fontWeight: "normal",
            }}
          >
            Confirm password:
          </label>
          <input
            name="verifyPassword"
            type="password"
            value={verifyPassword}
            onChange={this.handleChange}
          />
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapDispatch(dispatch) {
    return {
      resetPass: (email, newPass, confirmPass) => dispatch(resetPassword(email, newPass, confirmPass)),
    }
  }

export default connect(null, mapDispatch)(ResetNewPass)

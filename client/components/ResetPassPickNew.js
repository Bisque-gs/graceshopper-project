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
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const { newPassword, guestEmail, verifyPassword } = this.state
    this.props.resetPass(guestEmail, newPassword, verifyPassword);
    Toastify({
      text: `Your password has been reset!`,
      duration: 3000,
      destination: `https://grace-pokebay.herokuapp.com/login`,
      newWindow: false,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background:
          "linear-gradient(to right, #4040ce, #96c93d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast()
    this.setState({
      newPassword: "",
      guestEmail: "",
      verifyPassword: "",
      submitted: true,
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { newPassword, guestEmail, verifyPassword, submitted } = this.state
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
          <button className="submit"
            disabled={submitted}
            style={{ opacity: submitted && 0.5 }}
            type="submit">
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

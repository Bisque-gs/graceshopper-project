import React from "react"
import { connect } from "react-redux"
import { reset } from "../store/auth"

export class Reset extends React.Component {
  constructor() {
    super()
    this.state = {
      guestEmail: "",
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const guestEmail = this.state.guestEmail
    this.props.reset(guestEmail);
    Toastify({
      text: `Check your email for further instructions!`,
      duration: 3000,
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
      guestEmail: "",
      submitted: true
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { guestEmail, submitted } = this.state;
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
      reset: (email) => dispatch(reset(email)),
    }
  }

export default connect(null, mapDispatch)(Reset)

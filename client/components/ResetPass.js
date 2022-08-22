import React from "react"
import { connect } from "react-redux"
import { reset } from "../store/auth"

export class Reset extends React.Component {
  constructor() {
    super()
    this.state = {
      guestEmail: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const guestEmail = this.state.guestEmail
    console.log("gE reset", guestEmail)
    this.props.reset(guestEmail);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { guestEmail } = this.state
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
          <h4
            style={{
              textAlign: "center",
              fontSize: "14" + "px",
            }}
          >
            Check your email for further instructions!
          </h4>
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
      reset: (email) => dispatch(reset(email)),
    }
  }

export default connect(null, mapDispatch)(Reset)

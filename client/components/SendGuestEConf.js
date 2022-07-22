import React from "react"

export class SendGuestEConf extends React.Component {
  constructor() {
    super()
    this.state = {
      guestName: "",
      guestEmail: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    const guestName = this.state.guestName;
    const guestEmail = this.state.guestEmail;
    this.props.showPayPalToggle(guestName, guestEmail);
    this.props.isEmailConfVisible();
    this.props.isPaid();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleCancel = () => {
    this.props.isEmailConfVisible()
  }

  render() {
    const { guestEmail, guestName } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Please input your information below:</h4>
        <label>Name:</label>
        <input name="guestName" value={guestName} onChange={this.handleChange} />
        <label>Email:</label>
        <input name="guestEmail" value={guestEmail} onChange={this.handleChange} />
        <h4>You will get your email shortly after you checkout!</h4>
        <button className="submit" type="submit">
          Submit
        </button>
        <button className="cancel" type="button" onClick={this.handleCancel}>
          Cancel
        </button>
      </form>
    )
  }
}

export default SendGuestEConf

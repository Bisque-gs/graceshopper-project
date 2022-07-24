import React from "react"

export class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      quantity: 0,
      price: 0,
      pokeType: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addProduct({ ...this.state })
    this.props.isAddVisible()
    Toastify({
      text: `${this.state.name} was added as product`,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background:
          "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleCancel = () => {
    this.props.isAddVisible()
  }

  render() {
    const { name, quantity, price, pokeType } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Please input new product information below:</h4>
        <label>Name:</label>
        <input name="name" value={name} onChange={this.handleChange} />
        <label>Quantity:</label>
        <input name="quantity" value={quantity} onChange={this.handleChange} />
        <label>Price (in cents):</label>
        <input name="price" value={price} onChange={this.handleChange} />
        <label>Type:</label>
        <input name="pokeType" value={pokeType} onChange={this.handleChange} />
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

export default AddProduct

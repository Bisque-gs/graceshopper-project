import React from "react";
import { connect } from "react-redux";
import { updateProductThunk } from "../redux/singleProduct";

export class EditProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      quantity: 0,
      price: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateProduct({ ...this.props.product, ...this.state });
    this.props.isEditVisible();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { name, quantity, price } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h5>Please input new campus information below:</h5>
        <label>Name:</label>
        <input name="name" value={name} onChange={this.handleChange} />
        <label>Quantity:</label>
        <input name="quantity" value={quantity} onChange={this.handleChange} />
        <label>Price (in cents):</label>
        <input name="price" value={price} onChange={this.handleChange} />
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const mapDispatch = (dispatch) => ({
  updateProduct: (product) => dispatch(updateProductThunk(product)),
});

export default connect(null, mapDispatch)(EditProduct);

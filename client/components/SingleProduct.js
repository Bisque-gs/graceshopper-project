import React from "react"
import { connect } from "react-redux"
import { fetchProduct, setOrder, updateProductThunk } from "../redux/singleProduct"
import EditProduct from "./EditProduct";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: "",
      submitted: false,
      isEditVisible: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.isEditVisibleToggle = this.isEditVisibleToggle.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getProduct(Number(id))
  }

  isEditVisibleToggle() {
    this.setState({ isEditVisible: false });
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      quantity: e.target.value,
      submitted: false,
    })
  }

  handleClick(e) {
    e.preventDefault()
    const userId = this.props.auth.id
    const productId = this.props.match.params.id
    const quantity = this.state.quantity === "" ? 0 : this.state.quantity
    this.props.addToCart(userId, productId, quantity)
    this.setState({
      quantity: 0,
      submitted: true,
    })
  }

  render() {
    const { product, auth } = this.props
    return (
      <div className="profile">
        <div className="column">
        <h3>{product.name}</h3>
        <img src={product.imageUrl} alt={product.name} />
        <h3>PRICE: ${product.price / 100} per card</h3>
        <p>{product.quantity} remaining in stock!</p>
        <select name="quantity" id="" onChange={this.handleChange}>
          {Array(10)
            .fill(0)
            .map((_, i) => {
              return (
                <option key={i} value={i + 1} id="">
                  {i + 1}
                </option>
              )
            })}
        </select>
        {this.state.submitted && <p>Item(s) added to cart!</p>}
        <button
          onClick={
            auth.id ? this.handleClick : () => console.log("Added to local storage")
          }
        >
          Add to cart
        </button>
        {this.state.isEditVisible ? (
          <EditProduct
            updateProduct={this.props.updateProduct}
            product={product}
            isEditVisible={this.isEditVisibleToggle}
          />
        ) : (
          <button
            type="button"
            onClick={() => this.setState({ isEditVisible: true })}
          >
            Edit
          </button>
        )}
        </div>
      </div>
    )
  }
}

function mapState(state) {
  return {
    product: state.product,
    auth: state.auth,
  }
}

function mapDispatch(dispatch) {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
    addToCart: (userId, productId, quantity) =>
      dispatch(setOrder(userId, productId, quantity)),
    updateProduct: (product) => dispatch(updateProductThunk(product)),
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

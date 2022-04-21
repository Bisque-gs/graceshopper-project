import React from "react"
import { connect } from "react-redux"
import { fetchProduct, setOrder } from "../redux/singleProduct"

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: "",
      submitted: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getProduct(Number(id))
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
    // redirect user to products
  }

  render() {
    console.log(this.props)
    const { product, auth } = this.props
    return (
      <div className="container">
        <h1>{product.name}</h1>
        <img src={product.imageUrl} alt={product.name} />
        <ul>
          <li>${product.price}</li>
          <li>{product.quantity} remaining in stock!</li>
        </ul>
        {/* dropdown here? add more than one to cart? */}
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
        <button
          onClick={
            auth.id ? this.handleClick : () => console.log("Not logged in")
          }
        >
          Add to cart
        </button>
        {this.state.submitted && <p>Item(s) added to cart!</p>}
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
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

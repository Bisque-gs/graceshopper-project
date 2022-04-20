import React from "react"
import { connect } from "react-redux"
import { fetchProduct, setOrder } from "../redux/singleProduct"

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getProduct(Number(id))
  }

  handleClick(e) {
    e.preventDefault()
    const userId = this.props.auth.id
    const productId = this.props.match.params.id
    this.props.addToCart(userId, productId)
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
        <button
          onClick={
            auth.id ? this.handleClick : () => console.log("Not logged in")
          }
        >
          Add to cart
        </button>
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
    addToCart: (userId, productId) => dispatch(setOrder(userId, productId)),
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

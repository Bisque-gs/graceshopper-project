import React from "react"
import { connect } from "react-redux"
import {
  fetchProduct,
  setOrder,
  updateProductThunk,
} from "../redux/singleProduct"
import EditProduct from "./EditProduct"

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: "",
      isEditVisible: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.isEditVisibleToggle = this.isEditVisibleToggle.bind(this)
  }
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getProduct(Number(id))
  }

  isEditVisibleToggle() {
    this.setState({ isEditVisible: false })
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      quantity: e.target.value,
    })
  }

  handleClick(e) {
    e.preventDefault()
    const userId = this.props.auth.id
    const productId = this.props.match.params.id
    const quantity = this.state.quantity === "" ? 0 : this.state.quantity

    if (userId) {
      // signed in user
      this.props.addToCart(userId, productId, quantity)
    } else {
      // guest
      const cart = JSON.parse(window.localStorage.getItem("cart"))
      const idInCart = cart.find((x) => x.id == productId)
      const product = JSON.parse(JSON.stringify(this.props.product))
      product.quantity = quantity

      const updatedCart = idInCart
        ? cart.map((x) => {
            if (x.id == productId)
              x.quantity = Number(x.quantity) + Number(quantity)
            return x
          })
        : cart.concat(product)

      window.localStorage.setItem("cart", JSON.stringify(updatedCart))
    }
  }

  render() {
    const { product, auth } = this.props
    let noneInStock = false
    return (
      <div className="profile">
        <div className="column">
          <h3>{product.name}</h3>
          <img src={product.imageUrl} alt={product.name} />
          <h3>PRICE: ${(product.price / 100).toFixed(2)} per card</h3>
          <p>{product.quantity} remaining in stock!</p>
          {product.quantity == 0 && (noneInStock = true)}
          <select name="quantity" onChange={this.handleChange}>
            {Array(product.quantity)
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
            onClick={() => {
              this.handleClick;
              Toastify({
                text: `${product.name} was successfully added to cart`,
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background:
                    "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function () {}, // Callback after click
              }).showToast()}
            }
            disabled={noneInStock}
            style={{ opacity: noneInStock && 0.5 }}
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
            auth.isAdmin && (
              <button
                type="button"
                onClick={() => this.setState({ isEditVisible: true })}
              >
                Edit
              </button>
            )
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

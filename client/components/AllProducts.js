import React from "react"
import { connect } from "react-redux"
import { fetchProducts, deleteProductThunk } from "../redux/products"
import { setOrder, addProductThunk } from "../redux/singleProduct"
import { Link } from "react-router-dom"
import AddProduct from "./AddProduct"
import { addItemToLS } from "../localStorageMethods"

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      isAddVisible: false,
      selectedType: "",
      products: [],
    }
    this.isAddVisibleToggle = this.isAddVisibleToggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
    this.setState({
      products: this.props.products,
    })
  }

  isAddVisibleToggle() {
    this.setState({ isAddVisible: false })
  }

  handleClick(e) {
    e.preventDefault()
    const userId = this.props.auth.id
    const productId = this.props.match.params.id
    this.props.addToCart(userId, productId)
  }

  handleChange(evt) {
    this.setState({
      selectedType: evt.target.value,
    })
  }

  handleSearchChange(e) {
    const val = e.target.value
    const products = this.props.products.filter((x) => {
      return val.split("").every((y) => x.name.includes(y))
    })
    this.setState({
      products,
    })
  }

  render() {
    const { auth, products } = this.props

    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]")
    }
    let cart = JSON.parse(localStorage.getItem("cart"))
    let type = this.state.selectedType

    return (
      <div className="container">
        <br />
        <div className="column">
          Products:
          {this.state.isAddVisible ? (
            <AddProduct
              addProduct={this.props.addProduct}
              isAddVisible={this.isAddVisibleToggle}
            />
          ) : auth.isAdmin && (
            <button
              type="button"
              onClick={() => this.setState({ isAddVisible: true })}
            >
              Add Product
            </button>
          )}
        </div>
        <input
          value={this.state.search}
          className="productSearch"
          onChange={this.handleSearchChange}
          placeholder="Search products"
        />
        <div>
          <select
            id="choose-type"
            name="selectList"
            onChange={this.handleChange}
          >
            <option value="">Pick a Type!</option>
            <option value="grass">grass</option>
            <option value="fire">fire</option>
            <option value="bug">bug</option>
            <option value="flying">flying</option>
            <option value="poison">poison</option>
            <option value="normal">normal</option>
            <option value="electric">electric</option>
            <option value="water">water</option>
            <option value="ground">ground</option>
          </select>
        </div>
        <div className="unit">
          {this.state.products.length === 0 ? (
            <p>No products</p>
          ) : (
            this.state.products
              .sort((a, b) => a.id - b.id)
              .filter((product) => {
                if (product.pokeType === type || type === "") {
                  return product
                }
              })
              .map((product) => {
                return (
                  <div
                    key={product.id}
                    className={product.pokeType + " profile"}
                  >
                    <h3>
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </h3>
                    <a href={`/products/${product.id}`}>
                      <img src={product.imageUrl} />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        auth.id // logged in user
                          ? this.props.addToCart(auth.id, product.id) &&
                            Toastify({
                              text: `${product.name} was successfully added to cart`,
                              duration: 3000,
                              destination: `https://grace-pokebay.herokuapp.com/users/${auth.id}/cart`,
                              newWindow: true,
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
                          : (function addItemToLS(prodId) {
                              // guest
                              const item = products.find(
                                // here
                                (item) => item.id === prodId
                              )
                              // console.log(item)
                              const res = cart.find(
                                (element) => element.id === prodId
                              )
                              if (cart.length === 0 || !res) {
                                item.quantity = 1
                                cart.push(item)
                              } else {
                                res.quantity++
                              }
                              localStorage.setItem("cart", JSON.stringify(cart))
                              Toastify({
                                text: `${product.name} was successfully added to cart`,
                                duration: 3000,
                                destination: `https://grace-pokebay.herokuapp.com/users/guest/cart`,
                                newWindow: true,
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
                            })(product.id)
                      }}
                    >
                      Add to cart
                    </button>
                    {auth.isAdmin && (
                      <button
                        className="cancel"
                        type="button"
                        onClick={() => {
                          this.props.deleteProduct(product.id)
                          Toastify({
                            text: `${product.name} was successfully removed`,
                            duration: 3000,
                            close: true,
                            gravity: "top", // `top` or `bottom`
                            position: "right", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                              background:
                                "linear-gradient(to right, #4040ce, #863939)",
                            },
                            onClick: function () {}, // Callback after click
                          }).showToast()
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )
              })
          )}
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    auth: state.auth,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addToCart: (userId, productId) => dispatch(setOrder(userId, productId, 1)),
    addProduct: (product) => dispatch(addProductThunk(product)),
    deleteProduct: (productId) => {
      dispatch(deleteProductThunk(productId))
    },
  }
}

export default connect(mapState, mapDispatch)(AllProducts)

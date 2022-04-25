import React from "react"
import { connect } from "react-redux"
import { fetchProducts, deleteProductThunk } from "../redux/products"
import { setOrder, addProductThunk } from "../redux/singleProduct"
import { Link } from "react-router-dom"
import AddProduct from "./AddProduct";

export class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      isAddVisible: false,
    };
    this.isAddVisibleToggle = this.isAddVisibleToggle.bind(this);
  }

  componentDidMount() {
    this.props.getProducts()
  }

  // componentDidUpdate() {
  //   console.log('ITS WORKING')
  // }

  isAddVisibleToggle() {
    this.setState({ isAddVisible: false });
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.props)
    const userId = this.props.auth.id
    const productId = this.props.match.params.id
    this.props.addToCart(userId, productId)
  }

  render() {
    const products = this.props.products
    const { auth } = this.props
    return (
      <div>
        <br />
        <div className="column">
          Products:
          {this.state.isAddVisible ? (
            <AddProduct
              addProduct={this.props.addProduct}
              isAddVisible={this.isAddVisibleToggle}
            />
          ) : (
            auth.isAdmin ?
            <button
              type="button"
              onClick={() => this.setState({ isAddVisible: true })}
            >
              Add Product
            </button> : console.log("You're not admin")
          )}
        </div>
        <div className="unit">
          {products.length === 0 ? (
            <p>No products</p>
          ) : (
            products.map((product) => {
              return (
                <div key={product.id} className="profile">
                  <h3>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <a href={`/products/${product.id}`}>
                    <img src={product.imageUrl} />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      auth.id
                        ? this.props.addToCart(auth.id, product.id)
                        : console.log("add to local storage")
                    }}
                  >
                    Add to cart
                  </button>
                  {auth.isAdmin ? (
                    <button
                      className="cancel"
                      type="button"
                      onClick={() => {
                        this.props.deleteProduct(product.id)
                      }}
                    >
                      Delete
                    </button>
                  ) : (
                    console.log("You're not admin")
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
    // product: state.product,
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

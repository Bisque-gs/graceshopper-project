import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../redux/products";
import { Link } from "react-router-dom";
// import { addProductThunk, deleteProductThunk } from "../redux/singleProduct";
// import AddProduct from "./AddProduct";

export class AllProducts extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     isAddVisible: false,
  //   };
  //   this.isAddVisibleToggle = this.isAddVisibleToggle.bind(this);
  // }

  componentDidMount() {
    this.props.getProducts();
  }

  // isAddVisibleToggle() {
  //   this.setState({ isAddVisible: false });
  // }

  render() {
    const products = this.props.products;
    return (
      <div>
        <div className="column">
          <h5>Our products:</h5>
          {/* {this.state.isAddVisible ? (
            <AddCampus
              addCampus={this.props.addCampus}
              isAddVisible={this.isAddVisibleToggle}
            />
          ) : (
            <button
              type="button"
              onClick={() => this.setState({ isAddVisible: true })}
            >
              Add Campus
            </button>
          )} */}
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
                  <img src={product.imageUrl} />
                  <button
                    className="cancel"
                    type="button"
                    onClick={() => {
                      this.props.deleteProduct(product.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    // product: state.product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    // addProduct: (product) => dispatch(addProductThunk(product)),
    // deleteProduct: (productId) => {
    //   dispatch(deleteProductThunk(productId));
    // },
  };
};

export default connect(mapState, mapDispatch)(AllProducts);

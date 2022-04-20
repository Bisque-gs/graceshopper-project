import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

export default class UserProfile extends React.Component {
  // constructor() {
  //   super();

  render() {
    // const products = this.props.products;
    return (
      <div>
        <div className="user-profile">
          <h1>Your special Page!</h1>
        </div>
      </div>
    )
  }
}

// const mapState = (state) => {
//   return {
//     products: state.products,
// product: state.product,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     getProducts: () => dispatch(fetchProducts()),
// addProduct: (product) => dispatch(addProductThunk(product)),
// deleteProduct: (productId) => {
//   dispatch(deleteProductThunk(productId));
// },
//   };
// };

// export default connect(mapState, mapDispatch)(AllProducts);

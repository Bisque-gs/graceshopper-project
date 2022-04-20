import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../redux/singleProduct';

class SingleProduct extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(Number(id));
  }
  render() {
    console.log(this.props);
    const { product } = this.props;
    return <div>Single product {product.name} here</div>;
  }
}

function mapState(state) {
  return {
    product: state.product,
  };
}

function mapDispatch(dispatch) {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
  };
}

export default connect(mapState, mapDispatch)(SingleProduct);

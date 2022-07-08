import React from "react"
import { connect } from "react-redux"
import { fetchUserCart } from "../redux/singleUser"

/**
 * COMPONENT
 */

// had to make this functional to use componentDidMount and getCart
class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCart(this.props.id)
  }

  render() {
    return (
      <div className="column">
        <h3>Welcome, {this.props.username}!</h3>
        <img src="https://www.pikpng.com/pngl/b/87-875320_snorlax-png-snorlax-pokemon-clipart.png" />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    id: state.auth.id,
  }
}
const mapDispatch = (dispatch) => {
  return {
    getCart: (id) => dispatch(fetchUserCart(id)),
  }
}

export default connect(mapState, mapDispatch)(Home)

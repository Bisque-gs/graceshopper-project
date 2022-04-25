import React from "react"
import { connect } from "react-redux"

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props

  return (
    <div className="column">
      <h3>Welcome, {username}!</h3>
      <img src="https://www.pikpng.com/pngl/b/87-875320_snorlax-png-snorlax-pokemon-clipart.png" />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  }
}

export default connect(mapState)(Home)

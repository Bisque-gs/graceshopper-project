import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { authenticate } from "../store"

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", "[]")
  }

  return (
    <div className="column">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        {props.name === "signup" && (
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
        )}
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        {props.name === "login" && (
          <div
            style={{
              textAlign: "center",
              fontSize: "11" + "px",
              textTransform: "uppercase",
              margin: "0",
              fontWeight: "bold",
            }}
          >
            <Link to="/reset">Reset password</Link>
          </div>
        )}
        {error && error.response && <div style={{
          textAlign: "center",
          fontSize: "14" + "px",
          width: "200" + "px",
        }}> {error.response.data} </div>}
        <div>
          <button type="submit">{displayName}</button>
        </div>
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  }
}

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const userName = evt.target.username.value
      const password = evt.target.password.value
      const email = evt.target.email ? evt.target.email.value : null
      {
        formName === "signup" &&
          Toastify({
            text: `${userName}, please check your email for confirmation! If you don't see it, make sure to check your spam folder!`,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #4040ce, #96c93d)",
            },
            onClick: function () {}, // Callback after click
          }).showToast()
      }
      dispatch(authenticate(userName, password, email, formName))
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

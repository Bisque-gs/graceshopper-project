import React, { useState, useEffect } from "react"

const Search = (props) => {
  //   const { name, displayName, handleSubmit, error } = props
  const [inputValue, setInputValue] = useState("")

  const handleChange = (e) => {
    setInputValue(e.target.value)
    props.setSearch(e.target.value)
  }

  return (
    <div className="column">
      <input action="" value={inputValue} onChange={handleChange} />
    </div>
  )
}

export default Search

// const mapLogin = (state) => {
//   return {
//     name: "login",
//     displayName: "Login",
//     error: state.auth.error,
//   }
// }

// const mapSignup = (state) => {
//   return {
//     name: "signup",
//     displayName: "Sign Up",
//     error: state.auth.error,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const userName = evt.target.username.value
//       const password = evt.target.password.value
//       const email = evt.target.email ? evt.target.email.value : null

//       dispatch(authenticate(userName, password, email, formName))
//     },
//   }
// }

import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchUsers } from "../redux/admin"
import { fetchProducts } from "../redux/products"
import useOnClickOutside from "./hooks/useOnClickOutside"

const Search = (props) => {
  // do we need a search results page? Right now the plan is for it to be click-only

  const { auth } = props
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const users = useSelector((state) => state.allUsers)
  const wrapperRef = useRef(null)

  const [search, setSearch] = useState("")
  const [results, setResults] = useState({})
  const [showInput, setShowInput] = useState(false)

  useOnClickOutside(wrapperRef, () => {
    // if (isInputActive) {
    //   if (inputValue.length) {
    //     if (props.isProject) {
    //       props.onSetText(inputValue)
    //       dispatch(updateProject(props.projectId, inputValue))
    //     } else {
    //       props.onSetText(inputValue)
    //       dispatch(
    //         updateListThunk(auth.id, props.projectId, {
    //           columnName: inputValue,
    //         })
    //       )
    //     }
    //   }
    setSearch("")
    setShowInput(false)
    // }
  })

  const handleChange = (e) => {
    setSearch(e.target.value)
    console.log(search)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setShowInput(!showInput)
  }

  //   const handleSearch = (e) => {
  //     ///// !!!!! DANGER: SANITIZE INPUTS !!!!! /////
  //     const clicked = e.target.innerText
  //     const clickedArr = clicked.split(" ")
  //     const isProduct = clickedArr[0] === "Product:" ? true : false
  //     const goTo = isProduct
  //       ? results.products.find((x) => x.name === clickedArr[1])
  //       : results.users.find((x) => x.username === clickedArr[1])
  //     // console.log(goTo)
  //     // now I want to go to either SingleUser or SingleProduct with goTo.id
  //     setSearchId(goTo.id)
  //   }

  useEffect(() => {
    if (showInput) {
      dispatch(fetchProducts(search))
      if (auth.isAdmin) {
        dispatch(fetchUsers(auth.id, search))
      }

      setResults({ products, users })
    }
  }, [showInput])

  useEffect(() => {
    const productSearch = products.filter((x) => {
      return search.split("").every((y) => x.name.includes(y))
    })
    const userSearch = users.filter((x) => {
      return search.split("").every((y) => x.username.includes(y))
    })

    setResults({ products: productSearch, users: userSearch })
  }, [search])

  let suggestionsListComponent
  search &&
    (suggestionsListComponent = (
      // products is working, users is one behind
      <ul className="suggestions">
        {console.log(results)}
        {results.products.length &&
          results.products.map((x, index) => {
            return (
              <li
                className={
                  // index === activeSuggestion ? "suggestion-active" : ""
                  "search-suggestion"
                }
                key={index}
                // onClick={handleSearch}
              >
                <Link to={`/products/${x.id}`}>
                  <em>Product: </em>
                  {x.name}
                </Link>
              </li>
            )
          })}
        {results.users.length && (
          <span>
            <hr />
            {results.users.map((x, index) => {
              return (
                <li
                  className={
                    // index === activeSuggestion ? "suggestion-active" : ""
                    "search-suggestion"
                  }
                  key={index}
                  // onClick={handleSearch}
                >
                  <Link to={`/users/${auth.id}/admin/${x.id}`}>
                    <em>User: </em>
                    {x.username}
                  </Link>
                </li>
              )
            })}
          </span>
        )}
      </ul>
    ))
  // : (suggestionsListComponent = (
  //     <div className="no-suggestions">
  //       <em>No suggestions available.</em>
  //     </div>
  //   ))

  return (
    <div>
      {/* <button onClick={handleClick}>{showInput ? "Hide" : "Search"}</button> */}

      {showInput ? (
        <div>
          <button onClick={handleClick}>Hide</button>
          <span ref={wrapperRef}>
            <form className="searchBar">
              <input
                value={search}
                className="searchInput"
                onChange={handleChange}
                placeholder="Search"
              />
              {suggestionsListComponent}
            </form>
          </span>
        </div>
      ) : (
        <button onClick={handleClick}>Search</button>
      )}
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

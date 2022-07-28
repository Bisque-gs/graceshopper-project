import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchUsers } from "../redux/admin"
import { fetchProducts } from "../redux/products"
import useOnClickOutside from "./hooks/useOnClickOutside"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

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
    setSearch("")
    setShowInput(false)
  })

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setShowInput(!showInput)
  }

  const handleSearch = () => {
    setSearch("")
    setShowInput(false)
  }

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
      <ul className="suggestions">
        {/* {console.log(results)} */}
        {results.products.length &&
          results.products.map((x, index) => {
            return (
              <li
                className={
                  // index === activeSuggestion ? "suggestion-active" : ""
                  "search-suggestion"
                }
                key={index}
                onClick={handleSearch}
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
                  onClick={handleSearch}
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

  return (
    <div className="searchWrapper">
      {showInput ? (
        <span ref={wrapperRef}>
          <form className="searchBar">
            <input
              autoFocus
              value={search}
              className="searchInput"
              onChange={handleChange}
              placeholder="Search"
            />
            {suggestionsListComponent}
          </form>
        </span>
      ) : (
        <button
          onClick={handleClick}
          style={{ background: "#3aa", margin: "0" }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ marginRight: "5px" }}
          />
          Search
        </button>
      )}
    </div>
  )
}

export default Search

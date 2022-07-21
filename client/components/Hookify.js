import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function AddProduct(props) {
  const [pokeInfo, setPokeInfo] = useState({
    name: "",
    quantity: "",
    price: "",
    pokeType: "",
  })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    // this.props.addProduct({ ...this.state })
      setPokeInfo({
          name: "",
          quantity: "",
          price: "",
          pokeType: "",
      });
    props.isAddVisible()
  }

  const handleChange = (event) => {
    setPokeInfo({
      ...pokeInfo,
      [event.target.name]: event.target.value,
    })
  }

  const handleCancel = () => {
    props.isAddVisible()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Please input new product information below:</h4>
      <label>Name:</label>
      <input name="name" value={pokeInfo.name} onChange={handleChange} />
      <label>Quantity:</label>
      <input
        name="quantity"
        value={pokeInfo.quantity}
        onChange={handleChange}
      />
      <label>Price (in cents):</label>
      <input name="price" value={pokeInfo.price} onChange={handleChange} />
      <label>Type:</label>
      <input
        name="pokeType"
        value={pokeInfo.pokeType}
        onChange={handleChange}
      />
      <button className="submit" type="submit">
        Submit
      </button>
      <button className="cancel" type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  )
}

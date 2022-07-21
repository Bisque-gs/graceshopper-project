import React from 'react'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function AddProduct() {
    [name, setName] = useState("");
    [quantity, setQuantity] = useState("");
    [price, setPrice] = useState("");
    [pokeType, setPokeType] = useState("");
    
    

  const handleSubmit = (evt) =>  {
    evt.preventDefault()
    this.props.addProduct({ ...this.state })
    this.props.isAddVisible()
  }

    
  const handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  const handleCancel = () => {
    this.props.isAddVisible()
  }
    

  return (
    <form onSubmit={this.handleSubmit}>
      <h4>Please input new product information below:</h4>
      <label>Name:</label>
      <input name="name" value={name} onChange={handleChange} />
      <label>Quantity:</label>
      <input name="quantity" value={quantity} onChange={handleChange} />
      <label>Price (in cents):</label>
      <input name="price" value={price} onChange={handleChange} />
      <label>Type:</label>
      <input name="pokeType" value={pokeType} onChange={handleChange} />
      <button className="submit" type="submit">
        Submit
      </button>
      <button className="cancel" type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  )
}

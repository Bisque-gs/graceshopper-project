// import React from "react"

// export class AddProduct extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       name: "",
//       quantity: 0,
//       price: 0,
//       pokeType: "",
//     }
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//   }

//   handleSubmit(evt) {
//     evt.preventDefault()
//     this.props.addProduct({ ...this.state })
//     this.props.isAddVisible()
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value,
//     })
//   }

//   handleCancel ()  {
//     this.props.isAddVisible()
//   }

//   render() {
//     const { name, quantity, price, pokeType } = this.state
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <h4>Please input new product information below:</h4>
//         <label>Name:</label>
//         <input name="name" value={name} onChange={this.handleChange} />
//         <label>Quantity:</label>
//         <input name="quantity" value={quantity} onChange={this.handleChange} />
//         <label>Price (in cents):</label>
//         <input name="price" value={price} onChange={this.handleChange} />
//         <label>Type:</label>
//         <input name="pokeType" value={pokeType} onChange={this.handleChange} />
//         <button className="submit" type="submit">
//           Submit
//         </button>
//         <button className="cancel" type="button" onClick={this.handleCancel}>
//           Cancel
//         </button>
//       </form>
//     )
//   }
// }

// export default AddProduct




//FUNCTIONAL HOOK COMPONENT VERSION 
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


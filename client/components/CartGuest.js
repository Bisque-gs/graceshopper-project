import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function CartGuest(props) {
  const { user, cartItems, adjustQuantity, clickDelete, auth } = props
  console.log(auth)

  return (
    <div>
      This is guest's cart!
      <br />
      <div className="column">
        This is guest's cart!
        <Link to={`/users/guest/cart/checkout`}>
          <button type="button">💸CHECKOUT💸</button>
        </Link>
      </div>
      <div className="unit">
        {cartItems
          .sort((a, b) => a.id - b.id)
          .map((item, i) => (
            <div key={item.id} className={item.pokeType + " profile"}>
              {console.log(item)}
              <h3>
                <Link to={`/products/${item.id}`}>{item.name}</Link>
              </h3>
              <img src={item.imageUrl} />

              <div className="column">
                <h3>UNIT PRICE: ${(item.price / 100).toFixed(2)}</h3>
                <p>QUANTITY: {item.quantity}</p>
              </div>

              <div>
                <button
                  onClick={() =>
                    adjustQuantity({
                      userId: user.id,
                      productId: item.id,
                      quantity: item.quantity + 1,
                    })
                  }
                  type="button"
                >
                  ➕
                </button>
                <button
                  onClick={() =>
                    adjustQuantity({
                      userId: user.id,
                      productId: item.id,
                      quantity: item.quantity - 1,
                    })
                  }
                  type="button"
                >
                  ➖
                </button>
                <button
                  onClick={() =>
                    clickDelete({
                      userId: user.id,
                      productId: item.id,
                    })
                  }
                  className="cancel"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CartGuest

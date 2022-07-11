import React from "react"
import { Link } from "react-router-dom"

function CartGuest(props) {
  const { user, adjustQuantity, clickDelete, guestCart } = props
  const cartItems = JSON.parse(guestCart) || []

  return (
    <div>
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
          .map((item) => (
            <div key={item.id} className={item.pokeType + " profile"}>
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
                      quantity: 1, // add 1 to total
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
                      quantity: -1, // add -1 to total
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

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function CartUser(props) {
  const {
    cartAuthorization,
    user,
    cartItems,
    itemQuantities,
    auth,
    adjustQuantity,
    clickDelete,
  } = props
  console.log("user", itemQuantities)
  return (
    <div>
      {cartAuthorization || auth.isAdmin ? (
        <div>
          <div>
            This is {user.username}'s cart!
            {user.username && (
              <Link to={`/users/${user.id}/cart/orderhistory`}>
                <button type="button">💸ORDER HISTORY💸</button>
              </Link>
            )}
          </div>
          <br />
          <div className="column">
            This is {user.username}'s cart!
            <Link to={`/users/${user.id}/cart/checkout`}>
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
                    <h3>
                      UNIT PRICE: $
                      {(itemQuantities[i].price / 10000).toFixed(2)}
                    </h3>
                    <p>QUANTITY: {itemQuantities[i].quantity}</p>
                  </div>

                  <div>
                    <button
                      onClick={() =>
                        adjustQuantity({
                          userId: user.id,
                          productId: item.id,
                          quantity: itemQuantities[i].quantity + 1,
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
                          quantity: itemQuantities[i].quantity - 1,
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
      ) : (
        <div>
          STOP! YOU VIOLATED THE LAW! PAY THE COURT A FINE OR SERVE YOUR
          SENTENCE, YOUR STOLEN GOODS ARE NOW FORFEIT
        </div>
      )}
    </div>
  )
}

export default CartUser

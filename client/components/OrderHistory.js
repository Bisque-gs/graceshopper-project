import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser, fetchUserOrderHistory } from "../redux/singleUser"
import { Link } from "react-router-dom"

const OrderHistory = (props) => {
  let [selectedOrder, setSelectedOrder] = useState("")

  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  let cartAuthorization = user.user.id === auth.id
  console.log(user)

  const dispatch = useDispatch()

  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchUser(Number(id)))
    dispatch(fetchUserOrderHistory(Number(id)))
  }, [])

  let ordersHistory = user.orderHistory.userAllOrders || []

  const handleChange = (evt) => {
    setSelectedOrder(evt.target.value)
  }

  let currentSelectedUserIndex = selectedOrder - 1
  let total = 0

  return (
    <React.Fragment>
      <select name="selectList" id="selectList" onChange={handleChange}>
        <option value={""}>Choose An Order!</option>
        {ordersHistory.map((order) => {
          return (
            <option key={order.id} value={order.id}>
              Order: {order.id}
            </option>
          )
        })}
      </select>
      <div>
        {cartAuthorization ? (
          <div>
            <br />
            <div className="column">
              This is {user.user.username}'s Order History!
            </div>
            {currentSelectedUserIndex !== -1 ? (
              <div className="unit">
                {ordersHistory[currentSelectedUserIndex].products.map(
                  (product, i) => (
                    <div key={product.id} className="profile">
                      <h3>
                        <Link to={`/products/${product.id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <img src={product.imageUrl} />

                      <div className="column">
                        <h3>
                          UNIT PRICE: {product.orderProducts.price / 10000}
                        </h3>
                        <p>QUANTITY: {product.orderProducts.quantity}</p>
                      </div>
                      <div style={{ display: "none" }}>
                        {(total += product.orderProducts.price)}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div>SELECT AN ORDER </div>
            )}
            <div>TOTAL PRICE: ${total / 10000}</div>
          </div>
        ) : (
          <div>
            STOP! YOU VIOLATED THE LAW! PAY THE COURT A FINE OR SERVE YOUR
            SENTENCE, YOUR STOLEN GOODS ARE NOW FORFEIT{" "}
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default OrderHistory

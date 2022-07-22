import React, { useEffect, useRef } from "react"

export default function Paypal({
  totalPrice,
  userId,
  itemQuantities,
  checkout,
  guestName,
  guestEmail
}) {
  const paypal = useRef()

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "pokemons",
                amount: {
                  currency_code: "USD",
                  value: totalPrice,
                },
              },
            ],
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture()
          checkout({
            userId: userId,
            checkoutInfo: {itemQuantities, guestEmail, guestName}
          })
          // console.log(order)
        },
        onError: (err) => {
          console.log(err)
        },
      })
      .render(paypal.current)
  }, [])
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  )
}

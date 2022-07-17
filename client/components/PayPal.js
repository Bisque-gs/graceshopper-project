import React, { useEffect, useRef } from "react"

export default function Paypal({
  totalPrice,
  userId,
  itemQuantities,
  checkout,
  guestemail,
  guestname
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
            itemQuantities,
            guestemail,
            guestname
          })
          console.log(order)
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

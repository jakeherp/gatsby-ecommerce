import React, { useContext } from "react"
import { StoreContext } from "../../context/store.context"

const Cart = () => {
  const { isCartOpen, checkout } = useContext(StoreContext)

  return (
    <div
      style={{
        position: `fixed`,
        top: 0,
        right: 0,
        width: `50%`,
        height: `100%`,
        background: `#fff`,
        boxShadow: `var(--elevation-4)`,
      }}
    >
      <h3>Cart</h3>
      {checkout.lineItems.map(item => (
        <div key={item.key}>
          <h4>{item.title}</h4>
          <p>
            {item.quantity} - ${item.variant.price}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Cart

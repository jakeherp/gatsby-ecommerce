import React, { useContext } from "react"
import { animated } from "react-spring"
import { StoreContext } from "../../context/store.context"

const Cart = ({ style }) => {
  const { isCartOpen, checkout, toggleCart } = useContext(StoreContext)

  return (
    <animated.div
      style={{
        position: `fixed`,
        top: 0,
        right: 0,
        width: `50%`,
        minWidth: 300,
        height: `100%`,
        background: `#fff`,
        boxShadow: `var(--elevation-4)`,
        padding: `2rem`,
        ...style,
      }}
    >
      <button
        onClick={toggleCart}
        style={{
          position: `absolute`,
          top: 16,
          right: 16,
        }}
      >
        &times;
      </button>
      <h3 className="title">Cart</h3>
      {checkout.lineItems.map(item => (
        <div key={item.key} style={{ display: `flex` }}>
          <img
            src={item.variant.image.src}
            alt={item.title}
            style={{ maxWidth: 100, marginRight: 16 }}
          />
          <div>
            <h4 className="title is-5">{item.title}</h4>
            <p className="subtitle is-6">
              Quantity: {item.quantity} - ${item.variant.price}
            </p>
            <button className="is-small button is-danger is-outlined">
              Remove
            </button>
          </div>
        </div>
      ))}
      <hr />
      <p className="title is-4">Total: ${checkout.totalPrice}</p>
    </animated.div>
  )
}

export default Cart

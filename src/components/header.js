import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { StoreContext } from "../context/store.context"
import { useTransition } from "react-spring"
import "../style.scss"

import Cart from "./Cart/Cart"
import Loader from "./Loader"

const Header = () => {
  const { isCartOpen, toggleCart, checkout } = useContext(StoreContext)
  const transitions = useTransition(isCartOpen, null, {
    from: {
      transform: `translate3d(100%, 0, 0)`,
    },
    enter: {
      transform: `translate3d(0, 0, 0)`,
    },
    leave: {
      transform: `translate3d(100%, 0, 0)`,
    },
  })
  const quantity = checkout.lineItems.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <React.Fragment>
      <header
        className="navbar"
        style={{ background: "var(--purp)", boxShadow: "var(--elevation-2)" }}
      >
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <h1 style={{ color: `#fff` }}>My Gatsby Store</h1>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            {quantity > 0 && (
              <div
                style={{
                  color: `#fff`,
                  background: `var(--red)`,
                  borderRadius: `50%`,
                  height: `1rem`,
                  width: `1rem`,
                  lineHeight: `1rem`,
                  fontSize: `0.5rem`,
                  textAlign: `center`,
                }}
              >
                {quantity}
              </div>
            )}
            <FaShoppingCart
              style={{ color: "white", height: 30, width: 30 }}
              onClick={toggleCart}
            />
          </div>
        </div>
        {transitions.map(
          ({ item, key, props }) => item && <Cart key={key} style={props} />
        )}
      </header>
      <Loader />
    </React.Fragment>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

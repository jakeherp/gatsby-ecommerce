import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { StoreContext } from "../context/store.context"
import { useTransition, animated } from "react-spring"
import "../style.scss"

import Cart from "./Cart/Cart"

const Header = () => {
  const { addProductToCart, client, isCartOpen, toggleCart } = useContext(
    StoreContext
  )
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

  return (
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
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

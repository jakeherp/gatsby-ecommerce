import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { StoreContext } from "../context/store.context"
import "../style.scss"

import Cart from "./Cart/Cart"

const Header = ({ siteTitle }) => {
  const { isCartOpen, addProductToCart, client } = useContext(StoreContext)

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
          <FaShoppingCart style={{ color: "white", height: 30, width: 30 }} />
        </div>
      </div>
      <Cart />
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

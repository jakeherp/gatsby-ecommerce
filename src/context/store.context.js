import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: "my-gatsby-store.myshopify.com",
  storefrontAccessToken: "3de3d8215f1549452cc931e1cf29bf12",
})

const defaultValues = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {},
  client,
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const [checkoutId, setCheckoutId] = useState({})

  useEffect(() => {
    initialiseCheckout()
  }, [])

  const initialiseCheckout = async () => {
    try {
      const newCheckout = await client.checkout.create()
      setCheckoutId(newCheckout.id)
    } catch (err) {
      console.error(err)
    }
  }

  const addProductToCart = async variantId => {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ]
      const addItems = await client.checkout.addLineItems(checkoutId, lineItems)
      console.log(addItems)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <StoreContext.Provider value={{ ...defaultValues, addProductToCart }}>
      {children}
    </StoreContext.Provider>
  )
}

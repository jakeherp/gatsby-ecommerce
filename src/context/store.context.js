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
  const [checkout, setCheckout] = useState({})

  useEffect(() => {
    initialiseCheckout()
  }, [])

  const initialiseCheckout = async () => {
    try {
      const isBrowser = typeof window !== undefined
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null

      let newCheckout = null

      if (currentCheckoutId) {
        newCheckout = await client.checkout.fetch(currentCheckoutId)
      } else {
        newCheckout = await client.checkout.create()
        if (isBrowser) {
          localStorage.setItem("checkout_id", newCheckout.id)
        }
      }

      setCheckout(newCheckout)
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
      const addItems = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
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

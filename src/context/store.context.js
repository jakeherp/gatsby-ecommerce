import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: "my-gatsby-store.myshopify.com",
  storefrontAccessToken: "3de3d8215f1549452cc931e1cf29bf12",
})

const defaultValues = {
  isCartOpen: false,
  toggleCart: false,
  cart: [],
  checkout: {
    lineItems: [],
  },
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  client,
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  useEffect(() => {
    initialiseCheckout()
  }, [])

  const isBrowser = typeof window !== undefined

  const getNewId = async () => {
    try {
      const newCheckout = await client.checkout.create()
      if (isBrowser) {
        localStorage.setItem("checkout_id", newCheckout.id)
      }
      return newCheckout
    } catch (err) {
      console.error(err)
    }
  }

  const initialiseCheckout = async () => {
    try {
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null

      let newCheckout = null

      if (currentCheckoutId) {
        newCheckout = await client.checkout.fetch(currentCheckoutId)

        if (newCheckout.completedAt) {
          newCheckout = await getNewId()
        }
      } else {
        newCheckout = await getNewId()
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
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
      setCheckout(newCheckout)
    } catch (err) {
      console.error(err)
    }
  }

  const removeProductFromCart = async lineItemId => {
    try {
      const newCheckout = await client.checkout.removeLineItems(checkout.id, [
        lineItemId,
      ])
      setCheckout(newCheckout)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addProductToCart,
        removeProductFromCart,
        checkout,
        toggleCart,
        isCartOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

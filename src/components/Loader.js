import React, { useContext } from "react"
import { StoreContext } from "../context/store.context"
import { useTransition, animated } from "react-spring"

const Loader = () => {
  const { isLoading } = useContext(StoreContext)
  //   const isLoading = true

  const transitions = useTransition(isLoading, null, {
    from: {
      transform: `translate3d(-100%, 0, 0)`,
    },
    enter: {
      transform: `translate3d(0, 0, 0)`,
    },
    leave: {
      transform: `translate3d(100%, 0, 0)`,
    },
  })

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          style={{
            position: `fixed`,
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            background: `rgba(0,0,0,0.5)`,
            color: `#fff`,
            zIndex: 1000,
            textAlign: `center`,
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
            ...props,
          }}
        >
          Loading ...
        </animated.div>
      )
  )
}

export default Loader

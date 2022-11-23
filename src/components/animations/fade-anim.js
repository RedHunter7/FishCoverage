import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'

const FadeAnimation = (props) => {
  const [isVisible, setVisible] = useState(true)
  const variants = {
    open: {
      opacity: 1
    },
    close: {
      opacity: 0
    }
  }

  const transition = {
    duration: props.duration,
    easings: (props.in) ? 'circIn' : 'circOut',
    delay: props.delay
  }

  const onAnimationComplete = () => {
    if (props.unmountOnExit) setVisible(false)
  }

  return <AnimatePresence>
    {isVisible && (
        <motion.div transition={transition}
          animate={(props.in) ? 'open' : 'close'}
          initial={(props.in) ? false : 'close'}
          variants={variants}
          onAnimationComplete={onAnimationComplete}>
              {props.children}
          </motion.div>
    )}
  </AnimatePresence>
}

FadeAnimation.defaultProps = {
  duration: 0.7,
  delay: 0,
  unmountOnExit: false
}

FadeAnimation.propTypes = {
  children: PropTypes.node.isRequired,
  in: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
  unmountOnExit: PropTypes.bool.isRequired
}

export { FadeAnimation }

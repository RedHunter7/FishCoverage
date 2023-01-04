import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@chakra-ui/react'
import { colors, fontFamily } from '../../theme'

const myButtonStyle = {
  fontFamily: fontFamily.amaranth,
  w: ['80px', '80px', '100px', '100px'],
  fontSize: ['16px', '16px', '20px', '20px'],
  color: colors.palseSpringBud
}

const MyButton = (props) => {
  return <Button
            onClick={props.onClick}
            sx={myButtonStyle}
            size='md' bg={props.bg} _hover={{
              bg: colors.palseSpringBud,
              color: props.bg
            }}>
            {props.children}
        </Button>
}

MyButton.propTypes = {
  bg: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}

export { MyButton }

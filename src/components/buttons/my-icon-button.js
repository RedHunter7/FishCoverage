import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { IconButton } from '@chakra-ui/react'
import { colors } from '../../theme'

const myIconButtonStyle = {
  paddingLeft: '5px',
  paddingRight: '5px',
  fontSize: ['4xl', '4xl', '5xl', '5xl'],
  fill: colors.palseSpringBud
}

const MyIconButton = (props) => {
  return <IconButton sx={myIconButtonStyle}
      as={RouterLink} to='/' size='lg'
      variant='ghost' aria-label='Favorite List'
      icon={props.icon} _hover={{
        fill: colors.blueSapphire,
        bg: colors.palseSpringBud
      }}
    />
}

MyIconButton.propTypes = {
  icon: PropTypes.element.isRequired
}

export { MyIconButton }

import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '@chakra-ui/react'
import { colors, fontFamily } from '../theme'

const searchInputStyle = {
  height: ['42px', '50px'],
  paddingLeft: '70px',
  bg: colors.palseSpringBud,
  borderRadius: '10px',
  color: colors.blueSapphire,
  fontFamily: fontFamily.amaranth,
  fontSize: ['18px', '2xl'],
  fontWeight: 'medium',
  outline: 'none'
}

const SearchInput = (props) => {
  return <Input type='text'
    sx={searchInputStyle}
    placeholder='Search Fish Name'
    onChange={props.onChange}
    _focus={{
      border: '3px solid',
      borderColor: colors.blueSapphire
    }} />
}

SearchInput.propTypes = {
  onChange: PropTypes.func
}

export default SearchInput

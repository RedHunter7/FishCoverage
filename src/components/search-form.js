import React from 'react'
import PropTypes from 'prop-types'
import {
  VStack, InputGroup,
  InputLeftElement, HStack
} from '@chakra-ui/react'
import { SearchIcon } from './icons/search-icon'
import { colors } from '../theme'
import { MyButton } from './buttons'
import SearchInput from './search-input'

const SearchForm = (props) => {
  return <VStack spacing={4} justify='center' width='80%'>
        <InputGroup maxW='3xl'>
            <InputLeftElement pointerEvents='none' left='2%'
            top={['2%', '2%', '10%', '12%']} fill={colors.blueSapphire}
            fontSize={['24px', '28px']}>
            <SearchIcon />
            </InputLeftElement>
            <SearchInput
            ref={props.inputRef}
            onChange={props.onChange}
            value={props.value}
            />
        </InputGroup>
        <HStack spacing='24px'>
            <MyButton bg={colors.indigoDye}
            onClick={props.onSubmit}>
              Search
            </MyButton>
            <MyButton bg={colors.venetianRed}
            onClick={props.onReset}>Reset
            </MyButton>
        </HStack>
    </VStack>
}

SearchForm.propTypes = {
  inputRef: PropTypes.object,
  value: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onReset: PropTypes.func
}

export default SearchForm

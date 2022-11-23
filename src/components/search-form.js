import React from 'react'
import {
  VStack, InputGroup, InputLeftElement,
  Input, HStack
} from '@chakra-ui/react'
import { SearchIcon } from './icons/search-icon'
import { colors, fontFamily } from '../theme'
import { MyButton } from './buttons'

class SearchForm extends React.Component {
  render () {
    return <VStack spacing={4} justify='center' width='80%'>
        <InputGroup maxW='3xl'>
            <InputLeftElement pointerEvents='none' left='2%'
            top={['2%', '2%', '10%', '12%']} fill={colors.blueSapphire}
            fontSize={['24px', '28px']}>
            <SearchIcon />
            </InputLeftElement>
            <Input type='text' placeholder='Search Fish Name'
            height={['42px', '50px']} paddingLeft='70px'
            bg={colors.palseSpringBud} borderRadius='10px'
            color={colors.blueSapphire} fontFamily={fontFamily.amaranth}
            fontSize={['18px', '2xl']} fontWeight='medium' outline='none'
            _focus={{
              border: '3px solid',
              borderColor: colors.blueSapphire,
              outline: 'none'
            }} />
        </InputGroup>
        <HStack spacing='24px'>
            <MyButton bg={colors.indigoDye}>Search</MyButton>
            <MyButton bg={colors.venetianRed}>Reset</MyButton>
        </HStack>
    </VStack>
  }
}

export default SearchForm

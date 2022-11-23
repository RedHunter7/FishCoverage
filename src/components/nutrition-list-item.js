import React from 'react'
import PropTypes from 'prop-types'
import {
  HStack, Box, ListItem, Text
} from '@chakra-ui/react'

const NutritionListItem = (props) => {
  return <ListItem fontWeight='700'>
        <HStack>
            <Box w='55%' h='40px'>
                <Text textAlign='left'>
                    {props.substanceName}
                </Text>
            </Box>
            <Text w='5%' h='40px' textAlign='center'>
                :
            </Text>
            <Box w='40%' h='40px'>
                <Text textAlign='right'>
                    {props.nutritionValue}
                </Text>
            </Box>
        </HStack>
    </ListItem>
}

NutritionListItem.propTypes = {
  substanceName: PropTypes.string.isRequired,
  nutritionValue: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]).isRequired
}

export default NutritionListItem

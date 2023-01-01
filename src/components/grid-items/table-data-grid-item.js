import React from 'react'
import PropTypes from 'prop-types'
import {
  GridItem, VStack, Heading,
  Box, UnorderedList, Spinner,
  Center
} from '@chakra-ui/react'
import NutritionListItem from '../nutrition-list-item'
import { FadeAnimation } from '../animations'

const TableDataGridItem = (props) => {
  return <GridItem colSpan={props.width} order={props.order}
  layerStyle='sectionCard' className='fish-grid-item'>
        <VStack align='start' spacing='2' marginTop='10px'
         marginBottom='0' marginX='20px'>
            <Heading fontSize={['2xl', '2xl', '2xl', '3xl']}>
              {props.title} :
            </Heading>
            <Box height={['350px', '350px', '350px', '310px']}
            width="100%" overflowY='auto'>
                <Center width='100%' position={'relative'} top={'35%'}>
                  <FadeAnimation in={!props.isLoaded} unmountOnExit={true}>
                    <Spinner thickness='6px' mb={['20px']}/>
                  </FadeAnimation>
                </Center>
                <FadeAnimation in={props.isLoaded} delay={0.7}>
                  <UnorderedList width='90%'>
                    {
                      props.data.map(item => {
                        return <NutritionListItem
                          key={item.name}
                          substanceName={item.name}
                          nutritionValue={item.value}/>
                      })
                    }
                  </UnorderedList>
                </FadeAnimation>
            </Box>
        </VStack>
    </GridItem>
}

TableDataGridItem.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number, PropTypes.array
  ]).isRequired,
  order: PropTypes.oneOfType([
    PropTypes.number, PropTypes.array
  ]).isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]).isRequired
  })).isRequired,
  isLoaded: PropTypes.bool.isRequired
}

export { TableDataGridItem }

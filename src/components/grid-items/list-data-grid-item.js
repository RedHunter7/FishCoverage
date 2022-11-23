import React from 'react'
import PropTypes from 'prop-types'
import {
  GridItem, VStack, Heading, Spinner,
  UnorderedList, ListItem, Box, Flex
} from '@chakra-ui/react'
import { FadeAnimation } from '../animations'

const ListDataGridItem = (props) => {
  let vStackMarginBottomMd = 0

  if (typeof props.width === 'object' && props.width[2] === 12) {
    vStackMarginBottomMd = '16px'
  }

  const listText = props.listText

  // const spinnerDisplay = (props.isLoaded) ? 'none' : 'flex'

  return <GridItem colSpan={props.width} order={props.order}
  layerStyle='sectionCard' className='fish-grid-item' height={'fit-content'}>
        <VStack align='start' spacing='2' marginTop='10px'
        marginBottom={['16px', '16px', vStackMarginBottomMd, '16px']}
        mr={['5%', '5%', '4%', '30px']} ml={['5%', '5%', '4%', '20px']}>
            <Heading fontSize={['2xl', '2xl', '2xl', '3xl']} ml={'10px'}>
                {props.title} :
            </Heading>
            <Flex justifyContent='center' width='100%'>
              <FadeAnimation in={!props.isLoaded} unmountOnExit={true}>
                <Spinner thickness='6px' mb={['20px']}/>
              </FadeAnimation>
            </Flex>

            <Box maxHeight={props.listBoxHeight} width='100%'
            overflowY='auto' pl='1%'>
              <FadeAnimation in={props.isLoaded} delay={0.7}>
                  <UnorderedList width='95%' textAlign='justify'>
                    {
                      listText.map((item, index) => {
                        return <ListItem key={index}>
                              {item}
                          </ListItem>
                      })
                    }
                  </UnorderedList>
              </FadeAnimation>
            </Box>
        </VStack>
    </GridItem>
}

ListDataGridItem.propTypes = {
  listBoxHeight: PropTypes.oneOfType([
    PropTypes.number, PropTypes.array
  ]).isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number, PropTypes.array
  ]).isRequired,
  order: PropTypes.oneOfType([
    PropTypes.number, PropTypes.array
  ]).isRequired,
  title: PropTypes.string.isRequired,
  listText: PropTypes.array,
  isLoaded: PropTypes.bool.isRequired
}

ListDataGridItem.defaultProps = {
  listBoxHeight: ['fit-content', 'fit-content', 'fit-content', '310px'],
  listText: []
}

export { ListDataGridItem }

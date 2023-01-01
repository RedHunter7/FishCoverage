import React from 'react'
import PropTypes from 'prop-types'
import {
  GridItem, VStack, Heading,
  Text, Box, Spinner, Flex
} from '@chakra-ui/react'
import { FadeAnimation } from '../animations'

const ParagraphDataGridItem = (props) => {
  const spinnerDisplay = (props.text === (null || '')) ? 'flex' : 'none'

  let text = props.text
  if (props.isLoaded && text == null) text = 'Not Avaiable'
  return <GridItem colSpan={props.width} order={props.order}
  layerStyle='sectionCard' height='fit-content' className='fish-grid-item'>
        <VStack align='start' spacing='2' marginTop='10px'
        marginBottom='20px' marginX='30px'>
            <Heading fontSize={['2xl', '2xl', '2xl', '3xl']}
            ml={['-10px', '-10px', 0, 0]}>
              {props.title} :
            </Heading>
            <Flex display={spinnerDisplay} width='100%'
            justifyContent='center'>
              <FadeAnimation in={!props.isLoaded} unmountOnExit={true}>
                  <Spinner thickness='6px' mb={['20px']}/>
                </FadeAnimation>
            </Flex>
            <FadeAnimation in={props.isLoaded} delay={0.7}>
              <Box maxHeight={['fit-content', 'fit-content', 'fit-content', '270px']}
              overflowY='auto'>
                  <Text textAlign='justify'>
                      {text}
                  </Text>
              </Box>
            </FadeAnimation>
        </VStack>
    </GridItem>
}

ParagraphDataGridItem.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number, PropTypes.array
  ]).isRequired,
  order: PropTypes.oneOfType([
    PropTypes.number, PropTypes.array
  ]).isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired
}

ParagraphDataGridItem.defaultProps = {
  order: 0
}

export { ParagraphDataGridItem }

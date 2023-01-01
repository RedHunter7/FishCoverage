import React from 'react'
import PropTypes from 'prop-types'
import {
  GridItem, VStack, Heading,
  Image, Spinner, Center
} from '@chakra-ui/react'
import { colors, fontFamily } from '../../theme'
import fishDefaultImg from '../../images/fish-default.png'
import { FadeAnimation } from '../animations'

const OverviewDataGridItem = (props) => {
  return <GridItem colSpan={props.width} order={props.order}
  layerStyle='sectionCard' height='fit-content'>
    <FadeAnimation in={!props.isLoaded} unmountOnExit={true}>
      <Center marginTop={'30%'}>
        <Spinner thickness='6px' mb={['20px']}/>
      </Center>
    </FadeAnimation>
    <FadeAnimation in={props.isLoaded} delay={0.7}>
      <VStack spacing={5} align='center' marginY='20px'>
          <Center width='90%' border='solid'
          borderRadius='30px' borderColor={colors.mountainMeadow}
          borderWidth= {['4px', '4px', '6px', '6px']}>
            <Image src={props.fishImage}
                maxWidth={['75vw', '80vw', '80%', '80%']}
                maxHeight={['50vw', '50vw', 'auto', '210px']}/>
          </Center>
          <Heading fontSize={['3xl', '3xl', '3xl', '4xl']}
            textAlign='center'>
              {props.fishName}
          </Heading>
          <Heading fontSize={['20px', '20px', '18px', '20px']}
            fontFamily={fontFamily.montserrat}>
                {props.fishLatinName}
          </Heading>
      </VStack>
    </FadeAnimation>
  </GridItem>
}

OverviewDataGridItem.defaultProps = {
  fishImage: fishDefaultImg
}

OverviewDataGridItem.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number, PropTypes.array
  ]).isRequired,
  order: PropTypes.oneOfType([
    PropTypes.number, PropTypes.array
  ]).isRequired,
  fishName: PropTypes.string.isRequired,
  fishLatinName: PropTypes.string.isRequired,
  fishImage: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired
}

export { OverviewDataGridItem }

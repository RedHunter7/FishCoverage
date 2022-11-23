import React from 'react'
import PropTypes from 'prop-types'
import {
  GridItem, VStack, Heading, Image
} from '@chakra-ui/react'
import { fontFamily } from '../../theme'
import fishDefaultImg from '../../images/fish-default.png'

const OverviewDataGridItem = (props) => {
  return <GridItem colSpan={props.width} order={props.order} layerStyle='sectionCard' height='fit-content'>
    <VStack spacing={5} align='center' marginY='20px'>
        <Image src={props.fishImage}
        maxWidth={['75vw', '80vw', '80%', '80%']}
        maxHeight={['50vw', '50vw', 'auto', '210px']}/>
        <Heading fontSize={['3xl', '3xl', '3xl', '4xl']} textAlign='center'>
          {props.fishName}
        </Heading>
        <Heading fontSize={['20px', '20px', '18px', '20px']}
        fontFamily={fontFamily.montserrat}>
            {props.fishLatinName}
        </Heading>
    </VStack>
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
  fishImage: PropTypes.string
}

export { OverviewDataGridItem }

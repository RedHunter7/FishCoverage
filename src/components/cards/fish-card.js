import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Link, Stack, VStack, Image } from '@chakra-ui/react'
import { colors, fontFamily } from '../../theme'
import { LikeButton } from '../buttons'
import fishDefaultImg from '../../images/fish-default.png'

const fishCardStyle = {
  width: ['105vw', '105vw', '240px', '240px'],
  height: ['116px', '116px', '280px', '280px'],
  bg: colors.blueSapphire,
  borderRadius: '15px',
  borderWidth: ['4px', '4px', '6px', '6px'],
  borderBottomWidth: ['0', '0', '6px', '6px'],
  borderStyle: 'solid',
  borderColor: colors.mountainMeadow,
  '.fish-card-stack': {
    marginY: '10px',
    marginX: ['20px', '20px', 0, 0]
  },
  '.fish-card-img': {
    maxWidth: ['120px', '120px', '200px', '200px'],
    minWidth: ['120px', '120px', 0, 0],
    height: ['91px', '91px', '140px', '140px'],
    borderStyle: 'solid',
    borderRadius: '30px',
    borderColor: colors.mountainMeadow,
    borderWidth: ['4px', '4px', '6px', '6px']
  },
  '.fish-card-link': {
    marginTop: [0, 0, '6px', '6px'],
    marginBottom: [0, 0, '4px', '4px'],
    fontFamily: fontFamily.amaranth,
    color: colors.palseSpringBud,
    fontSize: ['22px', '22px', '2xl', '2xl'],
    height: ['34px', '34px', '40px', '40px'],
    width: ['100%', '100%', '210px', '210px'],
    textAlign: ['left', 'left', 'center', 'center'],
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}

const FishCard = (props) => {
  let linkName = props.title
  linkName = linkName.toLowerCase()
  linkName = linkName.replaceAll(/ /g, '-')

  return <Box sx={fishCardStyle}>
        <Stack className='fish-card-stack'
        direction={['row', 'row', 'column', 'column']}
        spacing={['15px', '15px', 0, 0]}
        align='center'>
          <Image src={props.imageSrc || undefined}
          className='fish-card-img'/>
            <VStack align={['left', 'left', 'center', 'center']}>
              <Link as={RouterLink} to={'/' + linkName}
              className='fish-card-link'>
                  {props.title}
              </Link>
              <LikeButton isLiked={props.isLiked}/>
            </VStack>
      </Stack>
  </Box>
}

FishCard.defaultProps = {
  imageSrc: fishDefaultImg
}

FishCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
  isLiked: PropTypes.bool.isRequired
}

export default FishCard

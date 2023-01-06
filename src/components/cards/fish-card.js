import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Center, Link, Stack, Image, ScaleFade } from '@chakra-ui/react'
import { colors, fontFamily } from '../../theme'
import fishDefaultImg from '../../images/fish-default.png'
import { useIntersectionObserver } from '../../custom-hooks'

const fishCardStyle = {
  width: ['105vw', '105vw', '240px', '240px'],
  height: ['116px', '116px', '220px', '220px'],
  bg: colors.blueSapphire,
  borderRadius: '15px',
  borderWidth: ['4px', '4px', '6px', '6px'],
  borderBottomWidth: ['0', '0', '6px', '6px'],
  borderStyle: 'solid',
  borderColor: colors.mountainMeadow,
  '.fish-card-stack': {
    marginY: ['9px', '9px', '10px', '10px'],
    marginX: ['20px', '20px', 0, 0]
  },
  '.fish-card-frame': {
    width: ['200px', '200px', '90%', '90%'],
    borderStyle: 'solid',
    borderRadius: '30px',
    borderColor: colors.mountainMeadow,
    borderWidth: ['4px', '4px', '6px', '6px']
  },
  '.fish-card-img': {
    maxWidth: ['120px', '120px', '180px', '180px'],
    height: ['84px', '84px', '126px', '126px'],
    padding: ['6px 4px', '6px 4px', '10px 7px', '10px 7px'],
    borderStyle: 'none'
  },
  '.fish-card-link': {
    marginTop: [0, 0, '10px', '10px'],
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
  const [isOpen, setOpen] = useState('false')
  const ref = useRef()

  useIntersectionObserver(ref, isIntersecting => {
    setOpen(isIntersecting)
  })

  let linkName = props.title
  linkName = linkName.toLowerCase()
  linkName = linkName.replaceAll(/ /g, '-')

  return <ScaleFade in={isOpen} ref={ref}>
      <Box sx={fishCardStyle}>
          <Stack className='fish-card-stack'
          direction={['row', 'row', 'column', 'column']}
          spacing={['15px', '15px', 0, 0]}
          align='center'>
            <Center className='fish-card-frame'>
              <Image src={props.imageSrc || undefined}
              fallbackSrc={fishDefaultImg}
              className='fish-card-img'/>
            </Center>
            <Link as={RouterLink} to={'/' + linkName}
                className='fish-card-link'>
                    {props.title}
            </Link>
        </Stack>
    </Box>
  </ScaleFade>
}

FishCard.defaultProps = {
  imageSrc: fishDefaultImg
}

FishCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string
}

export default FishCard

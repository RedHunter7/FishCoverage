import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, useToast } from '@chakra-ui/react'
import { colors, fontFamily } from '../../theme'
import { StarIcon, StarFillIcon } from '../icons'

const likeButtonStyle = {
  width: ['110px', '110px', '120px', '120px'],
  height: ['32px', '32px', '36px', '36px'],
  bg: '#02CFA3',
  color: '#000',
  fill: '#000',
  borderRadius: '30px',
  border: 'solid',
  borderColor: colors.mountainMeadow,
  fontFamily: fontFamily.montserrat,
  fontSize: ['18px', '18px', '22px', '22px'],
  fontWeight: 500,
  transitionProperty: 'background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,height,width'
}

const unlikeButtonStyle = {
  width: ['110px', '110px', '120px', '120px'],
  height: ['34px', '34px', '40px', '40px'],
  bg: '#transparent',
  color: colors.palseSpringBud,
  fill: colors.palseSpringBud,
  borderRadius: '30px',
  border: '3px solid',
  borderColor: colors.mountainMeadow,
  fontFamily: fontFamily.montserrat,
  fontSize: ['18px', '18px', '22px', '22px'],
  fontWeight: 500,
  transitionProperty: 'background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,height,width'
}

const LikeButton = (props) => {
  const [isLiked, setLikeStatus] = useState(props.isLiked)
  const [toastDisplay, setToastDisplay] = useState(false)
  const toast = useToast()

  const clickHandler = () => {
    setLikeStatus(!isLiked)
    setToastDisplay(true)
  }

  useEffect(() => {
    if (toastDisplay === true) {
      setToastDisplay(false)
      const toastProp = {
        title: 'Added to Favorite list',
        status: 'success'
      }

      if (!isLiked) {
        toastProp.title = 'Removed from favorite list'
        toastProp.status = 'error'
      }
      toast({
        title: toastProp.title,
        status: toastProp.status,
        duration: 1000,
        isClosable: true
      })
    }
  })

  const buttonProp = {
    style: likeButtonStyle,
    text: 'Like',
    icon: (<StarIcon/>),
    onHover: {
      background: 'transparent',
      color: colors.palseSpringBud,
      fill: colors.palseSpringBud,
      border: '3px solid',
      borderColor: colors.mountainMeadow,
      height: '38px'
    }
  }

  if (isLiked) {
    buttonProp.style = unlikeButtonStyle
    buttonProp.text = 'Liked'
    buttonProp.icon = (<StarFillIcon/>)
    buttonProp.onHover = {
      background: colors.mountainMeadow,
      color: '#000',
      fill: '#000'
    }
  }

  return (
        <Button leftIcon={buttonProp.icon} sx={buttonProp.style}
            _hover={buttonProp.onHover} onClick={clickHandler}
            _active={{ height: '48px', width: '144px' }}>
                {buttonProp.text}
        </Button>
  )
}

LikeButton.propTypes = {
  isLiked: PropTypes.bool.isRequired
}

export { LikeButton }

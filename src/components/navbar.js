import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Box, Link, Flex, Spacer, HStack } from '@chakra-ui/react'
import { colors, fontFamily } from '../theme'
import { ListStarIcon, ArrowLeftIcon } from './icons'
import { MyIconButton } from './buttons'

const navbarStyle = {
  position: 'fixed',
  top: '0',
  zIndex: 99,
  bg: colors.blueSapphire,
  w: '100%',
  color: colors.palseSpringBud,
  height: ['60px', '60px', '80px', '80px'],
  borderBottomRadius: '20px',
  '.navbar-flex': {
    minWidth: 'max-content',
    alignItems: 'center',
    gap: '4',
    marginX: ['20px', '30px', '34px', '60px'],
    height: '100%'
  },
  '.navbar-title': {
    fontFamily: fontFamily.lobster,
    fontSize: ['3xl', '3xl', '5xl', '5xl']
  }
}

const Navbar = (props) => {
  const backBtnDisplay = (props.showBackBtn) ? 'initial' : 'none'

  let title = props.title.replaceAll('-', ' ')
  title = title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())

  const currentUrl = useLocation().pathname

  return <Box sx={navbarStyle}>
      <Flex className='navbar-flex'>
        <HStack spacing={['20px', '25px', '45px', '60px']}>
          <Box display={backBtnDisplay}>
            <MyIconButton icon={<ArrowLeftIcon/>} />
          </Box>
          <Box>
            <Link as={RouterLink} to={currentUrl}
            className='navbar-title'>
              {title}
            </Link>
          </Box>
        </HStack>
        <Spacer />
        <MyIconButton icon={<ListStarIcon/>} />
      </Flex>
    </Box>
}

Navbar.defaultProps = {
  title: 'FishCov',
  showBackBtn: false
}

Navbar.propTypes = {
  title: PropTypes.string,
  showBackBtn: PropTypes.bool
}

export default Navbar

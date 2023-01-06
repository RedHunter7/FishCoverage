import React from 'react'
import { Wrap } from '@chakra-ui/react'
import { colors } from '../../theme'
import PropTypes from 'prop-types'

const listViewStyle = {
  width: '100%',
  borderBottomRadius: '15px',
  borderBottom: 'solid',
  borderBottomColor: colors.mountainMeadow,
  borderBottomWidth: ['4px', '4px', 0, 0],
  marginTop: ['30px', '60px']
}

const ListView = (props) => {
  return <Wrap sx={listViewStyle}
    spacing={[0, 0, '30px', '30px']}
    justify='center'>
    {props.children}
  </Wrap>
}

ListView.propTypes = {
  children: PropTypes.node
}

export { ListView }

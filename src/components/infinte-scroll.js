import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const InfiniteScroll = (props) => {
  useEffect(() => {
    const onScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log('Fetch more data')
        props.next()
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [window.scrollY])

  return <>
    {props.children}
    {props.loader}
  </>
}

InfiniteScroll.propTypes = {
  children: PropTypes.node,
  loader: PropTypes.node,
  next: PropTypes.func
}

export default InfiniteScroll

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const useScroll = () => {
  const [scroll, setScroll] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      setScroll(window.scrollY)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scroll
}

const InfiniteScroll = (props) => {
  const [reachedBottom, setReachedBottom] = useState(false)
  const scroll = useScroll()
  console.log(reachedBottom)

  useEffect(() => {
    const isBottom = scroll + window.innerHeight >= document.body.scrollHeight
    setReachedBottom(isBottom)
  }, [scroll])

  useEffect(() => {
    if (reachedBottom && props.enable) {
      setReachedBottom(false)
      props.next()
      console.log('bottom page')
    }
  }, [reachedBottom])

  const loader = (props.hasMore) ? props.loader : null

  return <>
    {props.children}
    {loader}
  </>
}

InfiniteScroll.propTypes = {
  enable: PropTypes.bool,
  hasMore: PropTypes.bool,
  children: PropTypes.node,
  loader: PropTypes.node,
  next: PropTypes.func
}

export default InfiniteScroll

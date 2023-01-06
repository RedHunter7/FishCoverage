import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useScroll } from '../../custom-hooks/use-scroll'

const InfiniteScroll = (props) => {
  const [reachedBottom, setReachedBottom] = useState(false)
  const scroll = useScroll()

  useEffect(() => {
    const isBottom = scroll + window.innerHeight >= document.body.scrollHeight
    setReachedBottom(isBottom)
  }, [scroll])

  useEffect(() => {
    if (reachedBottom && props.enable) {
      setReachedBottom(false)
      props.next()
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

export { InfiniteScroll }

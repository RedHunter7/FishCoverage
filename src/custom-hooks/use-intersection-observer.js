/* eslint-disable n/no-callback-literal */
import { useEffect } from 'react'

function useIntersectionObserver (ref, callback) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(true)
        } else {
          callback(false)
        }
      })
    })
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [callback, ref])
}

export { useIntersectionObserver }

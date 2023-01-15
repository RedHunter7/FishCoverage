import { useState, useEffect } from 'react'
import axios from 'axios'

const useFishes = () => {
  const [fishes, fetchFishes] = useState([])
  const [displayData, fetchDisplayData] = useState([])
  const [page, setPage] = useState(-1)
  const [hasMoreData, setDataStatus] = useState(true)
  const [searchResult, fetchSearchResult] = useState([])

  const displayMoreData = () => {
    const startIndex = page * 20
    const endIndex = startIndex + 20

    const newDisplayData = displayData.concat(searchResult.slice(startIndex, endIndex))
    fetchDisplayData(newDisplayData)

    if (endIndex >= searchResult.length && searchResult.length > 0) {
      setDataStatus(false)
    }
  }

  useEffect(() => {
    axios.get('https://www.fishwatch.gov/api/species')
      .then(response => {
        fetchFishes(response.data)
        fetchSearchResult(response.data)
        setPage(0)
      })
  }, [])

  useEffect(displayMoreData, [page])

  useEffect(() => fetchDisplayData([]), [searchResult])

  useEffect(() => {
    if (displayData.length === 0) {
      setPage(0)
      setDataStatus(true)
      displayMoreData()
    }
  }, [displayData])

  return {
    fishes,
    displayData,
    page,
    hasMoreData,
    searchResult,
    setPage,
    fetchSearchResult
  }
}

export { useFishes }

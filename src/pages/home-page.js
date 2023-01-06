import React, { Suspense, useState, useEffect } from 'react'
import { WrapItem, Spinner, Center } from '@chakra-ui/react'
import FishCard from '../components/cards/fish-card'
import InfiniteScroll from '../components/utility/infinte-scroll'
import axios from 'axios'
import { SearchForm } from '../components/forms'
import { Navbar, ListView } from '../components/layouts'
// import { FadeAnimation } from '../components/animations'

const HomePage = () => {
  const [fishes, fetchFishes] = useState([])
  const [displayData, fetchDisplayData] = useState([])
  const [page, setPage] = useState(-1)
  const [hasMoreData, setDataStatus] = useState(true)
  const [searchResult, fetchSearchResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  // const [isLoaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    axios.get('https://www.fishwatch.gov/api/species')
      .then((response) => {
        fetchFishes(response.data)
        fetchSearchResult(response.data)
        setPage(0)
        // setIsLoaded(true)
      })
  }, [])

  const displayMoreData = () => {
    console.log(page)
    const startIndex = page * 20
    const endIndex = startIndex + 20

    const newDisplayData = displayData.concat(searchResult.slice(startIndex, endIndex))
    fetchDisplayData(newDisplayData)
    console.log(displayData.length)

    if (endIndex >= searchResult.length && searchResult.length > 0) {
      setDataStatus(false)
    }
  }

  useEffect(displayMoreData, [page])

  const handleChange = (event) => {
    console.log(event.target.value)
    setSearchValue(event.target.value)
  }

  const handleSubmit = () => {
    const newSearchResult = fishes.filter(item => {
      const regex = new RegExp(searchValue, 'i')
      return regex.test(item['Species Name']) === true
    })
    fetchSearchResult(newSearchResult)
  }

  useEffect(() => fetchDisplayData([]), [searchResult])

  useEffect(() => {
    if (displayData.length === 0) {
      setPage(0)
      setDataStatus(true)
      displayMoreData()
    }
  }, [displayData])

  const handleReset = () => {
    setSearchValue('')
    fetchSearchResult(fishes)
  }

  const spinner = (
    <Center marginTop='50px'>
        <Spinner thickness='6px'/>
    </Center>
  )

  return (
      <>
        <Navbar/>
        <Suspense fallback={<div>Loading</div>}>
            <SearchForm
            value={searchValue}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
            />
            <InfiniteScroll
            enable={displayData.length > 0}
            hasMore={hasMoreData}
            next={() => setPage(page + 1)}
            loader={spinner}>
              <ListView>
              {
                  displayData.map((item, index) => {
                    const imgUrl = item['Species Illustration Photo'].src

                    return <WrapItem key={index}>
                        <FishCard title={item['Species Name']}
                            imageSrc={imgUrl} />
                      </WrapItem>
                  })
                }
              </ListView>
            </InfiniteScroll>
        </Suspense>
      </>
  )
}

export default HomePage

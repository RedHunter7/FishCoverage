import React, { Suspense, useState, useEffect } from 'react'
import { WrapItem, Spinner, Wrap, Center } from '@chakra-ui/react'
import SearchForm from '../components/search-form'
import FishCard from '../components/cards/fish-card'
import Navbar from '../components/navbar'
import { colors } from '../theme'
import InfiniteScroll from '../components/infinte-scroll'
import axios from 'axios'
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
              <Wrap width={'100%'}
                borderBottomRadius='15px'
                borderBottom='solid'
                borderBottomColor={colors.mountainMeadow}
                borderBottomWidth={['4px', '4px', 0, 0]}
                spacing={[0, 0, '30px', '30px']}
                mt={['30px', '60px']} justify='center'>
                {
                  displayData.map((item, index) => {
                    const imgUrl = item['Species Illustration Photo'].src

                    return <WrapItem key={index}>
                        <FishCard title={item['Species Name']}
                            imageSrc={imgUrl} />
                      </WrapItem>
                  })
                }
              </Wrap>
            </InfiniteScroll>
        </Suspense>
      </>
  )
}

export default HomePage

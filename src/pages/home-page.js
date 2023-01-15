import React, { useState } from 'react'
import { WrapItem, Spinner, Center } from '@chakra-ui/react'
import FishCard from '../components/cards/fish-card'
import { SearchForm } from '../components/forms'
import { Navbar, ListView } from '../components/layouts'
import { InfiniteScroll } from '../components/utility'
import { useFishes } from '../api'

const HomePage = () => {
  const fishes = useFishes()
  const [searchValue, setSearchValue] = useState('')

  document.title = 'Fish Coverage'

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSubmit = () => {
    const newSearchResult = fishes.fishes.filter(item => {
      const regex = new RegExp(searchValue, 'i')
      return regex.test(item['Species Name']) === true
    })

    if (fishes.searchResult !== newSearchResult) {
      fishes.fetchSearchResult(newSearchResult)
    }
  }

  const handleReset = () => {
    if (fishes.fishes !== fishes.searchResult) {
      setSearchValue('')
      fishes.fetchSearchResult(fishes)
    }
  }

  const spinner = (
    <Center marginTop='50px'>
        <Spinner thickness='6px'/>
    </Center>
  )

  return (
      <>
        <Navbar/>
        <SearchForm
            value={searchValue}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
            />
        <InfiniteScroll
            enable={fishes.displayData.length > 0}
            hasMore={fishes.hasMoreData}
            next={() => fishes.setPage(fishes.page + 1)}
            loader={spinner}>
              <ListView>
              {
                  fishes.displayData.map((item, index) => {
                    const imgUrl = item['Species Illustration Photo'].src

                    return <WrapItem key={index}>
                    <FishCard title={item['Species Name']}
                        imageSrc={imgUrl} />
                  </WrapItem>
                  })
                }
              </ListView>
        </InfiniteScroll>
      </>
  )
}

export default HomePage

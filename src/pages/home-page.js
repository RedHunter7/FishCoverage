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
  const [data, fetchData] = useState([])
  const [page, setPage] = useState(1)
  const [spinnerDisplay, setSpinnerDisplay] = useState('initial')
  // const [isLoaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    axios.get('https://www.fishwatch.gov/api/species')
      .then((response) => {
        fetchFishes(response.data)
        fetchData(response.data.slice(0, 20))
        setSpinnerDisplay('none')
      // setIsLoaded(true)
      })
  }, [])

  const displayMoreData = () => {
    setTimeout(() => {
      setPage(page + 1)
      const startIndex = page * 10
      const endIndex = startIndex + 20
      fetchData(data.concat(fishes.slice(startIndex, endIndex)))
    }, 1500)
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
            <SearchForm/>
            <InfiniteScroll next={displayMoreData} loader={spinner}>
              <Wrap width={'100%'}
                borderBottomRadius='15px'
                borderBottom='solid'
                borderBottomColor={colors.mountainMeadow}
                borderBottomWidth={['4px', '4px', 0, 0]}
                spacing={[0, 0, '30px', '30px']}
                mt={['30px', '60px']} justify='center'>
                {
                  data.map((item, index) => {
                    const imgUrl = item['Species Illustration Photo'].src

                    return <WrapItem key={index}>
                        <FishCard title={item['Species Name']}
                            imageSrc={imgUrl} />
                      </WrapItem>
                  })
                }
              </Wrap>
            </InfiniteScroll>
            <Spinner display={spinnerDisplay} thickness='6px'
            mt={['30px', '60px']}/>
        </Suspense>
      </>
  )
}

export default HomePage

import React, { Suspense, useState, useEffect } from 'react'
import { Wrap, WrapItem, Spinner } from '@chakra-ui/react'
import SearchForm from '../components/search-form'
import FishCard from '../components/cards/fish-card'
import { colors } from '../theme'
import Navbar from '../components/navbar'
import { FadeAnimation } from '../components/animations'

const HomePage = () => {
  const [fishes, fetchFishes] = useState([])
  const [spinnerDisplay, setSpinnerDisplay] = useState('initial')
  const [isLoaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    fetch('https://www.fishwatch.gov/api/species')
      .then((response) => response.json())
      .then((data) => {
        fetchFishes(data)
        console.log(data)
        setSpinnerDisplay('none')
        setIsLoaded(true)
      })
  }, fishes)

  return (
       <>
        <Navbar/>
        <Suspense fallback={<div>Loading</div>}>
          <SearchForm/>
          <FadeAnimation in={isLoaded} delay={0.2}>
            <Wrap width={'100%'} borderBottomRadius='15px'
            borderBottom='solid' borderBottomColor={colors.mountainMeadow}
            borderBottomWidth={['4px', '4px', 0, 0]}
            spacing={[0, 0, '30px', '30px']}
            mt={['30px', '60px']} justify='center'>
              {
                fishes.map((item, index) => {
                  const imgUrl = item['Species Illustration Photo'].src

                  return <WrapItem key={index}>
                      <FishCard title={item['Species Name']}
                      imageSrc={imgUrl} />
                    </WrapItem>
                })
              }
            </Wrap>
          </FadeAnimation>
          <Spinner display={spinnerDisplay} thickness='6px'
          mt={['30px', '60px']}/>
        </Suspense>
       </>
  )
}

export default HomePage

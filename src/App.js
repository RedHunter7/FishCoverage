import { ChakraProvider, Container } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FishDetailPage from './pages/fish-detail-page'
import HomePage from './pages/home-page'
import ScrollToTop from './scrollToTop'
import { theme } from './theme'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW='container.xl' centerContent
        marginY={['80px', '80px', '120px', '120px']}
        paddingX={0}>
          <BrowserRouter>
            <ScrollToTop>
              <Routes>
                <Route exact path='/' element={<HomePage/>}/>
                <Route path='/:fishName' element={<FishDetailPage/>}/>
              </Routes>
            </ScrollToTop>
          </BrowserRouter>
        </Container>
    </ChakraProvider>
  )
}

export default App

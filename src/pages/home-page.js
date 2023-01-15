import React from 'react'
import { FishesListView, Navbar } from '../components/layouts'

const HomePage = () => {
  document.title = 'Fish Coverage'

  return (
      <>
        <Navbar/>
        <FishesListView/>
      </>
  )
}

export default HomePage

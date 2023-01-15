import React from 'react'
import { useParams } from 'react-router-dom'
import { FishDataGrid, Navbar } from '../components/layouts'

const FishDetailPage = () => {
  const speciesName = useParams().fishName

  let title = speciesName.replaceAll('-', ' ')
  title = title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
  document.title = title

  return (
        <>
           <Navbar title={speciesName} showBackBtn={true}/>
           <FishDataGrid speciesName={speciesName}/>
        </>
  )
}

export default FishDetailPage

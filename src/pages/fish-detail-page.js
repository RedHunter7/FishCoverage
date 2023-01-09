import React, { Suspense, useEffect, useState } from 'react'
import { Grid } from '@chakra-ui/react'
import {
  ListDataGridItem, ParagraphDataGridItem,
  TableDataGridItem, OverviewDataGridItem
} from '../components/grid-items'
import { useParams } from 'react-router-dom'
import { Navbar } from '../components/layouts'
import axios from 'axios'

const htmlToArray = (html) => {
  if (html) {
    html = html.replace('<ul>\n', '')
    html = html.replace('\n</ul>\n', '')
    html = html.replaceAll('<li>', '')
    html = html.replaceAll('<ul>', '')
    html = html.replaceAll('&nbsp;', '')
    html = html.replaceAll('</li>', '')
    html = html.replaceAll('</ul>', '')
    html = html.split('\n')
  }

  return html
}

const htmlToString = (html) => {
  if (html) {
    html = html.replace('<p>', '')
    html = html.replace('</p>\n', '')
    html = html.replaceAll('&nbsp;', '')
  }

  return html
}

const FishDetailPage = () => {
  const fishdefaultProp = {
    'Species Name': '',
    'Scientific Name': '',
    'Species Illustration Photo': null,
    Biology: [],
    Habitat: [],
    Location: [],
    'Physical Description': [],
    Color: '',
    Population: '',
    'Health Benefits': '',
    Taste: '',
    Texture: ''
  }
  const [fish, fetchFish] = useState(fishdefaultProp)

  const nutritionDefaultProp = [
    {
      name: 'Protein',
      value: 0
    },
    {
      name: 'Carbohydrate',
      value: 0
    },
    {
      name: 'Calories',
      value: 0
    },
    {
      name: 'Selenium',
      value: 0
    },
    {
      name: 'Sodium',
      value: 0
    },
    {
      name: 'Fat',
      value: 0
    },
    {
      name: 'Cholesterol',
      value: 0
    },
    {
      name: 'Saturated Fatty Acids',
      value: 0
    }
  ]
  const [nutrition, fetchNutrition] = useState(nutritionDefaultProp)

  const speciesName = useParams().fishName

  const [isLoaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    let title = speciesName.replaceAll('-', ' ')
    title = title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
    document.title = title

    axios.get(`https://www.fishwatch.gov/api/species/${speciesName}`)
      .then(response => {
        const data = response.data

        const newFish = fishdefaultProp
        newFish['Species Name'] = data[0][['Species Name']]
        newFish['Scientific Name'] = data[0]['Scientific Name']
        newFish['Species Illustration Photo'] = data[0]['Species Illustration Photo'].src
        newFish.Biology = htmlToArray(data[0].Biology)
        newFish.Habitat = htmlToArray(data[0].Habitat)
        newFish.Location = htmlToArray(data[0].Location)
        newFish['Physical Description'] = htmlToArray(data[0]['Physical Description'])

        newFish.Color = htmlToString(data[0].Color)
        newFish.Population = htmlToString(data[0].Population)
        newFish.Taste = htmlToString(data[0].Taste)
        newFish.Texture = htmlToString(data[0].Texture)
        newFish['Health Benefits'] = htmlToString(data[0]['Health Benefits'])

        fetchFish(newFish)

        const newNutrition = nutritionDefaultProp
        newNutrition.forEach(item => {
          switch (item.name) {
            case 'Protein':
              item.value = data[0].Protein
              break
            case 'Carbohydrate':
              item.value = data[0].Carbohydrate
              break
            case 'Calories':
              item.value = data[0].Calories
              break
            case 'Selenium':
              item.value = data[0].Selenium
              break
            case 'Sodium':
              item.value = data[0].Sodium
              break
            case 'Fat':
              item.value = data[0]['Fat, Total']
              break
            case 'Cholesterol':
              item.value = data[0].Cholesterol
              break
            default:
              item.value = data[0]['Saturated Fatty Acids, Total']
              break
          }
        })
        fetchNutrition(newNutrition)

        setIsLoaded(true)
      })
  }, [])

  return (
        <>
           <Navbar title={speciesName} showBackBtn={true}/>
           <Suspense fallback={<div>Loading</div>}>
            <Grid width={['90%', '90%', '90%', '100%']} gap={4}
                templateRows={[
                  'repeat(5, auto)',
                  'repeat(5, auto)',
                  '1fr repeat(5, auto)',
                  'repeat(5, auto)'
                ]}
                templateColumns='repeat(12, 1fr)'>
                <OverviewDataGridItem fishName={fish['Species Name']}
                fishLatinName={fish['Scientific Name']}
                fishImage={fish['Species Illustration Photo']}
                isLoaded={isLoaded}
                width={[12, 12, 5, 4]} order={1}/>

                <ListDataGridItem title='Biology'
                listText={fish.Biology || undefined}
                width={[12, 12, 7, 8]} order={2}
                isLoaded={isLoaded}
                listBoxHeight={[
                  'fit-content', 'fit-content',
                  '270px', '310px'
                ]}/>

                <ListDataGridItem title='Habitat'
                listText={fish.Habitat || undefined}
                isLoaded={isLoaded}
                width={[12, 12, 12, 7]} order={3}/>
                <ListDataGridItem title='Location'
                listText={fish.Location || undefined}
                isLoaded={isLoaded}
                width={[12, 12, 12, 5]} order={4}/>

                <TableDataGridItem title='Nutrition'
                data={nutrition} isLoaded={isLoaded}
                width={[12, 12, 6, 4]} order={[6, 6, 5, 5]}/>
                <ListDataGridItem title='Physical'
                listText={fish['Physical Description'] || undefined}
                isLoaded={isLoaded}
                width={[12, 12, 6, 8]} order={[5, 5, 6, 6]}
                listBoxHeight={[
                  'fit-content', 'fit-content',
                  '345px', '310px'
                ]}/>

                <ParagraphDataGridItem title='Color'
                text={fish.Color} isLoaded={isLoaded}
                width={[12, 12, 12, 6]} order={7}/>
                <ParagraphDataGridItem title='Population'
                text={fish.Population} isLoaded={isLoaded}
                width={[12, 12, 12, 6]} order={8}/>

                <ParagraphDataGridItem title='Health Benefit'
                text={fish['Health Benefits']} isLoaded={isLoaded}
                width={[12, 12, 12, 4]} order={9} />
                <ParagraphDataGridItem title='Taste'
                text={fish.Taste} isLoaded={isLoaded}
                width={[12, 12, 12, 4]} order={10} />
                <ParagraphDataGridItem title='Texture'
                text={fish.Texture} isLoaded={isLoaded}
                width={[12, 12, 12, 4]} order={11} />
              </Grid>
           </Suspense>
        </>
  )
}

export default FishDetailPage

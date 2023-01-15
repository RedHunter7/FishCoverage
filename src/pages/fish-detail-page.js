import React from 'react'
import { Grid } from '@chakra-ui/react'
import {
  ListDataGridItem, ParagraphDataGridItem,
  TableDataGridItem, OverviewDataGridItem
} from '../components/grid-items'
import { useParams } from 'react-router-dom'
import { Navbar } from '../components/layouts'
import { useFish } from '../api'

const FishDetailPage = () => {
  const speciesName = useParams().fishName
  const fish = useFish(speciesName)

  let title = speciesName.replaceAll('-', ' ')
  title = title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
  document.title = title

  return (
        <>
           <Navbar title={speciesName} showBackBtn={true}/>
           <Grid width={['90%', '90%', '90%', '100%']} gap={4}
              templateRows={[
                'repeat(5, auto)',
                'repeat(5, auto)',
                '1fr repeat(5, auto)',
                'repeat(5, auto)'
              ]}
              templateColumns='repeat(12, 1fr)'>
            <OverviewDataGridItem fishName={fish.fish['Species Name']}
              fishLatinName={fish.fish['Scientific Name']}
              fishImage={fish.fish['Species Illustration Photo']}
              isLoaded={fish.isLoaded}
              width={[12, 12, 5, 4]} order={1}/>

            <ListDataGridItem title='Biology'
              listText={fish.Biology || undefined}
              width={[12, 12, 7, 8]} order={2}
              isLoaded={fish.isLoaded}
              listBoxHeight={[
                'fit-content', 'fit-content',
                '270px', '310px'
              ]}/>

            <ListDataGridItem title='Habitat'
              listText={fish.fish.Habitat || undefined}
              isLoaded={fish.isLoaded}
              width={[12, 12, 12, 7]} order={3}/>
            <ListDataGridItem title='Location'
              listText={fish.fish.Location || undefined}
              isLoaded={fish.isLoaded}
              width={[12, 12, 12, 5]} order={4}/>

            <TableDataGridItem title='Nutrition'
              data={fish.nutrition} isLoaded={fish.isLoaded}
              width={[12, 12, 6, 4]} order={[6, 6, 5, 5]}/>
            <ListDataGridItem title='Physical'
              listText={fish.fish['Physical Description'] || undefined}
              isLoaded={fish.isLoaded}
              width={[12, 12, 6, 8]} order={[5, 5, 6, 6]}
              listBoxHeight={[
                'fit-content', 'fit-content',
                '345px', '310px'
              ]}/>

            <ParagraphDataGridItem title='Color'
              text={fish.fish.Color} isLoaded={fish.isLoaded}
              width={[12, 12, 12, 6]} order={7}/>
            <ParagraphDataGridItem title='Population'
              text={fish.fish.Population} isLoaded={fish.isLoaded}
              width={[12, 12, 12, 6]} order={8}/>

            <ParagraphDataGridItem title='Health Benefit'
              text={fish.fish['Health Benefits']} isLoaded={fish.isLoaded}
              width={[12, 12, 12, 4]} order={9} />
            <ParagraphDataGridItem title='Taste'
              text={fish.fish.Taste} isLoaded={fish.isLoaded}
              width={[12, 12, 12, 4]} order={10} />
            <ParagraphDataGridItem title='Texture'
              text={fish.fish.Texture} isLoaded={fish.isLoaded}
              width={[12, 12, 12, 4]} order={11} />
          </Grid>
        </>
  )
}

export default FishDetailPage

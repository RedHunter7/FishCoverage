import { useEffect, useState } from 'react'
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

const useFish = (speciesName) => {
  const [fish, fetchFish] = useState(fishdefaultProp)
  const [nutrition, fetchNutrition] = useState(nutritionDefaultProp)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
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

  return { fish, nutrition, isLoaded }
}

export { useFish }

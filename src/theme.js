import { extendTheme } from '@chakra-ui/react'
import '@fontsource/lobster'
import '@fontsource/amaranth'
import '@fontsource/montserrat'

const colors = {
  metallicSeaweed: '#028090',
  blueSapphire: '#05668D',
  palseSpringBud: '#F0F3BD',
  mountainMeadow: '#02C39A',
  persianGreen: '#00A896',
  venetianRed: '#c1121f',
  indigoDye: '#044A66'
}

const fontFamily = {
  lobster: 'Lobster, cursive',
  amaranth: 'Amaranth, sans-serif',
  montserrat: 'Montserrat, sans-serif'
}

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: colors.metallicSeaweed,
        // width: '100vw',
        lineHeight: 'tall',
        scrollbarWidth: 'auto',
        scrollbarColor: `${colors.palseSpringBud} ${colors.blueSapphire}`
      },

      // scrollbar style for Chrome, Edge & Safari
      'body::-webkit-scrollbar': {
        width: '6px'
      },
      'body::-webkit-scrollbar-track': {
        width: '10px'
      },
      'div::-webkit-scrollbar': {
        width: '4.5px'
      },
      'div::-webkit-scrollbar-track': {
        width: '8px'
      },
      '*::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        bg: colors.palseSpringBud
      },

      a: {
        fontFamily: fontFamily.amaranth
      },

      'p, button, li, table': {
        fontFamily: fontFamily.montserrat,
        color: colors.palseSpringBud
      },

      img: {
        borderRadius: '20px',
        border: '6px solid',
        borderColor: colors.mountainMeadow
      },

      button: {
        transitionProperty: 'background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,height,width'
      },

      '.fish-grid-item': {
        'li, p': {
          fontSize: ['14px', '14px', '16px', '20px'],
          paddingLeft: ['5px', '5px', '15px', '15px'],
          listStylePosition: 'outside'
        },

        '.nutrition-list-item': {
          li: {
            paddingLeft: ['5px', '5px', '10px', '10px']
          },
          p: {
            fontSize: ['16px', '16px', '18px', '18px']
          }
        }
      }
    }
  },

  components: {
    Heading: {
      baseStyle: {
        fontFamily: fontFamily.amaranth,
        color: colors.palseSpringBud
      }
    },
    Text: {
      baseStyle: {
        fontFamily: fontFamily.montserrat,
        color: colors.palseSpringBud
      }
    },
    Spinner: {
      baseStyle: {
        color: colors.palseSpringBud
      },
      defaultProps: {
        size: 'xl'
      }
    }
  },

  layerStyles: {
    sectionCard: {
      bg: colors.blueSapphire,
      border: '5px solid',
      borderColor: colors.mountainMeadow,
      borderRadius: '20px'
    },
    nutritionTableData: {
      paddingX: 0
    }
  }
})

export { theme, colors, fontFamily }

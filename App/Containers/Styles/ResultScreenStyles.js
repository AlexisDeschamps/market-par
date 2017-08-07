import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  yearText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    marginBottom: 5
  },
  resultText: {
    color: 'white',
    margin: 3
  }
})

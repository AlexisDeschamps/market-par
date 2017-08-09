import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cellContainer: {
    height: 66,
    backgroundColor: 'white',
    marginTop: 1,
    marginBottom: 1,
  }
})

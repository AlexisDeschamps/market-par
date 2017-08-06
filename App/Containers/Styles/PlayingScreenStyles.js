import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  subContainer: {
    flex: 1,
    padding: Metrics.baseMargin,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 5
  },
  yearText: {
    fontSize: 25,
    color: 'black',
    marginBottom: 30
  },
  finishButtonContainer: {
    marginLeft: 15,
    marginRight: 15
  }
})

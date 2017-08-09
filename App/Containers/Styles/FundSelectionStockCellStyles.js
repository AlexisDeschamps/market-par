import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cellContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 72,
    backgroundColor: 'white',
    marginTop: 1,
    marginBottom: 1,
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column'
  }
})

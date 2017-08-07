import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  helpText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  },
  searchInput: {
    color: 'white',
    width: 200,
    textAlign: 'center',
    backgroundColor: '#FF9800',
    borderRadius: 25
  }
})

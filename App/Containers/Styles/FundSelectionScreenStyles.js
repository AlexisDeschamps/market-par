import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  helpText: {
    color: 'white',
    alignSelf: 'center'
  },
  topBlock: {
    flexDirection: 'row'
  },
  searchBarInput: {
    color: 'white',
    width: 200,
    textAlign: 'center',
    backgroundColor: '#FF9800',
    borderRadius: 25
  },
  searchIcon: {
    fontSize: 35,
    marginLeft: 15
  }
})

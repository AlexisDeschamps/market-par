import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  searchInput: {
    color: 'white',
    width: 200,
    textAlign: 'center',
    backgroundColor: '#FF9800',
    borderRadius: 25
  }
})

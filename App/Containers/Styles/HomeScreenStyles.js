import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors} from '../../Themes/'

export default {
  ...ApplicationStyles.screen,
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  yearText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    marginBottom: 5
  }
}

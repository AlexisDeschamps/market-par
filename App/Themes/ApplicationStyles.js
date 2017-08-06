import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    container: {
      flex: 3,
      backgroundColor: Colors.darkPrimary
    },
    centeredContainer: {
      flex: 1,
      alignItems: 'center'
    },
    rowContainer: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 5
    },
    button: {
      width: 150,
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: 5
    },
    errorText: {
      fontSize: 18,
      color: 'red',
      margin: 5,
      textAlign: 'center'
    },
    triContainer: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    leftContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    rightContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    title: {
      fontSize: 25,
      color: 'white',
      textAlign: 'center',
      marginBottom: 5
    },
    subtitle: {
      fontSize: 20,
      color: 'white',
      marginTop: 10,
      marginBottom: 7,
      marginLeft: 15
    },
    textLevel1: {
      fontSize: 16,
      color: 'white',
      marginBottom: 0,
      marginLeft: 15
    },
    textLevel2: {
      fontSize: 16,
      color: 'white',
      marginLeft: 30
    }
  }
}

export default ApplicationStyles

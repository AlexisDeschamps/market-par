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
      flex: 1,
      backgroundColor: Colors.darkPrimary
    },
    subContainer: {
      flex: 1,
      padding: Metrics.baseMargin,
      backgroundColor: 'white',
      margin: 20,
      borderRadius: 5
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
    spaceBetweenContainer: {
      justifyContent: 'space-between'
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
    centered: {
      alignSelf: 'center'
    },
    centeredText: {
      textAlign: 'center'
    },
    title: {
      fontSize: 24
    },
    titleSpacing: {
      textAlign: 'center',
      marginBottom: 5
    },
    subtitle: {
      fontSize: 20
    },
    subtileSpacing: {
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 15
    },
    textLevel1: {
      fontSize: 16
    },
    textLevel1Spacing: {
      marginLeft: 15
    },
    textLevel2: {
      fontSize: 16
    },
    textLevel2Spacing: {
      marginLeft: 30
    },
    lightText: {
      color: 'white'
    },
    darkText: {
      color: 'black'
    },
    errorText: {
      color: 'red'
    },
    button: {
      width: 150,
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: 5
    }
  }
}

export default ApplicationStyles

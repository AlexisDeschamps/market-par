import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent,
    },
    container: {
      flex: 1,
      backgroundColor: Colors.darkPrimary,
      paddingTop: 20
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
      width: 200,
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: 5
    },
    searchInput: {
      fontSize: 16,
      color: 'white',
      width: 200,
      textAlign: 'center',
      backgroundColor: '#FF9800',
      borderRadius: 25,
      height: 40,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      lineHeight: 1
    }
  }
}

export default ApplicationStyles

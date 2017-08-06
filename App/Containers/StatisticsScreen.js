import React from 'react'
import { ScrollView, Text, View, ListView } from 'react-native'
import { Tab as NBTab, Tabs as NBTabs } from 'native-base'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions from '../Redux/LoginRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import StorageHelper from '../Utils/StorageHelper'

import styles from './Styles/StatisticsScreenStyles'

class StatisticsScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {gamesPlayed: '...', gamesWon: '...', gamesLost: '...', winPercentage: '...'}
  }

  componentWillMount () {
    StorageHelper.getPlayerStatistics()
    .then(playerStatistics => {
      const gamesPlayedNumber = parseInt(playerStatistics.gamesPlayed)
      const gamesWonNumber = parseInt(playerStatistics.gamesWon)
      this.setState({
        gamesPlayed: playerStatistics.gamesPlayed,
        gamesWon: playerStatistics.gamesWon,
        gamesLost: gamesPlayedNumber - gamesWonNumber,
        winPercentage: (gamesWonNumber / gamesPlayedNumber * 100).toFixed(2)
      })
    })
    .catch(err => console.error(err))
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.triContainer}>
          <View style={styles.leftContainer}>
            <Icon style={{marginLeft: 15}} name='arrow-back' size={35} color='white' onPress={() => NavigationActions.pop()} />
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Help & Stats</Text>
          </View>
          <View style={styles.rightContainer} />
        </View>
        <NBTabs initialPage={0}>
          <NBTab heading='Help'>
            <ScrollView style={styles.container}>
              <Text style={styles.subtitle}>
                How to play
              </Text>
              <Text style={styles.textLevel1}>
                1. Let the game pick a random year or choose one yourself{'\n'}
                2. Choose two different funds by either{'\n'}
              </Text>
              <Text style={styles.textLevel2}>
                a. Pressing on “Select fund” and typing a ticker symbol or company name{'\n'}
                b. Pressing “Suggest” to be given a choice of three funds{'\n'}
              </Text>
              <Text style={styles.textLevel1}>
                3. Press finish{'\n'}
                4. View the results{'\n'}
              </Text>
              <Text style={styles.subtitle}>
                How it works
              </Text>
              <Text style={styles.textLevel1}>
                The return of each fund is calculated by diving its value at the end of the year by its value at the beginning of the year.
                These two returns are averaged to give the user return for the round.{'\n'}
                The market return is calculated the same way. The outcome of the round is determined by comparing the user return and the market return.
              </Text>
            </ScrollView>
          </NBTab>
          <NBTab heading='Info'>
            <ScrollView style={styles.container}>
              <Text style={styles.subtitle}>
                Where is the data coming from?
              </Text>
              <Text style={styles.textLevel1}>
                Symbol autocompletion is provided by Yahoo Finance. {'\n'}
                The historical stock prices are provided by the WIKI database hosted by Quandl.
              </Text>
              <Text style={styles.subtitle}>
                What years are available?
              </Text>
              <Text style={styles.textLevel1}>
                From 1980 to 2015 because of the availability of the data.
              </Text>
              <Text style={styles.subtitle}>
                How is the market tracked?
              </Text>
              <Text style={styles.textLevel1}>
                The market is tracked according to Wilshire 5000 (Full Cap) Total Market.
              </Text>
            </ScrollView>
          </NBTab>
          <NBTab heading='Statistics'>
            <ScrollView style={styles.container}>
              <Text style={styles.subtitle}>
                Games: played: {this.state.gamesPlayed}
              </Text>
              <Text style={styles.subtitle}>
                Games: won: {this.state.gamesWon}
              </Text>
              <Text style={styles.subtitle}>
                Games: lost: {this.state.gamesLost}
              </Text>
              <Text style={styles.subtitle}>
                Win percentage: {this.state.winPercentage}%
              </Text>
            </ScrollView>
          </NBTab>
        </NBTabs>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen)

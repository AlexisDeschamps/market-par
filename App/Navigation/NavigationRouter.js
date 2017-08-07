import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'

import FundSelectionScreen from '../Containers/FundSelectionScreen'
import PlayingScreen from '../Containers/PlayingScreen'
import ResultScreen from '../Containers/ResultScreen'
import HomeScreen from '../Containers/HomeScreen'
import FundSuggestionScreen from '../Containers/FundSuggestionScreen'
import StatisticsScreen from '../Containers/StatisticsScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router hideNavBar={true}>
          <Scene initial key='homeScreen' component={HomeScreen} title='Home Screen' />
          <Scene key='playingScreen' component={PlayingScreen} title='PlayingScreen' />
          <Scene key='fundSelectionScreen' component={FundSelectionScreen} title='Fund Selection Screen' />
          <Scene key='fundSuggestionScreen' component={FundSuggestionScreen} title='Fund Suggestion Screen' />
          <Scene key='resultScreen' component={ResultScreen} title='Result Screen' />
          <Scene key='statisticsScreen' component={StatisticsScreen} title='Statistics Screen' />
      </Router>
    )
  }
}

export default NavigationRouter

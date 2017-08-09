import React from 'react'
import { View, Text, ListView, ActivityIndicator } from 'react-native'
import MIIcon from 'react-native-vector-icons/MaterialIcons'
import StockCell from '../Components/StockCell'

import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import PlayingActions from '../Redux/PlayingRedux'
import FinanceHelper from '../Utils/FinanceHelper'

import styles from './Styles/FundSelectionScreenStyles'

class FundSuggestionScreen extends React.Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([]),
      text: props['fund' + props.fundNumber],
      fetching: true
    }
    this.onFundSelection = this.onFundSelection.bind(this)
  }

  componentWillMount () {
    const that = this
    Finance.getSuggestionFunds(this.props.year)
      .then(suggestedFunds => {
        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(suggestedFunds),
          fetching: false
        })
      })
      .catch(err => console.log(error))
  }

  onFundSelection (symbol) {
    if (this.props.fundNumber === 1) {
      this.props.changeFund1Dispatch(symbol)
    } else {
      this.props.changeFund2Dispatch(symbol)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.triContainer}>
          <View style={styles.leftContainer}>
            <MIIcon style={{marginLeft: 15}} name='arrow-back' size={35} color='white' onPress={() => NavigationActions.pop()} />
          </View>
          <View style={styles.innerContainer}>
            <Text style={[styles.subtitle, styles.lightText]}>
              Select one symbol
            </Text>
          </View>
          <View style={styles.rightContainer} />
        </View>
        {this.state.fetching ? <ActivityIndicator color='blue' size='large' /> : null}
        <View style={styles.suggestion}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={stock => <StockCell stock={stock} watchlistCache={this.state.watchlistCache} onFundSelection={this.onFundSelection} />} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    year: state.playing.year
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFund1Dispatch: (fund) => dispatch(PlayingActions.changeFund(fund)),
    changeFund2Dispatch: (fund) => dispatch(PlayingActions.changeFund2(fund))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundSuggestionScreen)

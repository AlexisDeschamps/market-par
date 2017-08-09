import React from 'react'
import { View, Text, TextInput, ListView, ActivityIndicator } from 'react-native'
import MIIcon from 'react-native-vector-icons/MaterialIcons'
import StockCell from '../Components/StockCell'

import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import PlayingActions from '../Redux/PlayingRedux'
import FinanceHelper from '../Utils/FinanceHelper'

import styles from './Styles/FundSelectionScreenStyles'

class FundSelectionScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      loaded: true,
      text: props['fund' + props.fundNumber],
      helpText: 'Type a company name or stock symbol.'
    }
    this.onFundSelection = this.onFundSelection.bind(this)
  }

  onTyping (text) {
    this.setState({
      text: text.text || '',
      helpText: 'Validating symbol...',
      loaded: false
    })

    const that = this
    FinanceHelper.stockAutocomplete(text.text, this.props.year)
    .then((result) => {
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(result),
        loaded: true,
        helpText: 'Type a company name or stock symbol.'
      })
    })
     .catch((error) => {
       console.log('Request failed', error)
     })
  }

  onFundSelection (symbol) {
    if (this.props.fundNumber === 1) { this.props.changeFund1Dispatch(symbol) } else { this.props.changeFund2Dispatch(symbol) }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={[styles.textLevel1, styles.centered, styles.lightText]}>
          {this.state.helpText}
        </Text>
        <View style={styles.triContainer}>
          <View style={styles.leftContainer}>
            <MIIcon style={{marginLeft: 15}} name='arrow-back' size={35} color='white' onPress={() => NavigationActions.pop()} />
          </View>
          <View style={styles.innerContainer}>
            <TextInput
              style={styles.searchInput}
              autoCapitalize={'characters'}
              autoFocus
              placeholder='Search ticker symbols'
              placeholderTextColor='lightgrey'
              onChangeText={text => this.onTyping({ text })}
              value={this.state.text} />
          </View>
          <View style={styles.rightContainer}>
            <MIIcon name='search' size={35} color='white' style={{marginRight: 15}} />
          </View>
        </View>
        <View>
          {this.state.loaded
            ? <ListView
              dataSource={this.state.dataSource}
              renderRow={stock => <StockCell stock={stock} watchlistCache={this.state.watchlistCache} onFundSelection={this.onFundSelection} />} />
            : <ActivityIndicator color='blue' size='large' />}
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

export default connect(mapStateToProps, mapDispatchToProps)(FundSelectionScreen)

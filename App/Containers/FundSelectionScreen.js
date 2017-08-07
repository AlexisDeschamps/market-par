import React from 'react'
import { ScrollView, Text, View, StyleSheet, TextInput, ListView, ActivityIndicator } from 'react-native'
import { Text as NBText } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Finance from '../Utils/Finance'
import Icon from 'react-native-vector-icons/MaterialIcons'
import StockCell from './FundSelectionComponents/StockCell'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'

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
    Finance.symbolSuggest(text.text, this.props.year)
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
        <Text style={styles.helpText}>
          {this.state.helpText}
        </Text>
        <View style={styles.triContainer}>
          <View style={styles.leftContainer}>
            <Icon style={styles.searchIcon} name='search' size={20} color='white' />
          </View>
          <View style={styles.innerContainer}>
            <TextInput
              style={styles.searchBarInput}
              autoCapitalize={'characters'}
              autoFocus
              placeholder='Search ticker symbols'
              placeholderTextColor='lightgrey'
              onChangeText={text => this.onTyping({ text })}
              value={this.state.text} />
          </View>
          <View style={styles.rightContainer}>
            <Icon style={{marginRight: 15}} name='cancel' size={35} color='white' onPress={() => { NavigationActions.pop() }} />
          </View>
        </View>
        <View style={styles.suggestion}>
          {this.state.loaded ?
            <ListView
              dataSource={this.state.dataSource}
              renderRow={stock => <StockCell stock={stock} watchlistCache={this.state.watchlistCache} onFundSelection={this.onFundSelection} />} />
              :
              <ActivityIndicator color='blue' size={35}/>}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    year: state.login.year
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFund1Dispatch: (fund) => dispatch(LoginActions.changeFund(fund)),
    changeFund2Dispatch: (fund) => dispatch(LoginActions.changeFund2(fund))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundSelectionScreen)

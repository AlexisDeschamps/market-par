import React from 'react'
import { ScrollView, Text, Image, View, Modal, TouchableHighlight, ListView, StyleSheet } from 'react-native'
import { Button as NBButton, Text as NBText } from 'native-base'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions from '../Redux/LoginRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from './Styles/ResultScreenStyles'

class ResultScreen extends React.Component {

  constructor () {
    super()
    const years = []
    for (let i = 1980; i < 2016; i++) {
      years.push(i)
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      modalVisible: false,
      dataSource: ds.cloneWithRows(years)
    }
  }

  handlePressRandomYear = () => {
    this.props.randomizeYear()
    NavigationActions.pop()
    NavigationActions.playingScreen()
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  onYearSelect = (year) => {
    this.props.selectYear(year)
    this.setModalVisible(!this.state.modalVisible)
    NavigationActions.pop()
    NavigationActions.playingScreen()
  }

  getMessage (symbol, change) {
    let message = ''
    if (change < 1) {
      message = symbol + ' went down by ' + ((1 - change) * 100).toFixed(2) + '%'
    } else if (change > 1) {
      message = symbol + ' went up by ' + ((change - 1) * 100).toFixed(2) + '%'
    } else {
      message = +' did not change'
    }
    return message
  }

  getResults () {
    const { outcome, year, fund1, fund2, fund1Change, fund2Change, userChange, marketChange } = this.props
    const fund1Message = this.getMessage(fund1, fund1Change)
    const fund2Message = this.getMessage(fund2, fund2Change)
    const userMessage = this.getMessage('Overall, you', userChange)
    const marketMessage = this.getMessage('The market', marketChange)
    const advantage = userChange - marketChange
    const advantageString = Math.abs(((userChange - marketChange) * 100)).toFixed(2)
    let outcomeMessage = ''
    let outcomeColor = 'white'
    if (outcome === 'win') {
      outcomeMessage = 'Win!'
      outcomeColor = '#00ff00'
    } else if (outcome === 'loss') {
      outcomeMessage = 'Loss'
      outcomeColor = 'red'
    } else if (outcome === 'tie') {
      outcomeMessage = 'Tie'
    } else {
      console.log('Invalid outcome')
    }
    let advantageMessage = ''
    if (outcome === 'win') {
      advantageMessage = 'You came ' + advantageString + ' percentage points higher!'
    } else if (outcome === 'loss') {
      advantageMessage = 'You came ' + advantageString + ' percentage points under'
    }
    return {fund1Message, fund2Message, userMessage, marketMessage, outcomeMessage, advantage, outcomeColor}
  }

  render () {
    const results = this.getResults()
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centeredContainer} >
            <Text style={[styles.title, {marginTop: 70, color: results.outcomeColor}]}>
              Outcome — {results.outcomeMessage}
            </Text>
            <Text style={styles.resultText}>
              {results.fund1Message}
            </Text>
            <Text style={styles.resultText}>
              {results.fund2Message}
            </Text>
            <Text style={styles.resultText}>
              {results.userMessage}
            </Text>
            <Text style={styles.resultText}>
              {results.marketMessage}
            </Text>
            <Text style={[styles.resultText, {color: results.outcomeColor, marginBottom: 80}]}>
              {results.advantageMessage}
            </Text>
            <NBButton primary rounded style={StyleSheet.flatten(styles.button)} onPress={this.handlePressRandomYear}>
              <NBText>Random Year</NBText>
            </NBButton>
            <NBButton transparent style={StyleSheet.flatten(styles.button)} onPress={() => { this.setModalVisible(true) }}>
              <NBText>Choose Year</NBText>
            </NBButton>
            <NBButton transparent style={StyleSheet.flatten(styles.button)} onPress={() => { NavigationActions.homeScreen() }}>
              <NBText>Home</NBText>
            </NBButton>
          </View>
        </ScrollView>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}
          >
          <View style={styles.container}>
            <View style={styles.triContainer}>
              <View style={styles.leftContainer} />
              <Text style={styles.title}>Choose Year</Text>
              <View style={styles.rightContainer}>
                <Icon style={{marginRight: 15}} name='cancel' size={35} color='white' onPress={() => { this.setModalVisible(!this.state.modalVisible) }} />
              </View>
            </View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <View><Text style={styles.yearText} onPress={() => this.onYearSelect(rowData)}>{rowData}</Text></View>}
            />
          </View>
        </Modal>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fund1: state.login.fund1,
    fund2: state.login.fund2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    randomizeYear: () => dispatch(LoginActions.randomizeYear()),
    selectYear: (year) => dispatch(LoginActions.selectYear(year))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)

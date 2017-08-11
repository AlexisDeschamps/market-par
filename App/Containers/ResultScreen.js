import React from 'react'
import { View, ScrollView, Text, Modal, ListView, StyleSheet } from 'react-native'
import { Button as NBButton, Text as NBText } from 'native-base'
import MIIcon from 'react-native-vector-icons/MaterialIcons'

import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import PlayingActions from '../Redux/PlayingRedux'

import styles from './Styles/ResultScreenStyles'

class ResultScreen extends React.Component {

  constructor (props) {
    super(props)
    const years = []
    for (let i = 1980; i < 2016; i++) {
      years.push(i)
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    const results = this.getResults(props)
    this.state = {
      results,
      modalVisible: false,
      dataSource: ds.cloneWithRows(years),
    }
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  handlePressRandomYear = () => {
    this.props.randomizeYear()
    NavigationActions.playingScreen()
  }

  onYearSelect = (year) => {
    this.props.selectYear(year)
    this.setModalVisible(!this.state.modalVisible)
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

  getResults (props) {
    const { outcome, fund1, fund2, fund1Change, fund2Change, userChange, marketChange } = props
    const fund1Message = this.getMessage(fund1, fund1Change)
    const fund2Message = this.getMessage(fund2, fund2Change)
    const userMessage = this.getMessage('Overall, you', userChange)
    const marketMessage = this.getMessage('The market', marketChange)
    const advantage = userChange - marketChange
    const advantageString = Math.abs(((advantage) * 100)).toFixed(2)
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
    return {fund1Message, fund2Message, userMessage, marketMessage, outcomeMessage, advantageMessage, outcomeColor}
  }

  render () {
    const results = this.state.results
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centeredContainer} >
            <Text style={[styles.title, {marginTop: 70, color: results.outcomeColor}]}>
              Outcome — {results.outcomeMessage}
            </Text>
            <Text style={[styles.textLevel1, styles.lightText, {marginTop: 15}]}>
              {results.fund1Message}
            </Text>
            <Text style={[styles.textLevel1, styles.lightText, {marginTop: 3}]}>
              {results.fund2Message}
            </Text>
            <Text style={[styles.textLevel1, styles.lightText, {marginTop: 3}]}>
              {results.userMessage}
            </Text>
            <Text style={[styles.textLevel1, styles.lightText, {marginTop: 3}]}>
              {results.marketMessage}
            </Text>
            <Text style={[styles.textLevel1, styles.lightText, {marginTop: 3, marginBottom: 80, color: results.outcomeColor}]}>
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
              <Text style={[styles.title, styles.titleSpacing, styles.lightText]}>Choose Year</Text>
              <View style={styles.rightContainer}>
                <MIIcon style={{marginRight: 15}} name='cancel' size={35} color='white' onPress={() => { this.setModalVisible(!this.state.modalVisible) }} />
              </View>
            </View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <View><Text style={[styles.subtitle, styles.centered, styles.lightText, {marginBottom: 5}]} onPress={() => this.onYearSelect(rowData)}>{rowData}</Text></View>}
            />
          </View>
        </Modal>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fund1: state.playing.fund1,
    fund2: state.playing.fund2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    randomizeYear: () => dispatch(PlayingActions.randomizeYear()),
    selectYear: (year) => dispatch(PlayingActions.selectYear(year))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)

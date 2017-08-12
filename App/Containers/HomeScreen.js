import React from 'react'
import { View, ScrollView, Image, Modal, Text, ListView, StyleSheet } from 'react-native'
import { Button as NBButton, Text as NBText } from 'native-base'
import { Images } from '../Themes'
import MIIcon from 'react-native-vector-icons/MaterialIcons'

import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import PlayingActions from '../Redux/PlayingRedux'

import styles from './Styles/HomeScreenStyles'

class HomeScreen extends React.Component {

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
    NavigationActions.playingScreen()
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  onYearSelect = (year) => {
    this.props.selectYear(year)
    this.setModalVisible(!this.state.modalVisible)
    NavigationActions.playingScreen()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centeredContainer}>
            <Image source={Images.marketParLogoWhite} style={[styles.logo, {marginBottom: 30}]} />
            <NBButton primary rounded style={StyleSheet.flatten(styles.button)} onPress={this.handlePressRandomYear}>
              <NBText>Random Year</NBText>
            </NBButton>
            <NBButton transparent style={StyleSheet.flatten(styles.button)} onPress={() => { this.setModalVisible(true) }}>
              <NBText>Choose Year</NBText>
            </NBButton>
            <NBButton transparent style={StyleSheet.flatten(styles.button)} onPress={() => { NavigationActions.statisticsScreen() }}>
              <NBText>Help & Stats</NBText>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    randomizeYear: () => dispatch(PlayingActions.randomizeYear()),
    selectYear: (year) => dispatch(PlayingActions.selectYear(year))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

import React, { PropTypes } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import {Images, Metrics} from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Button as NBButton, Text as NBText, Form, Item, Input, Label } from 'native-base'
import Finance from '../Utils/Finance'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from './Styles/PlayingScreenStyles'

class PlayingScreen extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    changeFund1Dispatch: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      formDirty: false
    }
    this.handleChangeFund1 = this.handleChangeFund1.bind(this)
  }

  handlePressFinish = () => {
    if (!this.props.fund1 || !this.props.fund2 || this.props.fund1 === this.props.fund2) {
      this.setState({formDirty: true})
      return
    }
    this.props.finishRequestStartDispatch()
    return Finance.getResults(this.props.year, this.props.fund1, this.props.fund2)
    .then((results) => {
      this.props.finishRequestEndDispatch()
      NavigationActions.resultScreen(results)
    })
    .catch(err => console.error(err))
  }

  handleFundPress = (fundNumber) => {
    NavigationActions.fundSelectionScreen({fundNumber})
  }

  handleFundSuggestionPress = (fundNumber) => {
    NavigationActions.fundSuggestionScreen({fundNumber, year: this.props.year})
  }

  handleChangeFund1 = (text) => {
    this.props.changeFund1Dispatch(text)
  }

  handleChangeFund2 = (text) => {
    this.setState({ fund2: text })
  }

  getErrorText = () => {
    if (!this.state.formDirty) {
      return ''
    }
    if (!this.props.fund1 || !this.props.fund2) {
      return 'Please select two different funds.'
    }
    if (this.props.fund1 === this.props.fund2) {
      return 'The two funds cannot be the same. Please select different funds.'
    }
    return ''
  }

  render () {
    const { year, fetching, fund1, fund2 } = this.props
    const errorText = this.getErrorText()
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.triContainer}>
            <View style={styles.leftContainer}>
              <Icon style={{marginLeft: 15}} name='arrow-back' size={35} color='white' onPress={() => { NavigationActions.homeScreen()}} />
            </View>
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Year — {year}</Text>
            </View>
            <View style={styles.rightContainer} />
          </View>
          <View style={styles.subContainer}>
            <Form>
              <Item stackedLabel style={{marginBottom: 30}}>
                <Label>Fund #1</Label>
                <View style={styles.rowContainer}>
                  <Input
                    ref={(ref) => this.fund1 = ref}
                    value={fund1}
                    editable
                    keyboardType='default'
                    returnKeyType='go'
                    onChangeText={this.handleChangeFund1}
                    underlineColorAndroid='transparent'
                    onFocus={() => { this.handleFundPress(1) }}
                    placeholder='Select fund' />
                  <NBButton transparent style={{marginRight: 10}} onPress={() => { this.handleFundSuggestionPress(1) }}>
                    <NBText>
                        Suggest
                      </NBText>
                  </NBButton>
                </View>
              </Item>
              <Item stackedLabel style={{marginBottom: 30}}>
                <Label>Fund #2</Label>
                <View style={styles.rowContainer}>
                  <Input
                    ref={(ref) => this.fund2 = ref}
                    value={fund2}
                    editable
                    keyboardType='default'
                    returnKeyType='go'
                    onChangeText={this.handleChangeFund2}
                    underlineColorAndroid='transparent'
                    onFocus={() => { this.handleFundPress(2) }}
                    placeholder='Select fund' />
                  <NBButton transparent style={{marginRight: 10}} onPress={() => { this.handleFundSuggestionPress(2) }}>
                    <NBText>
                        Suggest
                      </NBText>
                  </NBButton>
                </View>
              </Item>
            </Form>
            <View style={styles.finishButtonContainer}>
              <NBButton rounded block onPress={this.handlePressFinish} disabled={this.props.fetching} >
                {fetching ? <ActivityIndicator color='blue' /> : <NBText>Finish</NBText>}
              </NBButton>
            </View>
            <Text style={[styles.errorText, {marginTop: errorText ? 30 : 0}]}>
              {errorText}
            </Text>
            <View />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    year: state.login.year,
    fetching: state.login.fetching,
    fund1: state.login.fund1,
    fund2: state.login.fund2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFund1Dispatch: (fund) => dispatch(LoginActions.changeFund(fund)),
    changeFund2Dispatch: (fund) => dispatch(LoginActions.changeFund2(fund)),
    finishRequestStartDispatch: (fund) => dispatch(LoginActions.finishRequestStart()),
    finishRequestEndDispatch: (fund) => dispatch(LoginActions.finishRequestEnd())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayingScreen)

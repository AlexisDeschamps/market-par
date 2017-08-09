import React from 'react'
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from './Styles/StockCellStyles'

export default class StockCell extends React.Component {

  onPressAdd (symbol) {
    this.props.onFundSelection(symbol)
    Actions.pop()
  }

  render () {
    return (
      <TouchableOpacity onPress={() => this.onPressAdd(this.props.stock.symbol)} underlayColor='#202020'>
        <View style={styles.cellContainer}>
          <View style={[styles.rowContainer, styles.spaceBetweenContainer]}>
            <Text style={[styles.textLevel1, styles.darkText, {marginTop: 5, marginLeft: 10}]}>
              {this.props.stock.symbol}
            </Text>
            <Text style={[styles.textLevel1, styles.darkText, {marginTop: 5, marginRight: 10}]}>
              {this.props.stock.company}
            </Text>
          </View>
          <View style={[styles.rowContainer, styles.spaceBetweenContainer]}>
            <Text style={[styles.textLevel1, styles.darkText, {marginTop: 5, marginLeft: 10}]}>
                Last year return
              </Text>
            <Text style={[styles.textLevel1, styles.darkText, {marginTop: 5, marginRight: 10, color: this.props.stock.lastYearReturn > 100 ? 'green' : 'red'}]}>
              {this.props.stock.lastYearReturn ? this.props.stock.lastYearReturn.toFixed(2) + '%' : 'Unavailable'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

StockCell.propTypes = {
  stock: React.PropTypes.shape({
    symbol: React.PropTypes.string,
    company: React.PropTypes.string,
    lastYearReturn: React.PropTypes.number
  })
}

StockCell.defaultProps = {
  stock: {}
}

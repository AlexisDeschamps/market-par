import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from '../Styles/FundSelectionStockCellStyles'

export default class StockCell extends React.Component {

  onPressAdd (symbol) {
    this.props.onFundSelection(symbol)
    Actions.pop()
  }

  render () {
    return (
      <TouchableHighlight onPress={() => this.onPressAdd(this.props.stock.symbol)} underlayColor='#202020'>
        <View style={styles.cellContainer}>
            <View style={[styles.rowContainer, styles.spaceBetweenContainer]}>
              <Text style={[styles.textLevel1, styles.blackText]}>
                {this.props.stock.symbol}
              </Text>
              <Text style={[styles.textLevel1, styles.blackText]}>
                {this.props.stock.company}
              </Text>
            </View>
            <View style={[styles.rowContainer, styles.spaceBetweenContainer]}>
              <Text style={[styles.textLevel1, styles.blackText]}>
                Last year return
              </Text>
              <Text style={[styles.textLevel1, styles.blackText, {color: this.props.stock.lastYearReturn > 100 ? 'green' : 'red'}]}>
                {this.props.stock.lastYearReturn ? this.props.stock.lastYearReturn.toFixed(2) + '%' : 'Unavailable'}
              </Text>
            </View>
        </View>
      </TouchableHighlight>
    )
  }
}

StockCell.propTypes = {
  stock: React.PropTypes.shape({
    symbol: React.PropTypes.string,
  })
}

StockCell.defaultProps = {
  stock: {}
}

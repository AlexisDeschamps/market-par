import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changeFund: ['fund'],
  changeFund2: ['fund'],
  finishRequestStart: null,
  finishRequestEnd: null,
  randomizeYear: null,
  selectYear: ['year']
})

export const PlayingTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  year: 2000,
  fund1: '',
  fund2: ''
})

/* ------------- Reducers ------------- */

export const fund = (state, { fund }) => state.merge({ fund1: fund })
export const fund2 = (state, { fund }) => state.merge({ fund2: fund })
export const request = (state) => state.merge({ fetching: true })
export const requestEnd = (state) => state.merge({ fetching: false })
export const year = (state, action) => {
  switch (action.type) {
    case 'RANDOMIZE_YEAR':
      return state.merge({fund1: '', fund2: '', year: Math.floor(Math.random() * (2015 - 1980 + 1) + 1980)})
    case 'SELECT_YEAR':
      return state.merge({fund1: '', fund2: '', year: action.year})
    default:
      return state
  }
}
/* ------------- Hookup Reducers To Types ------------- */

export const HANDLERS = {
  [Types.CHANGE_FUND]: fund,
  [Types.CHANGE_FUND2]: fund2,
  [Types.FINISH_REQUEST_START]: request,
  [Types.FINISH_REQUEST_END]: requestEnd,
  [Types.RANDOMIZE_YEAR]: year,
  [Types.SELECT_YEAR]: year
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)

/* ------------- Selectors ------------- */

# Portfolio Rebalancer
MarketPar is a React Native game about challenging the stock market historically.

App Store (iOS) Link: [**TBA**](https://www.google.com)

Google Play (Android) Link: [**TBA**](https://www.google.com)

<img src="https://i.imgur.com/SL04bIX.png" alt="MarketPar image">

# Features
Create a two-fund portfolio and see how your returns stack-up to the market.
Your portfolio's average returns will be compared against the overall stock market's returns for the year.

- Play years from 1980 to 2015
- Choose or randomize years
- View performance statistics

# Technologies
- [**React**](https://facebook.github.io/react/) - JavaScript UI library
- [**Redux**](https://github.com/reactjs/redux) - Predictable state container for JavaScript

# How to use
With Git and Node.js installed:
1. git clone https://github.com/AlexisDeschamps/market-par
2. cd market-par
3. Run build
  * for iOS
    * Prepare an emulator or device
    * run `react-native run-ios`
  * for Android
    * Prepare an emulator or device
    * run `react-native run-android`

- To test: npm run test OR npm run test:watch
- To lint: npm run list OR npm run lintdiff OR npm run fixcode
- You can see other scripts in package.json

# License
[**MIT**](https://raw.githubusercontent.com/AlexisDeschamps/market-par/master/LICENSE.txt)






















#  MarketPar
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `npm install`


## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [ghooks](https://github.com/gtramontina/ghooks). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

## Track My Stocks

(work in progress)

A Simple web application build with Nodejs, Express, MongoDB, and EJS.

This application allows users to keep track of their personal stocks investments.

## Install dependencies

yarn

```
yarn install
```

npm

```
npm install
```

## Things to add

- Create a `.env` file and add the following as `key= value`
  - PORT = #### (<i>optional</i>, Defaults to 3000)
  - API_KEY = `Alpha Vantage API`
    - This web application utilizes an external API called [Alpha Vantage](https://www.alphavantage.co/) to fetch financial data. For the Search and News feature to work signup for a <strong>Free</strong> API Key.
  - DB_STRING: `mongoDB connection URI`

## Start Server

`node server,js`
npm

```
npm run start
```

yarn

```
yarn start
```

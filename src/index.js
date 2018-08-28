import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './utils/registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000' }),
  cache: new InMemoryCache()
})

const ApolloApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(ApolloApp, document.getElementById('root'))
registerServiceWorker()

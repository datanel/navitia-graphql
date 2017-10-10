import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import '../node_modules/bulma/css/bulma.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface
} from 'react-apollo';

const networkInterface = createNetworkInterface({
    uri: '/graphql'
});

const client = new ApolloClient({
    networkInterface,
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'));
//registerServiceWorker();

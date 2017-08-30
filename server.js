const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const schema = require('./src/schema.js');

const PORT = 3000;
var app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    query: `# Welcome to GraphiQL
query CoverageIDF {
  coverages(id: "fr-idf") {
    id
    name
    networks {
      id
      name
      codes {
        type
        value
      }
    }
  }
}
`,
}));

var server = app.listen(PORT, () => {
    console.log(`App is running. Navigate to http://localhost:${PORT}/graphql`);
});

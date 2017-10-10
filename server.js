const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const schema = require('./src/schema.js');
const cors = require('cors');

var app = express();

const corsMiddleware =
app.use(cors())


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));


// Serve static assets
app.use(express.static(path.resolve(__dirname, 'client', 'build')));


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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
var server = app.listen(PORT, () => {
    console.log(`App is running. Navigate to http://localhost:${PORT}/graphql`);
});

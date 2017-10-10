import React from 'react';

import {
  gql,
  graphql
} from 'react-apollo';

const coverageQuery = gql`
query CoverageIDF($id: String!) {
    coverages(id: $id) {
        name
        networks {
            id
            name
        }
    }
}
`;

const NetworkList = ({ data: {loading, error, coverages }}) => {
  if (loading) {
    return <p>Fetching Data...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  if (coverages) {
    return (
      <div>
        <p className="App-intro">
          Réseaux du coverage: <b>{coverages[0].name}</b>
        </p>
        <ul>
          { coverages[0].networks.map( network => <li key={network.id}>{network.name}</li> ) }
        </ul>
      </div> )
    } else {
      return <div>Rien</div>
    }
  };

const NetworkListData = graphql(coverageQuery, {
  options: (props) => ({
    variables: {
      id: props.coverage
    }
  })
})(NetworkList);

export default NetworkListData

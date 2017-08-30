const fetch = require('node-fetch');
const NAVITIA_URL = 'http://api.navitia.io/v1/coverage';

function callNavitia(endPoint) {
    return fetch(`${NAVITIA_URL}/${endPoint}`, {
        headers: {
            'Authorization': process.env.NAVITIA_TOKEN,
        },
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error));
}

function getcoverages(coverage = '') {
    return callNavitia(coverage)
        .then(json => json.regions);
}

function getNetworks(coverage = '', network = '') {
    return callNavitia(`${coverage}/networks/${network}`)
        .then(json => json.networks);
}

module.exports = {
    Query: {
        coverages(obj, { id }) {
            return getcoverages(id);
        },
        networks(obj, { coverage, id }) {
            return getNetworks(coverage, id);
        },
    },
    Coverage: {
        networks(coverage) {
            return getNetworks(coverage.id)
        },
    }
}

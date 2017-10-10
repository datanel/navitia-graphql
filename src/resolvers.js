const fetch = require('node-fetch');
const natsort = require('natsort');
const NAVITIA_URL = 'http://api.navitia.io/v1/coverage';

const sorter = natsort();

function callNavitia(endPoint) {
    return fetch(`${NAVITIA_URL}/${endPoint}`, {
        headers: {
            'Authorization': process.env.NAVITIA_TOKEN,
        },
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => error);
}

function getcoverages(coverage = '') {
    return callNavitia(coverage)
        .then(json => json.regions);
}

function getNetworks(coverage = '', network = '') {
    return callNavitia(`${coverage}/networks/${network}?count=100`)
        .then(json => json.networks.sort((a, b) => sorter(a.name, b.name)));
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

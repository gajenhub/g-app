const axios = require('axios');

function speakerService() {
    function getSpeakerById(id) {
        return new Promise((resolve, reject) => {
            axios.get('https://catfact.ninja/fact')
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
    //https://catfact.ninja/fact
    // axios.get('http://localhost:3000/speakers/' + id)
    return { getSpeakerById }
}

module.exports = speakerService();


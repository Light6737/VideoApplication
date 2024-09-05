const axios = require('axios');


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDQUI0MzIiLCJuYW1lIjoiUmlqdWxhIEdob3NoIiwiaWF0IjoxNTE2MjM5MDIyfQ.BSCpSQtmiLPi-1Xyl8nb_SGc1axlGZLUcN6idBkgUhk';  // You need to replace this with an actual token

async function sendRequest() {
    try {
        const res = await axios.post('http://localhost:5001/api/videos/compress', {
            inputFile: 'sample.mp4',
            outputFile: 'output.mp4'
        }, {
            headers: {
                'Authorization': `Bearer ${token}`  
            }
        });
        console.log(res.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function generateLoad() {
    const numberOfRequests = 100; 
    for (let i = 0; i < numberOfRequests; i++) {
        sendRequest();
    }
}


const interval = setInterval(generateLoad, 5000); 

setTimeout(() => {
    clearInterval(interval);
    console.log('Load test completed');
}, 300000); 

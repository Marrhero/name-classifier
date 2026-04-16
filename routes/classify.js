const router = require('express').Router();
const axios = require('axios');

router.get('/classify', async(req, res) => {

    //Validate the input 
    const { name } = req.query;
  
    if (name === undefined || name === '') {
        return res.status(400).json({
            status: 'error',
            message: 'Name parameter is required'
        });
    }

    if (typeof name !== 'string') {
        return res.status(422).json({
            status: 'error',
            message: 'Name must be a string'
        });
    }

    //Call the Genderize API
    let genderizeData;

    try {//
        const response = await axios.get('https://api.genderize.io', {
            params: {name}
        });
        genderizeData = response.data;
    }
    catch (error){
        return res.status(502).json({
            status: 'error',
            message: 'Failed to reach the genderize API'
        });
    }

    //Handle Edge Cases
    if (genderizeData.gender === null || genderizeData.count === 0) {
        return res.status(200).json({
            status: 'error',
            message: 'No prediction available for the provided name'
        });
    }

    //Process the response
    const sample_size = genderizeData.count;
    const {gender, probability} = genderizeData;
    const is_confident = probability >= 0.7 && sample_size >= 100;
    const processed_at = new Date().toISOString();

    //Send the result
    return res.status(200).json({
        status: 'success',
        data: {
            name: genderizeData.name,
            gender,
            probability,
            sample_size,
            is_confident,
            processed_at
        }
    });
});

module.exports = router;
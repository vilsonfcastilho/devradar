const axios = require('axios');

const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },
  
  async store(req, res) {
    const { github_username } = req.query;

    let dev = await Dev.findOne({ github_username });
  
    if (!Dev) {
      const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);
  
      const { name = login, avatar_url, bio } = apiRes.data;
    
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    
      dev = await Dev.update({
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }
  
    return res.json(dev);
  },
};

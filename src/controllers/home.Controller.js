const ModelHome = require("../models/HomeModel")

const fetchRtp = async (req, res) => {
   try {
      const resposne = await ModelHome.getAllRtp();
      res.render('../layouts/index', { data : resposne });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

module.exports = { fetchRtp }
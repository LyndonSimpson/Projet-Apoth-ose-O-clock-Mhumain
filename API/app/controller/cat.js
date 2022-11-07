const dataMapper = require("../datamapper/cat");
const multer = require('multer');
const storage = require('../middlewares/storage')

const catController = {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  newCat: async (req, res) => {
    //todo insert multer code here
    const id = req.auth.userId || 1;
    try {
    const upload = multer({storage: storage});
    console.log(req.file.filename);
    const image_name = req.file.filename;
    upload.single("fileUpload");
      const result = await dataMapper.createCat(req.body.pseudo, image_name, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
                                                  req.body.description, req.body.race, req.body.age, req.body.sexe,
                                                  req.body.color,
                                                  req.body.likes_pets, req.body.likes_kids, req.body.needs_garden,
                                                  req.body.siblings_id,
                                                  id); // no "is_adopted" and no "owner_id" because the cat cannot be adopted already when just created.
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  oneCat: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await dataMapper.getCatById(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  getAdoptedCats: async (req, res) => {
    try {
      const result = await dataMapper.adoptedCats();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  allCats: async (req, res) => {
    
    try {
      const result = await dataMapper.getCats();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  update: async (req, res) => {
    const id = req.auth.catId;
    try {
      const result = await dataMapper.updateCat(req.body.pseudo, req.body.image, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
                                                req.body.description, req.body.race, req.body.age, req.body.sexe,
                                                req.body.color,
                                                req.body.likes_pets, req.body.likes_kids, req.body.needs_garden, req.body.siblings_id, // no "account_id" because the user that create the profil cannot change!
                                                  id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  adoptCat: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await dataMapper.adopt(req.auth.humanId, // this is going to become the owner_id in.
                                                  id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  delete: async (req, res) => {
    const id = req.auth.catId;
    try {
      const result = await dataMapper.deleteCat(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
}

module.exports = catController;
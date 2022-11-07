const dataMapper = require("../datamapper/human");
const multer = require('multer');
const storage = require('../middlewares/storage')

const humanController = {
  newHuman: async (req, res) => {
    const id = req.auth.userId || 1;
    const fakeObject = {};
    //todo ajouter une condition avec une requête qui bloque la création d'un nouvel humain
    //todo si il y a un humain avec le account_id situé dans req.session.user.id !, "select * from human where account_id = req.session.user.id"
    try {
    const AlreadyExists = await dataMapper.getMyhumans(id);
    const check = AlreadyExists[0];
    const isEmpty = Object.keys(check || fakeObject).length === 0;
    //console.log(isEmpty);
      if(!isEmpty) {
        res.status(500).send('You already have a human profile on this account')
      } else {
        const upload = multer({storage: storage});
        console.log(req.file.filename);
        const image_name = req.file.filename;
        upload.single("fileUpload");
      const result = await dataMapper.createHuman(req.body.pseudo, image_name, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
                                                  req.body.description, req.body.age,
                                                  req.body.has_pets, req.body.has_kids, req.body.has_garden,
                                                  id); 
      res.json(result); }
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  oneHuman: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await dataMapper.getHumanById(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  allHumans: async (req, res) => {
    
    try {
      const result = await dataMapper.getHumans();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  update: async (req, res) => {
    const id = req.auth.humanId;
    try {
      const result = await dataMapper.updateHuman(req.body.pseudo, req.body.image, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
                                                  req.body.description, req.body.age,
                                                  req.body.has_pets, req.body.has_kids, req.body.has_garden,
                                                  id); // no "account_id" because the user that create the profil cannot change!
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  delete: async (req, res) => {
    const id = req.auth.humanId;
    try {
      const result = await dataMapper.deleteHuman(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
}

module.exports = humanController;
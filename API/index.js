const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });
const cookieParser = require('cookie-parser');

const cors = require('cors');

const userRouter = require('./app/router/user');
const humanRouter = require('./app/router/human');
const catRouter = require('./app/router/cat');
const catFavoritesRouter = require('./app/router/catFavorites');
const humanFavoritesRouter = require('./app/router/humanFavorites');
const resetRouter = require('./app/router/resetPassword');

const session = require('express-session');

//const userMiddleware = require('./app/middlewares/user');

const PORT = process.env.PORT;

const expressJSDocSwagger = require('express-jsdoc-swagger');


const options = {
	info: {
		version: '1.0.0',
		title: 'mhumain',
    },
    // Base directory which we use to locate your JSDOC files
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.js',
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/v3/api-docs',
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {},
    // multiple option in case you want more that one instance
    multiple: true,
};

const app = express();

app.use(express.static(__dirname))

expressJSDocSwagger(app)(options);

const bodyParser = require("body-parser"); 
app.use(bodyParser.json());


// on rajoute la gestion des sessions
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: process.env.SESSION_SECRET
}));

//app.use(userMiddleware);

app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 })); //TODO see if settings are safe

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200  })); //TODO see if settings are safe  // app.use(cors({origin: 'localhost:3000', credentials:true })); // sinon bug coté axios ? found this all over internet : app.use(cors({origin: true, credentials: true}));
//todo we have to set "content-type : application/json?"

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

//app.use(csrfProtection); //TODO - CURF casse insomnia

app.use(express.json());


app.use(userRouter, humanRouter, catRouter, catFavoritesRouter, humanFavoritesRouter, resetRouter); 

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}, visit at http http://localhost:${PORT}/`);
});
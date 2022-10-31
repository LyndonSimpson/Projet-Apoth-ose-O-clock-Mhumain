const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
//dotenv.config();

const userRouter = require('./app/router/user');
const humanRouter = require('./app/router/human');
const catRouter = require('./app/router/cat');
const favoritesRouter = require('./app/router/favorites');

const PORT = process.env.PORT || 3001;

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

expressJSDocSwagger(app)(options);

const bodyParser = require("body-parser");


app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

app.use(express.urlencoded({extended: true}));

app.use(express.json());


app.use(userRouter, humanRouter, catRouter, favoritesRouter); 

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}, visit at http http://localhost:${PORT}/`);
});
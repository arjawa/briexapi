const router = require("express").Router();
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = YAML.load("./docs.yaml");

// swagger api docs
const swaggerOpt = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "wibu API"
};
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerDocs, swaggerOpt));
router.get("/", (req, res) => {
    res.redirect("/docs");
});

module.exports = router;
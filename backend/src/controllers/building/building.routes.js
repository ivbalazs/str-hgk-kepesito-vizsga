/**
 * @Todo két végpont implementálása egy put és get metódusra
 *
 */
const express = require('express');
const router = express.Router();
const controller = require('./building.controller');

router.get('/', controller.getAllBuildingWithClassrooms);
router.put('/', controller.updateBuilding);


module.exports = router;
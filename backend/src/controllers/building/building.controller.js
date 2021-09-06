/**
 * @TODO : controller elkészítése, mely kapcsolódik a megfelelő service osztályhoz
 *
 * Kezelje a http-error üzeneteket:
 * - hiányos értékek @update műveletkor: BadREquest => 'Missing field'
 * - ha valamiért nem tudta a server frissíteni a building entitást:
 *  InternalServerError => 'Could not updated building'
 *
 * A szerver a megfelelő válaszokat küldje el a kliens felé
 */

const createError = require('http-errors');
const service = require('./building.service');

exports.updateBuilding = (req, res, next) => {

    if (!req.body.buildingId || !req.body.className) {
        return next(new createError.BadRequest('Missing field'));
    }

    return service.update(req.body.buildingId, req.body.className)
        .then(entity => {
            res.json(entity);
        })
        .catch(err => {
            console.error(err);
            return next(new createError.InternalServerError('Building could not updated'));
        });

};


exports.getAllBuildingWithClassrooms = (req, res, next) => {
    return service.getAll()
        .then(entity => {
            res.json(entity);
        }).catch(err => {
            console.error(err);
            return new createError.InternalServerError('Could not send the list');
        })
};
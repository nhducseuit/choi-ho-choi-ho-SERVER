const TontineController = require('../../controllers/Tontine');
const express = require('express');

const controller = new TontineController();
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const tontines = await controller.getTontines();
        res.status(200).json(tontines);
    } catch (err) {
        next(err);
    }
});

// router.post('/', async (req, res, next) => {
//     const doc = await controller.createTontine(req, res);
//     res.status(201).json(doc.ops[0]);
// });

router.get('/:id', async (req, res, next) => {
    try {
        const tontine = await controller.getTontineById(req, res);
        res.status(200).json(tontine);
    } catch (err) {
        next(err);
    }
});

// router.put('/', async (req, res, next) => {
//     const tontine = await controller.updateTontine(req, res);
//     tontine._id = req.params.id;
//     res.status(200).json(tontine);
// });

// router.delete('/', async (req, res, next) => {
//     await controller.deleteTontine(req, res);
//     res.status(200).json(req.params.id);
// });

router.post('/shift-round', async (req, res, next) => {
    try {
        const tontine = await controller.shiftRound(req, res);
        res.status(200).json(tontine);
    } catch (err) {
        next(err);
    }
});

router.get('/:id/investors', async (req, res, next) => {
    try {
        const investors = await controller.getInvestors(req, res);
        res.status(200).json(investors);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
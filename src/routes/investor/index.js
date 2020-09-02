const InvestorController = require('../../controllers/Investor');
const express = require('express');

const investorController = new InvestorController();
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const investor = await investorController.getInvestors(req, res);
        res.status(200).json(investor);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const resData = await investorController.createInvestor(req, res);
        res.status(200).json(resData);
    } catch (err) {
        next(err);
    }
});

router.get('/investee', async (req, res, next) => {
    try {
        const investee = await investorController.getInvestee(req, res);
        res.status(200).json(investee);
    } catch (err) {
        next(err);
    }
});

router.post('/invest', async (req, res, next) => {
    try {
        await investorController.invest(req, res);
        res.status(200).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
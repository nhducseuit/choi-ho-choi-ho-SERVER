const InvestorController = require('../../controllers/Investor');
const express = require('express');

const investorController = new InvestorController();
const router = express.Router();

router.get('/', async (req, res) => {
    const investor = await investorController.getInvestors(req, res);
    res.status(200).json(investor);
});

router.post('/', async (req, res) => {
    const resData = await investorController.createInvestor(req, res);
    res.status(200).json(resData);
});

router.get('/investee', async (req, res) => {
    const investee = await investorController.getInvestee(req, res);
    res.status(200).json(investee);
});

module.exports = router;
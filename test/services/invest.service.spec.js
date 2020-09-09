const chai = require('chai');
chai.use(require('chai-as-promised'));
const sinon = require('sinon');
const expect = chai.expect;
const investServiceFactory = require('../../src/services/invest.service');
const rounds = require('../../src/mock/round.mock');
const ServerException = require('../../src/exceptions/server.exception');

describe('InvestService', function(){
    let investService;
    let mongoService;
    beforeEach(function() {
        mongoService = sinon.mock();
        investService = investServiceFactory(mongoService);
    });

    describe('isInvestee', function() {
        const round = rounds[0];
        let investDate;
        let investorId;
        it('returns true when invest date matches a turn of input investor set in schedule of round', () => {
            investorId = '5e4eff8b6b2693d84ae7db72';
            investDate = new Date(2019, 4, 2);
            expect(investService.isInvestee(investorId, round, investDate)).to.be.true;
            investDate = new Date(2019, 4, 1);
            expect(investService.isInvestee(investorId, round, investDate)).to.be.true;
            investDate = new Date(2019, 4, 31);
            expect(investService.isInvestee(investorId, round, investDate)).to.be.true;
        });
        it('returns false when invest date doesn\'t match a turn of input investor set in schedule of round', () => {
            investorId = '5e4eff8b6b2693d84ae7db72';
            investDate = new Date(2019, 5, 2);
            expect(investService.isInvestee(investorId, round, investDate)).to.be.false;
        });
        it('returns false when invest date is out of time range of schedule of round', () => {
            investorId = '5e4eff8b6b2693d84ae7db72';
            investDate = new Date(2019, 3, 2);
            expect(investService.isInvestee(investorId, round, investDate)).to.be.false;
            investDate = new Date(2019, 9, 2);
            expect(investService.isInvestee(investorId, round, investDate)).to.be.false;
        });
    });

    describe('invest', () => {
        let investorId;
        let roundId;
        let investDate;
        beforeEach(() => {
            investorId = 'aduc';
            roundId = 'round2019';
            investDate = new Date(2019, 8, 1);
        });
        it('should throw exception when round is not found in database', async () => {
            mongoService.findById = sinon.spy();
            mongoService.findById.alwaysReturned(null);
            await expect(investService.invest(investorId, roundId, investDate)).to.be.rejectedWith(ServerException);
        });
    });
});

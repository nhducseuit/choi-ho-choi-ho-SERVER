const chai = require('chai');
chai.use(require('chai-as-promised'));
const sinon = require('sinon');
const expect = chai.expect;
const investServiceFactory = require('../../src/services/invest.service');
const rounds = require('../../src/mock/round.mock');
const ServerException = require('../../src/exceptions/server.exception');
const vlogrounds = require('../../src/mock/round.mock');

describe('InvestService', function(){
    let investService;
    let mongoService;
    let db;
    let dbCollection;
    beforeEach(function() {
        db = sinon.mock();
        dbCollection = sinon.mock();
        db.collection = sinon.fake.returns(dbCollection);

        mongoService = sinon.mock();
        mongoService.getDb = sinon.fake.returns(db);

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
        const validRound = vlogrounds[0];
        const validInvestorId = validRound.schedule[0].investorId;
        beforeEach(() => {
            investorId = 'aduc';
            roundId = 'round2019';
            investDate = new Date(2019, 8, 1);
        });
        it('should throw exception when round is not found in database', async () => {
            mongoService.findById = sinon.fake.returns(null);
            await expect(investService.invest(investorId, roundId, investDate)).to.be.rejectedWith(ServerException, 'Round not found!');
        });
        it('should throw exception when invest profile is not found', async () => {
            mongoService.findById = sinon.fake.returns({});
            dbCollection.findOne = sinon.fake.returns(null);
            await expect(investService.invest(investorId, roundId, investDate)).to.be.rejectedWith(ServerException, 'Invest profile not found!');
        });
        it('should correctly update investment to database when invest information is valid');
    });

    describe('prepareInvestment', () => {
        it('Should correctly prepare investment data when investor is investee');
        it('Should correctly prepare investment data when investor is not investee');
    });
});

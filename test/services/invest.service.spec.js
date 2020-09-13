const chai = require('chai');
chai.use(require('chai-as-promised'));
const sinon = require('sinon');
const expect = chai.expect;
const investServiceFactory = require('../../src/services/invest.service');
const rounds = require('../../src/mock/round.mock');
const ServerException = require('../../src/exceptions/server.exception');
const vlogrounds = require('../../src/mock/round.mock');
const vloggersInvestProfiles = require('../../src/mock/invest-profile.mock');
const Invest = require('../../src/models/invest.model');
const InvestStatus = require('../../src/models/types/invest-status.enum');

describe('InvestService', function () {
    let investService;
    let mongoService;
    let mockCollection;
    beforeEach(function () {
        mongoService = sinon.mock();
        investService = investServiceFactory(mongoService);
        mockCollection = sinon.mock();
        sinon.replaceGetter(investService, "collection", () => { return mockCollection; });
    });

    afterEach(() => {
        // Restore the default sandbox here
        sinon.restore();
    });

    describe('isInvestee', function () {
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
        let investProfile;
        let investDate;
        const validRound = vlogrounds[0];
        const validInvestorId = validRound.schedule[0].investorId;
        beforeEach(() => {
            investorId = validInvestorId;;
            roundId = 'round2019';
            investDate = new Date(2019, 8, 1);
        });
        it('should throw exception when round is not found in database', async () => {
            mongoService.findById = sinon.fake.returns(null);
            await expect(investService.invest(investorId, roundId, investDate)).to.be.rejectedWith(ServerException, 'Round not found!');
        });
        it('should throw exception when invest profile is not found', async () => {
            mongoService.findById = sinon.fake.returns({});
            mockCollection.findOne = sinon.fake.returns(null);
            // sinon.replaceGetter(investService, "collection", () => { return mockCollection; });
            await expect(investService.invest(investorId, roundId, investDate)).to.be.rejectedWith(ServerException, 'Invest profile not found!');
        });
        it('should correctly update investment to database when invest information is valid', async () => {
            investProfile = vloggersInvestProfiles.find(profile => profile.investorId === validInvestorId);
            mongoService.findById = sinon.fake.returns(validRound);
            mockCollection.findOne = sinon.fake.returns(investProfile);
            mockCollection.updateOne = sinon.fake.returns({
                result: {
                    ok: 1
                }
            });
            // sinon.replaceGetter(investService, "collection", () => { return mockCollection; });
            expect(await investService.invest(validInvestorId, roundId, investDate)).to.be.true;
            expect(investProfile.status).to.be.equal(InvestStatus.ACTIVE);
            expect(investProfile.investments[investProfile.investments.length - 1]).to.be.eql(Invest.invest({
                date: new Date(investDate),
                amount: investProfile.annualDepositeAmount,
                type: -1
            }));
        });
        it('should correctly update investment to database when profile investment has not yet initiated');
        it('should throw exception if update result is not OK');
        it('should throw exception if update throws error');

    });

    describe('prepareInvestment', () => {
        const round = vlogrounds[0];
        const investorId = round.schedule[0].investorId;
        const investProfile = vloggersInvestProfiles.find(profile => profile.investorId === investorId);
        let investDate;
        let expectedInvestment;
        it('Should correctly prepare investment data when investor is investee', () => {
            investDate = round.schedule[0].dateStart;
            expectedInvestment = Invest.invest({
                date: new Date(investDate),
                amount: investProfile.annualWithdrawAmount,
                type: 1
            });
            expect(investService.prepareInvestment(investorId, round, investDate, investProfile)).to.eql(expectedInvestment);
        });
        it('Should correctly prepare investment data when investor is not investee', () => {
            investDate = round.schedule[1].dateStart;
            expectedInvestment = Invest.invest({
                date: new Date(investDate),
                amount: investProfile.annualDepositeAmount,
                type: -1
            });
            expect(investService.prepareInvestment(investorId, round, investDate, investProfile)).to.eql(expectedInvestment);
        });
    });
});

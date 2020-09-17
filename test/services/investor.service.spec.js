const chai = require('chai');
chai.use(require('chai-as-promised'));
const sinon = require('sinon');
const expect = chai.expect;
const investorServiceFactory = require('../../src/services/investor.service');
// const rounds = require('../../src/mock/round.mock');
// const ServerException = require('../../src/exceptions/server.exception');
// const vlogrounds = require('../../src/mock/round.mock');
// const vloggersInvestProfiles = require('../../src/mock/invest-profile.mock');
// const Invest = require('../../src/models/invest.model');
const InvestStatus = require('../../src/models/types/invest-status.enum');

describe('InvestorService', () => {
    let investorService;
    let mongoService;
    let mockCollection;

    beforeEach(() => {
        mongoService = sinon.mock();
        investorService = investorServiceFactory(mongoService);
        mockCollection = sinon.mock();
        sinon.replace(investorService, 'collection', () => {
            return mockCollection;
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe.only('getInvestorProfileInTontine', () => {
        let investProfiles;
        beforeEach(() => {
            investProfiles = [
                {
                    investorId: '5e4eff8b6b2693d84ae7db72',
                    investor: {
                        investorId: '5e4eff8b6b2693d84ae7db72',
                        id: '5e4eff8b6b2693d84ae7db72',
                        name: 'Nguyễn Hoàng Đức',
                        alias: 'Đức Depzai',
                        phoneNumber: '0937249085',
                        bank: {
                            bank: 'Sacombank Lăng Cha Cả TPHCM',
                            accountNumber: '60150582329',
                            cardNumber: '',
                            nameOnCard: 'Nguyễn Hoàng Đức'
                        }
                    },
                    roundId: '221c5dc5-45db-4e76-8bbe-0a6c92a9325a',
                    joinDate: new Date(2019, 4, 1),
                    turns: 1,
                    annualDepositeAmount: 2000000,
                    annualWithdrawAmount: 8000000,
                    status: InvestStatus.ACTIVE,
                    investments: [
                        {
                            amount: 8000000,
                            date: new Date(2019, 4, 10),
                            type: 1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2019, 5, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2019, 6, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2019, 7, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2019, 8, 10),
                            type: -1
                        }
                    ]
                },
                {
                    investorId: '5e4eff8b6b2693d84ae7db72',
                    investor: {
                        investorId: '5e4eff8b6b2693d84ae7db72',
                        id: '5e4eff8b6b2693d84ae7db72',
                        name: 'Nguyễn Hoàng Đức',
                        alias: 'Đức Depzai',
                        phoneNumber: '0937249085',
                        bank: {
                            bank: 'Sacombank Lăng Cha Cả TPHCM',
                            accountNumber: '60150582329',
                            cardNumber: '',
                            nameOnCard: 'Nguyễn Hoàng Đức'
                        }
                    },
                    roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
                    joinDate: new Date(2019, 9, 1),
                    turns: 1,
                    annualDepositeAmount: 2000000,
                    annualWithdrawAmount: 22000000,
                    status: InvestStatus.ACTIVE,
                    investments: [
                        {
                            amount: 2000000,
                            date: new Date(2019, 9, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2019, 10, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2019, 11, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2020, 0, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2020, 1, 10),
                            type: -1
                        },
                        {
                            amount: 22000000,
                            date: new Date(2020, 2, 10),
                            type: 1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2020, 3, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2020, 4, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2020, 5, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2020, 6, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2020, 7, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2020, 8, 10),
                            type: -1
                        }
                    ]
                }
            ];
        });
        it('should terminate if list of invest profile does not have any item', () => {
            expect(investorService.getInvestorProfileInTontine(undefined)).to.be.undefined;
            expect(investorService.getInvestorProfileInTontine(null)).to.be.undefined;
            expect(investorService.getInvestorProfileInTontine([])).to.be.undefined;
        });
        describe('proper investor profile in tontine should have', () => {
            let result;
            beforeEach(() => {
                result = investorService.getInvestorProfileInTontine(investProfiles);
            });
            it('correct investorId', () => {
                expect(result.investorId).to.be.equal('5e4eff8b6b2693d84ae7db72');
            });
            it('createdDate of latest profile', () => {
                expect(result.createdDate).to.be.undefined;
            });
            it('updated date of latest profile', () => {
                expect(result.updatedDate).to.be.undefined;
            });
            it('name of latest profile', () => {
                expect(result.name).to.be.equal('Nguyễn Hoàng Đức');
            });
            it('alias of latest profile', () => {
                expect(result.alias).to.be.equal('Đức Depzai');
            });
            it('phone number of latest profile', () => {
                expect(result.phoneNumber).to.be.equal('0937249085');
            });
            it('bank info of latest profile', () => {
                expect(result.bank).to.be.eql({
                    bank: 'Sacombank Lăng Cha Cả TPHCM',
                    accountNumber: '60150582329',
                    cardNumber: '',
                    nameOnCard: 'Nguyễn Hoàng Đức'
                });
            });
            it('status of the latest profile', () => {
                expect(result.status).to.be.equal(InvestStatus.ACTIVE);
            });
            it('joinDate of the oldest profile', () => {
                expect(result.joinDate).to.be.eql(new Date(2019, 4, 1));
            });
            it('totalDeposited amount is sum of all deposited amount', () => {
                expect(result.totalDeposited).to.be.equal(30000000);
            });
            it('totalWithdrawn amount is sum of all withdrawn amount', () => {
                expect(result.totalWithdrawn).to.be.equal(30000000);
            });
        });
    });

    describe('getInvestorsOfTontine', () => {
        it('', () => {

        });
        it('', () => {

        });
        it('', () => {

        });
        it('', () => {

        });
        it('', () => {

        });
    });
    describe('getInvestorForTontine', () => {
        it('', () => {

        });
    });
});
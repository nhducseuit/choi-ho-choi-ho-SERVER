const chai = require('chai');
chai.use(require('chai-as-promised'));
const sinon = require('sinon');
const expect = chai.expect;
const investorServiceFactory = require('../../src/services/investor.service');
const InvestStatus = require('../../src/models/types/invest-status.enum');
const NotFoundException = require('../../src/exceptions/not-found.exception');
const BadRequestException = require('../../src/exceptions/bad-request.exception');
const { mock } = require('sinon');

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

    describe('getInvestorProfileInTontine', () => {
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

    describe('groupInvestProfilesByInvestor', () => {
        it('should return array of distinct invest profile arrays per investor if source array is correctly sorted by investor', () => {
            const sortedInvestProfiles = [
                {
                    investorId: '1',
                    name: 'investor 1',
                    roundId: 'abc',
                },
                {
                    investorId: '1',
                    name: 'investor 1',
                    roundId: 'xyz',
                },
                {
                    investorId: '2',
                    name: 'investor 2',
                    roundId: 'xyz',
                }
            ];
            const groupedInvestProfileGroups = [
                [
                    {
                        investorId: '1',
                        name: 'investor 1',
                        roundId: 'abc',
                    },
                    {
                        investorId: '1',
                        name: 'investor 1',
                        roundId: 'xyz',
                    },

                ],
                [
                    {
                        investorId: '2',
                        name: 'investor 2',
                        roundId: 'xyz',
                    }
                ]
            ];
            expect(investorService.groupInvestProfilesByInvestor(sortedInvestProfiles)).to.be.eql(groupedInvestProfileGroups);
            expect(investorService.groupInvestProfilesByInvestor([])).to.be.eql([]);
        });
        it('should return array of non-distinct invest profile arrays belonging to same investor if source array is not sorted by investor', () => {
            const nonSortedInvestProfiles = [
                {
                    investorId: '1',
                    name: 'investor 1',
                    roundId: 'abc',
                },
                {
                    investorId: '2',
                    name: 'investor 2',
                    roundId: 'xyz',
                },
                {
                    investorId: '1',
                    name: 'investor 1',
                    roundId: 'xyz',
                },
            ];
            const groupedInvestProfileGroups = [
                [
                    {
                        investorId: '1',
                        name: 'investor 1',
                        roundId: 'abc',
                    },

                ],
                [
                    {
                        investorId: '2',
                        name: 'investor 2',
                        roundId: 'xyz',
                    }
                ],
                [
                    {
                        investorId: '1',
                        name: 'investor 1',
                        roundId: 'xyz',
                    },
                ]
            ];
            expect(investorService.groupInvestProfilesByInvestor(nonSortedInvestProfiles)).to.be.eql(groupedInvestProfileGroups);
        });
    });

    describe('getInvestorsOfTontine', () => {

        it('should return empty array if tontine has no round', async () => {
            mockCollection.find = sinon.fake.returns({
                map: () => {
                    return {
                        toArray: () => Promise.resolve([])
                    };
                }
            });
            expect(await investorService.getInvestorsOfTontine('123')).to.be.eql([]);
        });
        it('should return empty array if tontine has no invest profile', async () => {
            mockCollection.find = sinon.fake.returns({
                map: () => {
                    return {
                        toArray: () => Promise.resolve(['abc'])
                    };
                }
            });
            mockCollection.aggregate = sinon.fake.returns({
                toArray: () => Promise.resolve([])
            });
            expect(await investorService.getInvestorsOfTontine('123')).to.be.eql([]);
        });

        it('should return array of investor\'s invest profiles from individual and repeated invest profile of a tontine', async () => {
            mockCollection.find = sinon.fake.returns({
                map: () => {
                    return {
                        toArray: () => Promise.resolve([
                            '221c5dc5-45db-4e76-8bbe-0a6c92a9325a',
                            '645373f9-d0e3-4f8b-9c50-29defe69b74b'
                        ])
                    };
                }
            });
            const investProfiles = [
                {
                    investorId: '5e4eff8b6b2693d84ae7db72',
                    investor: {
                        investorId: '5e4eff8b6b2693d84ae7db72',
                        createdDate: new Date(2019, 4, 1),
                        updatedDate: new Date(2019, 4, 1),
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
                        createdDate: new Date(2019, 4, 1),
                        updatedDate: new Date(2019, 4, 1),
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
                },
                {
                    investorId: '7cee9e30-62d1-46dc-97ea-bf2e6b8f7441',
                    investor: {
                        investorId: '7cee9e30-62d1-46dc-97ea-bf2e6b8f7441',
                        createdDate: new Date(2019, 4, 1),
                        updatedDate: new Date(2019, 4, 1),
                        id: '7cee9e30-62d1-46dc-97ea-bf2e6b8f7441',
                        name: 'Nguyễn Thị Hiền',
                        alias: 'Chị Hiền',
                        phoneNumber: '0973869790',
                        bank: {
                            bank: 'Techcombank CN Vinh - Nghe An',
                            accountNumber: '19034629729014',
                            cardNumber: '',
                            nameOnCard: 'Nguyễn Thị Hiền'
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
                            amount: 2000000,
                            date: new Date(2019, 4, 10),
                            type: -1
                        },
                        {
                            amount: 8000000,
                            date: new Date(2019, 5, 10),
                            type: 1
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
                    investorId: '7cee9e30-62d1-46dc-97ea-bf2e6b8f7441',
                    investor: {
                        investorId: '7cee9e30-62d1-46dc-97ea-bf2e6b8f7441',
                        createdDate: new Date(2019, 4, 1),
                        updatedDate: new Date(2019, 4, 1),
                        id: '7cee9e30-62d1-46dc-97ea-bf2e6b8f7441',
                        name: 'Nguyễn Thị Hiền',
                        alias: 'Chị Hiền',
                        phoneNumber: '0973869790',
                        bank: {
                            bank: 'Techcombank CN Vinh - Nghe An',
                            accountNumber: '19034629729014',
                            cardNumber: '',
                            nameOnCard: 'Nguyễn Thị Hiền'
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
                            amount: 22000000,
                            date: new Date(2020, 0, 10),
                            type: 1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2020, 1, 10),
                            type: -1
                        },
                        {
                            amount: 2000000,
                            date: new Date(2020, 2, 10),
                            type: -1
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
            const expectedInvestorProfiles = [
                {
                    investorId: '5e4eff8b6b2693d84ae7db72',
                    createdDate: new Date(2019, 4, 1),
                    updatedDate: new Date(2019, 4, 1),
                    name: 'Nguyễn Hoàng Đức',
                    alias: 'Đức Depzai',
                    phoneNumber: '0937249085',
                    bank: {
                        bank: 'Sacombank Lăng Cha Cả TPHCM',
                        accountNumber: '60150582329',
                        cardNumber: '',
                        nameOnCard: 'Nguyễn Hoàng Đức'
                    },
                    status: InvestStatus.ACTIVE,
                    joinDate: new Date(2019, 4, 1),
                    totalDeposited: 30000000,
                    totalWithdrawn: 30000000
                },
                {
                    investorId: '7cee9e30-62d1-46dc-97ea-bf2e6b8f7441',
                    createdDate: new Date(2019, 4, 1),
                    updatedDate: new Date(2019, 4, 1),
                    name: 'Nguyễn Thị Hiền',
                    alias: 'Chị Hiền',
                    phoneNumber: '0973869790',
                    bank: {
                        bank: 'Techcombank CN Vinh - Nghe An',
                        accountNumber: '19034629729014',
                        cardNumber: '',
                        nameOnCard: 'Nguyễn Thị Hiền'
                    },
                    status: InvestStatus.ACTIVE,
                    joinDate: new Date(2019, 4, 1),
                    totalDeposited: 30000000,
                    totalWithdrawn: 30000000
                },
            ];
            mockCollection.aggregate = sinon.fake.returns({
                toArray: () => Promise.resolve(investProfiles)
            });
            expect(await investorService.getInvestorsOfTontine('123')).to.be.eql(expectedInvestorProfiles);
        });
    });

    describe('getInvestorForTontine', () => {
        it('should throw BadRequestException if tontine is empty', async () => {
            mockCollection.find = sinon.fake.returns({
                map: () => {
                    return {
                        toArray: () => Promise.resolve([])
                    };
                }
            });
            await expect(investorService.getInvestorForTontine('123', 'abc')).to.be.rejectedWith(BadRequestException, 'Tontine has no round');
        });
        it('should throw NotFoundException if not invest profile is found for investor in tontine', async () => {
            mockCollection.find = sinon.fake.returns({
                map: () => {
                    return {
                        toArray: () => Promise.resolve(['xyz'])
                    };
                }
            });
            mockCollection.aggregate = sinon.fake.returns({
                toArray: () => Promise.resolve([])
            });
            await expect(investorService.getInvestorForTontine('123', 'abc')).to.be.rejectedWith(NotFoundException, 'Invest profile not found');
        });
        it('should return proper investor profile with summarized invest information if has recorded data in tontine', async () => {
            mockCollection.find = sinon.fake.returns({
                map: () => {
                    return {
                        toArray: () => Promise.resolve(['xyz'])
                    };
                }
            });
            const investProfiles = [
                {
                    investorId: '5e4eff8b6b2693d84ae7db72',
                    investor: {
                        investorId: '5e4eff8b6b2693d84ae7db72',
                        createdDate: new Date(2019, 4, 1),
                        updatedDate: new Date(2019, 4, 1),
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
                        createdDate: new Date(2019, 4, 1),
                        updatedDate: new Date(2019, 4, 1),
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
                },
            ];
            const investorInTontineProfile = {
                investorId: '5e4eff8b6b2693d84ae7db72',
                createdDate: new Date(2019, 4, 1),
                updatedDate: new Date(2019, 4, 1),
                name: 'Nguyễn Hoàng Đức',
                alias: 'Đức Depzai',
                phoneNumber: '0937249085',
                bank: {
                    bank: 'Sacombank Lăng Cha Cả TPHCM',
                    accountNumber: '60150582329',
                    cardNumber: '',
                    nameOnCard: 'Nguyễn Hoàng Đức'
                },
                status: InvestStatus.ACTIVE,
                joinDate: new Date(2019, 4, 1),
                totalDeposited: 30000000,
                totalWithdrawn: 30000000
            };
            mockCollection.aggregate = sinon.fake.returns({
                toArray: () => Promise.resolve(investProfiles)
            });
            expect(await investorService.getInvestorForTontine('5e4eff8b6b2693d84ae7db72', 'some-tontine')).to.be.eql(investorInTontineProfile);

        });
    });
});
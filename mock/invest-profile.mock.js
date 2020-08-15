const InvestStatus = require('../models/types/invest-status.enum');

const ducInvestProfiles = [
    {
        investorId: '5e4eff8b6b2693d84ae7db72',
        roundId: '221c5dc5-45db-4e76-8bbe-0a6c92a9325a',
        joinDate: new Date(2019, 4, 1),
        turns: 1,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                turnInRound: 0,
                amount: 8000000,
                date: new Date(2019, 4, 10),
                type: 1
            },
            {
                turnInRound: 1,
                amount: 2000000,
                date: new Date(2019, 5, 10),
                type: -1
            },
            {
                turnInRound: 2,
                amount: 2000000,
                date: new Date(2019, 6, 10),
                type: -1
            },
            {
                turnInRound: 3,
                amount: 2000000,
                date: new Date(2019, 7, 10),
                type: -1
            },
            {
                turnInRound: 4,
                amount: 2000000,
                date: new Date(2019, 8, 10),
                type: -1
            }
        ]
    },
    {
        investorId: '5e4eff8b6b2693d84ae7db72',
        roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
        joinDate: new Date(2019, 9, 1),
        turns: 1,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                turnInRound: 0,
                amount: 2000000,
                date: new Date(2019, 9, 10),
                type: -1
            },
            {
                turnInRound: 1,
                amount: 2000000,
                date: new Date(2019, 10, 10),
                type: -1
            },
            {
                turnInRound: 2,
                amount: 2000000,
                date: new Date(2019, 11, 10),
                type: -1
            },
            {
                turnInRound: 3,
                amount: 2000000,
                date: new Date(2020, 0, 10),
                type: -1
            },
            {
                turnInRound: 4,
                amount: 2000000,
                date: new Date(2020, 1, 10),
                type: -1
            },
            {
                turnInRound: 5,
                amount: 22000000,
                date: new Date(2020, 2, 10),
                type: 1
            },
            {
                turnInRound: 6,
                amount: 2000000,
                date: new Date(2020, 3, 10),
                type: -1
            },
            {
                turnInRound: 7,
                amount: 2000000,
                date: new Date(2020, 4, 10),
                type: -1
            },
            {
                turnInRound: 8,
                amount: 2000000,
                date: new Date(2020, 5, 10),
                type: -1
            },
            {
                turnInRound: 9,
                amount: 2000000,
                date: new Date(2020, 6, 10),
                type: -1
            },
            {
                turnInRound: 10,
                amount: 2000000,
                date: new Date(2020, 7, 10),
                type: -1
            },
            {
                turnInRound: 11,
                amount: 2000000,
                date: new Date(2020, 8, 10),
                type: -1
            }
        ]
    }
];
const hienInvestProfiles = [
    {
        investorId: '7cee9e30-62d1-46dc-97ea-bf2e6b8f7441',
        roundId: '221c5dc5-45db-4e76-8bbe-0a6c92a9325a',
        joinDate: new Date(2019, 4, 1),
        turns: 1,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                turnInRound: 0,
                amount: 2000000,
                date: new Date(2019, 4, 10),
                type: -1
            },
            {
                turnInRound: 1,
                amount: 8000000,
                date: new Date(2019, 5, 10),
                type: 1
            },
            {
                turnInRound: 2,
                amount: 2000000,
                date: new Date(2019, 6, 10),
                type: -1
            },
            {
                turnInRound: 3,
                amount: 2000000,
                date: new Date(2019, 7, 10),
                type: -1
            },
            {
                turnInRound: 4,
                amount: 2000000,
                date: new Date(2019, 8, 10),
                type: -1
            }
        ]
    },
    {
        investorId: '7cee9e30-62d1-46dc-97ea-bf2e6b8f7441',
        roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
        joinDate: new Date(2019, 9, 1),
        turns: 1,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                turnInRound: 0,
                amount: 2000000,
                date: new Date(2019, 9, 10),
                type: -1
            },
            {
                turnInRound: 1,
                amount: 2000000,
                date: new Date(2019, 10, 10),
                type: -1
            },
            {
                turnInRound: 2,
                amount: 2000000,
                date: new Date(2019, 11, 10),
                type: -1
            },
            {
                turnInRound: 3,
                amount: 22000000,
                date: new Date(2020, 0, 10),
                type: 1
            },
            {
                turnInRound: 4,
                amount: 2000000,
                date: new Date(2020, 1, 10),
                type: -1
            },
            {
                turnInRound: 5,
                amount: 22000000,
                date: new Date(2020, 2, 10),
                type: 1
            },
            {
                turnInRound: 6,
                amount: 2000000,
                date: new Date(2020, 3, 10),
                type: -1
            },
            {
                turnInRound: 7,
                amount: 2000000,
                date: new Date(2020, 4, 10),
                type: -1
            },
            {
                turnInRound: 8,
                amount: 2000000,
                date: new Date(2020, 5, 10),
                type: -1
            },
            {
                turnInRound: 9,
                amount: 2000000,
                date: new Date(2020, 6, 10),
                type: -1
            },
            {
                turnInRound: 10,
                amount: 2000000,
                date: new Date(2020, 7, 10),
                type: -1
            },
            {
                turnInRound: 11,
                amount: 2000000,
                date: new Date(2020, 8, 10),
                type: -1
            }
        ]
    }
];
const linhEmInvestProfiles = [
    {
        investorId: 'e8842900-0685-4894-8df2-66a4821c4f53',
        roundId: '221c5dc5-45db-4e76-8bbe-0a6c92a9325a',
        joinDate: new Date(2019, 4, 1),
        turns: 1,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                turnInRound: 0,
                amount: 2000000,
                date: new Date(2019, 4, 10),
                type: -1
            },
            {
                turnInRound: 1,
                amount: 2000000,
                date: new Date(2019, 5, 10),
                type: -1
            },
            {
                turnInRound: 2,
                amount: 8000000,
                date: new Date(2019, 6, 10),
                type: 1
            },
            {
                turnInRound: 3,
                amount: 2000000,
                date: new Date(2019, 7, 10),
                type: -1
            },
            {
                turnInRound: 4,
                amount: 2000000,
                date: new Date(2019, 8, 10),
                type: -1
            }
        ]
    },
    {
        investorId: 'e8842900-0685-4894-8df2-66a4821c4f53',
        roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
        joinDate: new Date(2019, 9, 1),
        turns: 1,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                turnInRound: 0,
                amount: 4000000,
                date: new Date(2019, 9, 10),
                type: -1
            },
            {
                turnInRound: 1,
                amount: 22000000,
                date: new Date(2019, 10, 10),
                type: 1
            },
            {
                turnInRound: 2,
                amount: 4000000,
                date: new Date(2019, 11, 10),
                type: -1
            },
            {
                turnInRound: 3,
                amount: 4000000,
                date: new Date(2020, 0, 10),
                type: -1
            },
            {
                turnInRound: 4,
                amount: 4000000,
                date: new Date(2020, 1, 10),
                type: -1
            },
            {
                turnInRound: 5,
                amount: 4000000,
                date: new Date(2020, 2, 10),
                type: -1
            },
            {
                turnInRound: 6,
                amount: 4000000,
                date: new Date(2020, 3, 10),
                type: -1
            },
            {
                turnInRound: 7,
                amount: 4000000,
                date: new Date(2020, 4, 10),
                type: -1
            },
            {
                turnInRound: 8,
                amount: 4000000,
                date: new Date(2020, 5, 10),
                type: -1
            },
            {
                turnInRound: 9,
                amount: 4000000,
                date: new Date(2020, 6, 10),
                type: -1
            },
            {
                turnInRound: 10,
                amount: 22000000,
                date: new Date(2020, 7, 10),
                type: 1
            },
            {
                turnInRound: 11,
                amount: 4000000,
                date: new Date(2020, 8, 10),
                type: -1
            }
        ]
    }
];
const linhChiInvestProfiles = [
    {
        investorId: '',
        roundId: '',
        joinDate: new Date(),
        turns: 1,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                turnInRound: 1,
                amount: -2000000,
                date: new Date(),
                type: -1
            }
        ]
    }
];
const hangInvestProfiles = [
    {
        investorId: '',
        roundId: '',
        joinDate: new Date(),
        turns: 1,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                turnInRound: 1,
                amount: -2000000,
                date: new Date(),
                type: -1
            }
        ]
    }
];
const leInvestProfiles = [
    {
        investorId: '',
        roundId: '',
        joinDate: new Date(),
        turns: 1,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                turnInRound: 1,
                amount: -2000000,
                date: new Date(),
                type: -1
            }
        ]
    }
];
const khanhInvestProfiles = [
    {
        investorId: '',
        roundId: '',
        joinDate: new Date(),
        turns: 1,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                turnInRound: 1,
                amount: -2000000,
                date: new Date(),
                type: -1
            }
        ]
    }
];
const haInvestProfiles = [
    {
        investorId: '',
        roundId: '',
        joinDate: new Date(),
        turns: 1,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                turnInRound: 1,
                amount: -2000000,
                date: new Date(),
                type: -1
            }
        ]
    }
];
const thaoInvestProfiles = [
    {
        investorId: '',
        roundId: '',
        joinDate: new Date(),
        turns: 1,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                turnInRound: 1,
                amount: -2000000,
                date: new Date(),
                type: -1
            }
        ]
    }
];

const vloggersInvestProfiles = [
    ...ducInvestProfiles,
    ...hienInvestProfiles,
    ...linhChiInvestProfiles,
    ...linhEmInvestProfiles,
    ...hangInvestProfiles,
    ...khanhInvestProfiles,
    ...leInvestProfiles,
    ...haInvestProfiles,
    ...thaoInvestProfiles
];

module.exports = vloggersInvestProfiles;
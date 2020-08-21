const InvestStatus = require('../models/types/invest-status.enum');

const ducInvestProfiles = [
    {
        investorId: '5e4eff8b6b2693d84ae7db72',
        roundId: '221c5dc5-45db-4e76-8bbe-0a6c92a9325a',
        joinDate: new Date(2019, 4, 1),
        turns: 1,
        investAmount: 2000000,
        investedAmount: 8000000,
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
        roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
        joinDate: new Date(2019, 9, 1),
        turns: 1,
        investAmount: 2000000,
        investedAmount: 22000000,
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
const hienInvestProfiles = [
    {
        investorId: '7cee9e30-62d1-46dc-97ea-bf2e6b8f7441',
        roundId: '221c5dc5-45db-4e76-8bbe-0a6c92a9325a',
        joinDate: new Date(2019, 4, 1),
        turns: 1,
        investAmount: 2000000,
        investedAmount: 8000000,
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
        roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
        joinDate: new Date(2019, 9, 1),
        turns: 1,
        investAmount: 2000000,
        investedAmount: 22000000,
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
const linhEmInvestProfiles = [
    {
        investorId: 'e8842900-0685-4894-8df2-66a4821c4f53',
        roundId: '221c5dc5-45db-4e76-8bbe-0a6c92a9325a',
        joinDate: new Date(2019, 4, 1),
        turns: 1,
        investAmount: 2000000,
        investedAmount: 8000000,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                amount: 2000000,
                date: new Date(2019, 4, 10),
                type: -1
            },
            {
                amount: 2000000,
                date: new Date(2019, 5, 10),
                type: -1
            },
            {
                amount: 8000000,
                date: new Date(2019, 6, 10),
                type: 1
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
        investorId: 'e8842900-0685-4894-8df2-66a4821c4f53',
        roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
        joinDate: new Date(2019, 9, 1),
        turns: 2,
        investAmount: 4000000,
        investedAmount: 20000000,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                amount: 4000000,
                date: new Date(2019, 9, 10),
                type: -1
            },
            {
                amount: 20000000,
                date: new Date(2019, 10, 10),
                type: 1
            },
            {
                amount: 4000000,
                date: new Date(2019, 11, 10),
                type: -1
            },
            {
                amount: 4000000,
                date: new Date(2020, 0, 10),
                type: -1
            },
            {
                amount: 4000000,
                date: new Date(2020, 1, 10),
                type: -1
            },
            {
                amount: 4000000,
                date: new Date(2020, 2, 10),
                type: -1
            },
            {
                amount: 4000000,
                date: new Date(2020, 3, 10),
                type: -1
            },
            {
                amount: 4000000,
                date: new Date(2020, 4, 10),
                type: -1
            },
            {
                amount: 4000000,
                date: new Date(2020, 5, 10),
                type: -1
            },
            {
                amount: 4000000,
                date: new Date(2020, 6, 10),
                type: -1
            },
            {
                amount: 20000000,
                date: new Date(2020, 7, 10),
                type: 1
            },
            {
                amount: 4000000,
                date: new Date(2020, 8, 10),
                type: -1
            }
        ]
    }
];
const linhChiInvestProfiles = [
    {
        investorId: 'cbf08139-3dba-4120-8406-93243f2353f6',
        roundId: '221c5dc5-45db-4e76-8bbe-0a6c92a9325a',
        joinDate: new Date(2019, 4, 1),
        turns: 1,
        investAmount: 2000000,
        investedAmount: 8000000,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                amount: 2000000,
                date: new Date(2019, 4, 10),
                type: -1
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
                amount: 8000000,
                date: new Date(2019, 7, 10),
                type: 1
            },
            {
                amount: 2000000,
                date: new Date(2019, 8, 10),
                type: -1
            }
        ]
    },
    {
        investorId: 'cbf08139-3dba-4120-8406-93243f2353f6',
        roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
        joinDate: new Date(2019, 9, 1),
        turns: 1,
        investAmount: 2000000,
        investedAmount: 22000000,
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
                amount: 22000000,
                date: new Date(2020, 1, 10),
                type: 1
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
const hangInvestProfiles = [
    {
        investorId: '29c0e911-9c18-497a-b9ef-b10fb170f765',
        roundId: '221c5dc5-45db-4e76-8bbe-0a6c92a9325a',
        joinDate: new Date(2019, 4, 1),
        turns: 1,
        investAmount: 2000000,
        investedAmount: 8000000,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                amount: 2000000,
                date: new Date(2019, 4, 10),
                type: -1
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
                amount: 8000000,
                date: new Date(2019, 8, 10),
                type: 1
            }
        ]
    },
    {
        investorId: '29c0e911-9c18-497a-b9ef-b10fb170f765',
        roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
        joinDate: new Date(2019, 9, 1),
        turns: 1,
        investAmount: 2000000,
        investedAmount: 22000000,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                amount: 22000000,
                date: new Date(2019, 9, 10),
                type: 1
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
const leInvestProfiles = [
    {
        investorId: '5e4f0010f398dbd940e8661b',
        roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
        joinDate: new Date(2019, 9, 1),
        turns: 1,
        investAmount: 2000000,
        investedAmount: 22000000,
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
                amount: 22000000,
                date: new Date(2020, 6, 10),
                type: 1
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
const khanhInvestProfiles = [
    {
        investorId: '5e4effd52aaa50d92e632033',
        roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
        joinDate: new Date(2019, 9, 1),
        turns: 1,
        investAmount: 2000000,
        investedAmount: 22000000,
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
                amount: 22000000,
                date: new Date(2020, 4, 10),
                type: 1
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
const haInvestProfiles = [
    {
        investorId: '5e4f00915cac3cd96235a2c1',
        roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
        joinDate: new Date(2019, 9, 1),
        turns: 3,
        investAmount: 6000000,
        investedAmount: 18000000,
        status: InvestStatus.ACTIVE,
        investments: [
            {
                amount: 6000000,
                date: new Date(2019, 9, 10),
                type: -1
            },
            {
                amount: 6000000,
                date: new Date(2019, 10, 10),
                type: -1
            },
            {
                amount: 1800000,
                date: new Date(2019, 11, 10),
                type: 1
            },
            {
                amount: 6000000,
                date: new Date(2020, 0, 10),
                type: -1
            },
            {
                amount: 6000000,
                date: new Date(2020, 1, 10),
                type: -1
            },
            {
                amount: 6000000,
                date: new Date(2020, 2, 10),
                type: -1
            },
            {
                amount: 6000000,
                date: new Date(2020, 3, 10),
                type: -1
            },
            {
                amount: 6000000,
                date: new Date(2020, 4, 10),
                type: -1
            },
            {
                amount: 18000000,
                date: new Date(2020, 5, 10),
                type: 1
            },
            {
                amount: 6000000,
                date: new Date(2020, 6, 10),
                type: -1
            },
            {
                amount: 6000000,
                date: new Date(2020, 7, 10),
                type: -1
            },
            {
                amount: 18000000,
                date: new Date(2020, 8, 10),
                type: 1
            }
        ]
    }
];
const thaoInvestProfiles = [
    {
        investorId: '5e4f00d51f6741d97dad58ac',
        roundId: '645373f9-d0e3-4f8b-9c50-29defe69b74b',
        joinDate: new Date(2019, 9, 1),
        turns: 1,
        investAmount: 2000000,
        investedAmount: 22000000,
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
                amount: 2000000,
                date: new Date(2020, 2, 10),
                type: -1
            },
            {
                amount: 22000000,
                date: new Date(2020, 3, 10),
                type: 1
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
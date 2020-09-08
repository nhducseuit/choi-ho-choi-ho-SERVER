const apiMap = {
    basePath: '/api/investor',
    controller: 'investorController',
    subPaths: [
        {
            api: '/',
            method: 'get',
            handler: 'getInvestors'
        },
        {
            api: '/',
            method: 'post',
            handler: 'createInvestor'
        },
        {
            api: '/investee',
            method: 'get',
            handler: 'getInvestee'
        },
        {
            api: '/invest',
            method: 'post',
            handler: 'invest'
        }
    ]
};

module.exports = apiMap;
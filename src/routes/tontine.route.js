const apiMap = {
    basePath: '/api/tontines',
    controller: 'tontineController',
    subPaths: [
        {
            api: '/',
            method: 'get',
            handler: 'getTontines'
        },
        {
            api: '/:id',
            method: 'get',
            handler: 'getTontineById'
        },
        {
            api: '/shift-round',
            method: 'post',
            handler: 'shiftRound'
        },
        {
            api: '/:id/investors',
            method: 'get',
            handler: 'getInvestors'
        }
    ]
};

module.exports = apiMap;
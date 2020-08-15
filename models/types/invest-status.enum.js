const InvestStatus = Object.freeze({
    NEW: Symbol('NEW'),
    ACTIVE: Symbol('ACTIVE'),
    SUSPENDED: Symbol('SUSPENDED'),
    LEFT: Symbol('LEFT')
});

module.exports = InvestStatus;
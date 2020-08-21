const InvestStatus = require("./types/invest-status.enum");

class InvestProfile {
    constructor(
        investorId,
        roundId,
        joinDate,
        // Payment method details
        turns,
        investAmount,
        investedAmount,
        status,
        investments
    ) {
        this.investorId = investorId;
        this.roundId = roundId;
        this.joinDate = joinDate;
        this.turns = turns;
        this.investAmount = investAmount;
        this.investedAmount = investedAmount;
        this.status = status;
        this.investments = investments;
    }

    static investProfile(investProfile) {
        return new InvestProfile(
            investProfile.investorId,
            investProfile.roundId,
            new Date(investProfile.joinDate),
            investProfile.turns,
            investProfile.investAmount,
            investProfile.investedAmount,
            InvestStatus.NEW,
            []
        );
    }
}

module.exports = InvestProfile;
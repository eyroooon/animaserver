const categoryNames = {
  Approval: ['0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'],
  AddLiquidity: [
    '0x423f6495a08fc652425cf4ed0d1f9e37e571d9b9529b1c1c23cce780b2e7df0d',
    '0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768',
    // '0x540ab385f9b5d450a27404172caade516b3ba3f4be88239ac56a2ad1de2a1f5a',
  ],
  RemoveLiquidity: [
    '0x423f6495a08fc652425cf4ed0d1f9e37e571d9b9529b1c1c23cce780b2e7df0d',
    '0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768',
  ],
  Stake: ['0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d'],
  UnStake: [],
  Deposit: [
    '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
    '0x7aa1a8eb998c779420645fc14513bf058edb347d95c2fc2e6845bdc22f888631',
  ],
  Withdraw: ['0xe5df19de43c8c04fd192bc68e484b2593570925fbb6ad8c07ccafbc2aa5c37a1'],
  Borrow: [],
  Repay: [],
  Lend: [],
  Collect: [],
  Liquidate: [],
  Liquidated: [],
  Purchase: [],
  Sell: [],
  Swap: [],
  'Transfer/Send': ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  Bid: [],
  Mint: [],
  Burn: [],
  Claim: [],
  Bridge: [],
  UnBridge: [],
  Wrap: [],
  UnWrap: [],
  'NULL (Contracts Not Worth Tracking)': [],
};

const signatures = {
  '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925': ['uint256'], //Approval
  '0x423f6495a08fc652425cf4ed0d1f9e37e571d9b9529b1c1c23cce780b2e7df0d': ['uint256[3]', 'uint256[3]', 'uint256', 'uint256'], //Addliquidity
  '0x6806895d15a4a9bd0d61464c7b89591028ad112213a48b1c5c8783509a8e3703': ['uint256[2]', 'uint256[2]', 'uint256', 'uint256'], //Addliquidity
  //   '0x6806895d15a4a9bd0d61464c7b89591028ad112213a48b1c5c8783509a8e3703': ['uint256[2]', 'uint256', 'uint256'], //Addliquidity
  '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d': ['uint256'], //Stake
  '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c': ['uint256'], //Deposit
  '0x7aa1a8eb998c779420645fc14513bf058edb347d95c2fc2e6845bdc22f888631': ['uint256', 'uint256'], //Deposit
  '0xe5df19de43c8c04fd192bc68e484b2593570925fbb6ad8c07ccafbc2aa5c37a1': ['uint256', 'uint256'], //Withdraw
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef': ['uint256'], //Transfer
};

const objectPairing = {
  myCategory1: [1, 2],
  myCategory2: [3, 4, 5, 6, 7, 8],
  myCategory3: [3, 4, 8, 5, 6, 7],
  myCategory4: [9, 10],
  myCategory5: [],
  myCategory6: [10],
  myCategory7: [5, 10],
  myCategory8: [],
  myCategory9: [],
  myCategory10: [9, 10],
  myCategory11: [],
  myCategory12: [],
  myCategory13: [],
  myCategory14: [],
  myCategory15: [],
  myCategory16: [],
  myCategory17: [5, 10, 11],
  myCategory18: [],
  myCategory19: [5, 10],
  myCategory20: [12, 10],
  myCategory21: [],
  myCategory22: [],
  myCategory23: [],
  myCategory24: [],
  myCategory25: [],
  myCategory26: [],
};

const topicPairing = {
  myCategory1: { 1: 2, 2: 'value' },
  myCategory2: { 3: null },
  myCategory3: [3, 4, 8, 5, 6, 7],
  myCategory4: [9, 10],
  myCategory5: [],
  myCategory6: [10],
  myCategory7: [5, 10],
  myCategory8: [],
  myCategory9: [],
  myCategory10: [9, 10],
  myCategory11: [],
  myCategory12: [],
  myCategory13: [],
  myCategory14: [],
  myCategory15: [],
  myCategory16: [],
  myCategory17: { 5: 2, 10: 'value' },
  myCategory18: [],
  myCategory19: [5, 10],
  myCategory20: [12, 10],
  myCategory21: [],
  myCategory22: [],
  myCategory23: [],
  myCategory24: [],
  myCategory25: [],
  myCategory26: [],
};

const getTopicIndex = (categoryId, key) => {
    console.log(categoryId, key)
  if (categoryId === 17 && key === 5) {
    return 2;
  } else {
    return null;
  }
};

module.exports = {
  categoryNames,
  signatures,
  topicPairing,
  getTopicIndex
};

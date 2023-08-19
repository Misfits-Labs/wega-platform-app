
// export const approveWagerSpend = createAsyncThunk(
//  'blockchain/approveWagerSpend',
//  async ({ tokenAddress, wager}: {
//    tokenAddress: `0x${string}`, 
//    wager: number }) => {
//    const wagerAsBigint = utils.parseEther(String(wager)).toBigInt() as bigint;
//    // approve amount to spend 
//    await blockchainApi.approveERC20(tokenAddress, wagerAsBigint);
//    // once approved then update the isWagerSpentApproved
//  }
// )
function BTBSS(prices)
{
    max = 0;
    for (let i = 0; i <= prices.length-2; i++)
    {
        for(let j = i+1; j <= prices.length-1; j++)
        {
            let profit = prices[j]-prices[i];
            if (profit > max)
            {
                max = profit;
            }
        }
    }
    return max;
}

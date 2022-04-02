function roman2int(num)
{
    const definitions ={
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    };
    const special_cases = [4, 9, 40, 90, 400, 900];

    num = num.toUpperCase();
    let total = 0;
    for (let i=0; i < num.length; i++)
    {
        if (!((i + 1) >= num.length))
        {
            const x = definitions[num[i]];
            let subs = definitions[num[i+1]] - definitions[num[i]];
            if (special_cases.includes(subs))
            {
                i++;
                total = total + subs;
                continue;
            }
        }
        total = total + definitions[num[i]];
    }
    return total;
}
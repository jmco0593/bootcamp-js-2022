function happyNumber(number)
{
    let res = false;
    const iteration_limit = 1000;
    let i = 0;
    let total = 0;
    while(i <= iteration_limit)
    {
        total = 0;
        for(n of number.toString())
        {
            total = total + Math.pow(Number(n), 2);
            console.log()
        }
        if (total == 1)
        {
            res = true;
            break;
        }
        number = total;
        i++;

    }
    return res;
}
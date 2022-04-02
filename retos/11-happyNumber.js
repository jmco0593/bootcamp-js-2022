function happyNumber(number)
{
    let res = false;
    const iteration_limit = 1000;
    let i = 0;
    let total = 0;
    let repeated_numbers = [];
    while(i <= iteration_limit)
    {
        total = 0;
        for(n of number.toString())
        {
            total = total + Math.pow(Number(n), 2);
        }
        if (total == 1)
        {
            res = true;
            break;
        }
        if (repeated_numbers.includes(total)){break;}
        repeated_numbers.push(total);
        number = total;
        i++;

    }
    return res;
}

const test = 97;
console.log(happyNumber(test));
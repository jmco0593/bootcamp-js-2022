function ThreeSum(nums)
{
    let cnt_aux = 0;
    let validador = false;
    let res = [];
    for (let i in nums)
    {
        for (let j in nums)
        {
            for (let k in nums)
            {
                if (i != j && i != k && j != k)
                {
                    if ((nums[i] + nums[j] + nums[k]) == 0)
                    {
                        let actual =[nums[i], nums[j], nums[k]]

                        if (res.length > 0)
                        {
                            
                            for (let array of res)
                            {
                                for (let y=0;actual.length!=0;)
                                {
                                    for (let z=0;array.length1!=0;)
                                    {
                                        if (actual[y] == array[z])
                                        {
                                            actual.splice(y,1);
                                            array.splice(z,1);
                                            y = 0;
                                            z = 0;
                                            cnt_aux++;
                                        }
                                        z++;
                                    }
                                    y++;
                                }
                                
                            }
                        }
                        else
                        {
                            res.unshift(actual);
                        }
                    }
                }
            }
        }
    }
    return res;
}
//numeros = [-1,0,1,2,-1,-4];
//numeros = [0,0,0,0];
//numeros = [-1,0,1,0];
//numeros = [-1,0,1,2,-1,-4,-2,-3,3,0,4];
numeros = [0,3,0,1,1,-1,-5,-5,3,-3,-3,0];

let res = ThreeSum(numeros);

for (let r of res)
{
    console.log(r);
}

/*
function ThreeSum(nums)
{
    let res = [];
    for (let i in nums)
    {
        for (let j in nums)
        {
            for (let k in nums)
            {
                if (i != j && i != k && j != k)
                {
                    if ((nums[i] + nums[j] + nums[k]) == 0)
                    {
                        let cnt_i = 0;
                        let cnt_j = 0;
                        let cnt_k = 0;
                        let actual =[nums[i], nums[j], nums[k]]

                        if (res.length > 0)
                        {
                            for (array of res)
                            {
                                for (element of array)
                                {
                                    if (actual[0] === element)
                                    {
                                        cnt_i = 1;

                                    }
                                    if (actual[1] === element)
                                    {
                                        cnt_j = 1;

                                    }
                                    if (actual[2] === element)
                                    {
                                        cnt_k = 1;

                                    }
                                }
                            }
                            if (!(cnt_i == 1 && cnt_j == 1 && cnt_k == 1))
                            {
                                res.unshift(actual);
                            }
                        }
                        else
                        {
                            res.push(actual);
                        }
                    }
                }
            }
        }
    }
    return res;
}
*/
//numeros = [-1,0,1,2,-1,-4];
//numeros = [0,0,0,0];
//numeros = [-1,0,1,0];


/*
function ThreeSum(nums)
{
    let aux = [];
    let res = [];
    for (let i in nums)
    {
        for (let j in nums)
        {
            for (let k in nums)
            {
                if (i != j && i != k && j != k)
                {
                    if ((nums[i] + nums[j] + nums[k]) == 0)
                    {
                        let el1 = `${nums[i]}[${i}]`;
                        let el2 = `${nums[j]}[${j}]`;
                        let el3 = `${nums[k]}[${k}]`;
                        
                        let cnt_i = 0;
                        let cnt_j = 0;
                        let cnt_k = 0;

                        let actual_aux = [el1, el2, el3];
                        let actual =[nums[i], nums[j], nums[k]]

                        if (aux.length > 0)
                        {
                            
                            for (array of res)
                            {
                                for (element of array)
                                {
                                    if (actual[0] == element)
                                    {
                                        cnt_i = 1;

                                    }
                                    if (actual[1] == element)
                                    {
                                        cnt_j = 1;

                                    }
                                    if (actual[2] == element)
                                    {
                                        cnt_k = 1;

                                    }
                                }
                            }
                            if (!(cnt_i == 1 && cnt_j == 1 && cnt_k == 1))
                            {
                                if (!(actual[0] == res[0][0] && actual[1] == res[0][1] && actual[2] == res[0][2]))
                                {
                                    aux.unshift(actual_aux);
                                    res.unshift(actual);

                                }
                                
                            }
                        }
                        else
                        {
                            aux.push(actual_aux)
                            res.push(actual);
                        }
                    }
                }
            }
        }
    }
    return res;
}
*/


/*
let aux = [];
let res = [];
for (let i in nums)
{
    for (let j in nums)
    {
        for (let k in nums)
        {
            if (i != j && i != k && j != k)
            {
                if (nums[i] + nums[j] + nums[k] == 0)
                {
                    let el1 = `${nums[i]}[${i}]`;
                    let el2 = `${nums[j]}[${j}]`;
                    let el3 = `${nums[k]}[${k}]`;
                    
                    let cnt_i = 0;
                    let cnt_j = 0;
                    let cnt_k = 0;

                    if (aux.length > 0)
                    {
                        actual = [el1, el2, el3];
                        for (array of aux)
                        {
                            for (element of array)
                            {
                                if (actual[0] == element)
                                {
                                    cnt_i = 1;

                                }
                                if (actual[1] == element)
                                {
                                    cnt_j = 1;

                                }
                                if (actual[2] == element)
                                {
                                    cnt_k = 1;

                                }
                            }
                        }
                        if (!(cnt_i == 1 && cnt_j == 1 && cnt_k == 1))
                        {
                            aux.push([el1,el2,el3])
                            res.push([nums[i], nums[j], nums[k]]);
                        }
                    }
                    else
                    {
                        aux.push([el1,el2,el3])
                        res.push([nums[i], nums[j], nums[k]]);
                    }
                }
            }
        }
    }
}
return res;
*/
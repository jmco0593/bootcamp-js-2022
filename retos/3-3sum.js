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
                                cnt_aux = 0;
                                
                                for (let element of array)
                                {
                                    if (actual[0] == element)
                                    {
                                        cnt_aux++;

                                    }
                                    else if (actual[1] == element)
                                    {
                                        cnt_aux++;

                                    }
                                    else if (actual[2] == element)
                                    {
                                        cnt_aux++;

                                    }
                                }
                                if ((cnt_aux >= 3))
                                {
                                    validador = true;
                                    break;
                                }   
                            }
                            if (validador == false)
                            {
                                res.unshift(actual);
                            }
                            validador = false;
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
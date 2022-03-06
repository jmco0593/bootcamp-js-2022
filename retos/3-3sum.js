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
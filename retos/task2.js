function incrementar_uno(array)
{
    array[array.length-1] = array[array.length-1] + 1; 
    if (!(array[array.length-1] > 9))
    {
        return array;
    }
    for (let num = array.length - 1; num >= 0; num--)
    {
        
    }






    for (let num = array.length - 1; num >= 0; num--)
    {
        if (array[num] == 9)
        {
            array[num] = 0;
            array[num -1] = 1;  
        }
        if (num == array.length-1)
        {
            
        }
    }
    return array;
}

console.log(incrementar_uno([1,2,8]));

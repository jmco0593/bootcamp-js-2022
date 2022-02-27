function aux(number1,number2)
{
    let result = [];
    for (let letter_n1 of number1)
    {
        for (let letter_n2 of number2)
        {
            result.push(letter_n1+letter_n2);
        }
    }
    return result;
}

function return_letters(num)
{
    let val;
    if (num == 2)
    {
        val = "abc"
    }
    if (num == 3)
    {
        val = "def"
    }
    if (num == 4)
    {
        val = "ghi"
    }
    if (num == 5)
    {
        val = "jkl"
    }
    if (num == 6)
    {
        val = "mno"
    }
    if (num == 7)
    {
        val = "pqrs"
    }
    if (num == 8)
    {
        val = "tuv"
    }
    if (num == 9)
    {
        val = "wxyz"
    }
    return val;
}

function check_if_is_number(number)
{
    const allowed_numbers = [2,3,4,5,6,7,8,9];
    number = Number(number);
    return allowed_numbers.includes(number);

}

function numbers2letters(numbers)
{
    let answer = [];
    let letters_array = [];
    for (let number of numbers)
    {
        if (!(check_if_is_number(number)))
        {
            return "Error, please enter digits between 2-9";
        }
        letters_array.push(return_letters(number));
    }

    if (letters_array.length > 0)
    {

        if (letters_array.length == 1)
        {
            answer = letters_array;
        }
        else if (letters_array.length >= 2 && letters_array.length <= 4)
        {
            for (let number_pointer1 = 0; number_pointer1 <= letters_array.length -1; number_pointer1++)
            {
                
                for (let number_pointer2 = number_pointer1 + 1; number_pointer2 <= letters_array.length - 1; number_pointer2++)
                {
                    answer = answer.concat(aux(letters_array[number_pointer1], letters_array[number_pointer2]));
                }
            }
            
        }
        else
        {
            console.log("Please enter a number with maximium 4 digits");

        }
    }
    return answer;
}
console.log(numbers2letters("234"));
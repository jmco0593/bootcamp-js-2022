function ZigZag(word, numRows)
{
    function convert2Array(str,row)
    {
        let array = [];
        for (s of str)
        {
            array.push(s);
        }
        return array;
    }

    function set_empty_array()
    {
        let arr = [];
        for (let i=0;i<=numRows-1;i++)
        {
            arr.push(' ');
        }
        return arr;
    }

    function make_string(matrix)
    {
        let txt = "";
        let i = 0;
        while (i <= numRows-1)
        {
            for (arr of matrix)
            {
                if (arr[i] != ' ' && arr[i] != undefined)
                {
                    txt = txt + arr[i];
                }
            }
            i++;   
        }
        return txt;
    }

    let matrix = [];
    let pos_char = 0;
    let pos_row = 0;
    let array_aux = [];
    while (pos_char <= word.length-1)
    {
        if (pos_row == 0 || pos_row == 1)
        {
            matrix.push(convert2Array(word.slice(pos_char,pos_char + numRows)));
            pos_char = pos_char + numRows;
            pos_row = numRows-1;
        }
        else
        { 
            pos_row--;
            array_aux = set_empty_array();
            array_aux[pos_row] = word[pos_char];
            matrix.push(array_aux)
            pos_char = pos_char + 1;
        }
    }

    return make_string(matrix);

}
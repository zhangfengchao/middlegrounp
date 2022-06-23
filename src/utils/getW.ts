/**

计算columns总宽度，传入的格式为：coluums=[{width: ‘100px’}]，

width支持数字，如10， 23.3，字符串，如：“10px”, “23.3px”, 不支持其他形式的字符串

@export

@param {*} [columns=[]] 需要计算的columns

@param {number} [lastColWidth=0] 非必传，最后一列预留的宽度

@returns columns总宽度
*/

const calculateColumsWidthSum = (columns = [], lastColWidth = 0) => {
    const arrReducer = (accumulator: any, currentValue: any) => {
        if (!currentValue || !currentValue.width) {
            return accumulator;
        }

        let width = currentValue.width;
        if (typeof width === "string") {
            if (width.endsWith("px")) {
                width = parseFloat(width.split("px")[0]);
            } else {
                return accumulator;
            }
        } else if (typeof width === "number") {
            width = parseFloat(String(width));
        } else {
            return accumulator;
        }


        return accumulator + width;
    }
    console.log(arrReducer, "arrReducer");

    return columns.reduce(arrReducer, 0) + lastColWidth;

}

export default calculateColumsWidthSum

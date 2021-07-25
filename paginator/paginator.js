module.exports = class Paginator {
    static paginate(arr, amount) {
        var result = [];
        var a = 0;
        for (let i = 0; i < Math.ceil(arr.length / amount); i++) {
            result.push([]);
            for (let j = 0; j < amount; j++) {
                if (arr[a] == undefined) { break; }
                result[i][j] = arr[a];
                a++;
            }
        }
        return result;
    }
}
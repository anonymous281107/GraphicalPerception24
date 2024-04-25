// How to use:
// var conditions = ["A", "B", "C", "D"];
// balancedLatinSquare(conditions, 0)  //=> ["A", "B", "D", "C"]
// balancedLatinSquare(conditions, 1)  //=> ["B", "C", "A", "D"]
// balancedLatinSquare(conditions, 2)  //=> ["C", "D", "B", "A"]
// ...
export function balancedLatinSquare(array, participantId) {
    let result = [];
    // Based on "Bradley, J. V. Complete counterbalancing of immediate sequential effects in a Latin square design. J. Amer. Statist. Ass.,.1958, 53, 525-528. "
    for (var i = 0, j = 0, h = 0; i < array.length; ++i) {
        var val = 0;
        if (i < 2 || i % 2 != 0) {
            val = j++;
        } else {
            val = array.length - h - 1;
            ++h;
        }

        var idx = (val + participantId) % array.length;
        result.push(array[idx]);
    }

    if (array.length % 2 != 0 && participantId % 2 != 0) {
        result = result.reverse();
    }

    return result;
}
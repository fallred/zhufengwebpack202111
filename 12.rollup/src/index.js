

function one(paramA) {
    var a = 1;
    function two(paramB) {
        var b = 2;
        function three(paramC) {
            console.log(a, b);
        }
        three();
    }
    two();
    console.log('1');
}

function one() {
    console.log('2');
}
one();
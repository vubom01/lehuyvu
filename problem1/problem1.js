const sum_to_n_a = function (n) {
    return n * (n + 1) / 2
};

const sum_to_n_b = function (n) {
    if (n === 0) return 0;
    return n + sum_to_n_b(n - 1);
};

const sum_to_n_c = function (n) {
    let res = 0
    for (let i = 1; i <= n; i++) {
        res = res + i
    }
    return res
};

for (let i = 1; i <= 1000; i++) {
    if (sum_to_n_a(i) !== sum_to_n_b(i) || sum_to_n_a(i) !== sum_to_n_c(i) || sum_to_n_b(i) !== sum_to_n_c(i)) {
        console.log(false)
    }
}
console.log(true)
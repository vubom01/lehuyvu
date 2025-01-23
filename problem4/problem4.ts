// TC: O(1)
// SC: O(1)
function sum_to_n_a(n: number): number {
    return n * (n + 1) / 2;
}

// TC: O(n)
// SC: O(n)
function sum_to_n_b(n: number): number {
    if (n === 0) return 0;
    return n + sum_to_n_b(n - 1);
}

// TC: O(n)
// SC: O(1)
function sum_to_n_c(n: number): number {
    let res = 0
    for (let i = 1; i <= n; i++) {
        res = res + i
    }
    return res
}

for (let i = 1; i <= 1000; i++) {
    if (sum_to_n_a(i) !== sum_to_n_b(i) || sum_to_n_a(i) !== sum_to_n_c(i) || sum_to_n_b(i) !== sum_to_n_c(i)) {
        console.log(false)
    }
}
console.log(true)
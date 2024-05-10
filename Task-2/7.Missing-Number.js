function findMissing(arr, N) {
  let temp = [];
  for (let i = 0; i <= N; i++) {
    temp[i] = 0;
  }

  for (i = 0; i < N; i++) {
    temp[arr[i] - 1] = 1;
  }

  let result = 0;
  for (i = 0; i <= N; i++) {
    if (temp[i] == 0) result = i + 1;
  }
  console.log(result);
}

let arr = [1, 2, 3, 5];
let n = arr.length;

findMissing(arr, n);

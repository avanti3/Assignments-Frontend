function duplicates(arr) {
  let freq = new Map();
  let duplicate = [];

  arr.forEach((num) => {
    freq.set(num, (freq.get(num) || 0) + 1);
  });

  freq.forEach((value, key) => {
    if (value > 1) {
      duplicate.push(key);
    }
  });

  return duplicate;
}

let arr = [2, 3, 1, 2, 3];
let result = duplicates(arr);
if (result.length === 0) {
  console.log("No duplicates");
} else {
  console.log(result);
}

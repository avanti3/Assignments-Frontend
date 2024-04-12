function prime(number) {
  if (number < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

console.log(prime(3));
console.log(prime(97));
console.log(prime(13));
console.log(prime(30));

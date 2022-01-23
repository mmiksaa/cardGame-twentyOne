let array = ["a", "b", "c", "d", "d", "e", "a", "b", "c", "f", "g", "h", "h", "h", "e", "a"];
let count = {};

array.forEach(function (i) {
  count[i] = (count[i] || 0) + 1;

  if (count[i] === 3) {
    console.log(`повторился три раза ${i}`);
  }

});
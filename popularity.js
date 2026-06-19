// Popularity weighting for the random name picker.
// popularityTarget: center of the bell curve (1–100). Higher = favor popular names.
// popularityRange:  spread (sigma). Larger = wider mix; smaller = tighter focus.
let popularityTarget = 80;
let popularityRange  = 20;

function popScore(n) {
  var p = n.popularity;
  return (p != null && p > 0) ? p : 50;
}

function popularityWeight(n) {
  var diff = popScore(n) - popularityTarget;
  return Math.exp(-(diff * diff) / (2 * popularityRange * popularityRange));
}

function weightedRandom(arr) {
  var weights = arr.map(popularityWeight);
  var total = weights.reduce(function(s, w) { return s + w; }, 0);
  var r = Math.random() * total;
  for (var i = 0; i < arr.length; i++) {
    r -= weights[i];
    if (r <= 0) return arr[i];
  }
  return arr[arr.length - 1];
}

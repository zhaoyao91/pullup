function pickItOut (xs, y) {
  const ys = xs.filter(x => x !== y)
  return [
    ys.length < xs.length ? y : undefined,
    ys
  ]
}

module.exports = pickItOut

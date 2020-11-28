function decimals(value) {
  if (!value) return 0;
  return Math.round(value * 100) / 100;
}

module.exports = decimals;

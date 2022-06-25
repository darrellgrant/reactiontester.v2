function getScoreCount(time) {
  if (time <= 0.5) {
    return 10;
  }
  if (time <= 0.6) {
    return 8;
  }
  if (time <= 0.7) {
    return 6;
  }
  if (time <= 0.8) {
    return 3;
  }
  if (time <= 1.0) {
    return 1;
  }
  if (time <= 1.25) {
    return 0;
  }
  return -1;
}

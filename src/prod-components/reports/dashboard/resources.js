export const getMovingAverage = (data, windowSize) => {
  if (windowSize <= 0 || windowSize > data.length) {
    throw new Error('Invalid window size');
  }

  const result = [];

  for (let i = 0; i <= data.length - windowSize; i++) {
    const window = data.slice(i, i + windowSize);
    const average = window.reduce((sum, value) => sum + value, 0) / windowSize;
    result.push(average);
  }

  return result;
};

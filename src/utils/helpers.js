export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const getUniqueValues = (data, property) => {
  let values = data.map((item) => item[property]);
  if (property === 'colors') {
    values = values.flat();
  }
  return ['all', ...new Set(values)];
};

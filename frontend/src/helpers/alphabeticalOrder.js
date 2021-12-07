export const alphabeticalOrder = (array, campo) => {
  const sortArray = array.sort((a, b) =>
    a[campo] > b[campo] ? 1 : b[campo] > a[campo] ? -1 : 0
  );

  return sortArray;
};

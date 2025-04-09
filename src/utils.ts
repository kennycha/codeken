export const areStringArraysEqual = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1.toSorted();
  const sortedArr2 = arr2.toSorted();

  for (let i = 0; i < sortedArr1.length; i += 1) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
};

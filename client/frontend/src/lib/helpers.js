export const setLenghtCarrouselFunc = (array, number) => {
  if (array && array.length < number) {
    return array.length;
  } else {
    return number;
  }
}; 
export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.value > b.value) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

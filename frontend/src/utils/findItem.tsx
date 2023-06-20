const findItemByProperty = (
  list: any,
  propertyName: any,
  propertyValue: any
) => {
  return list.find((item: any) => item[propertyName] === propertyValue);
};
export default findItemByProperty;

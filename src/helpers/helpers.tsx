export const getNameInitials = (name: string): string => {
  const result: string[] = [];
  const namesArray = name.split(" ");

  if (namesArray.length === 1) {
    return namesArray[0][0].toUpperCase();
  }

  namesArray.forEach((oneName: string): void => {
    if (result.length === 2) return;
    result.push(oneName[0].toUpperCase());
  });
  return result.join(".");
};

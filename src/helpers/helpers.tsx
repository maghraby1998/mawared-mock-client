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

export const getRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const characterArr = characters.split("");

  let result = "";

  for (let i = 0; i < length; i++) {
    let randomChar =
      characterArr[Math.floor(Math.random() * characterArr.length)];
    result += randomChar;
  }

  return result;
};

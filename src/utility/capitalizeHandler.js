export const capitalizeHandler = (string) => {
  const splitString = string.split(" ")
  if (splitString.length > 1) {
    const capitalizedWords = splitString.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};

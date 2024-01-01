
const numbers = [
  "קרקע",
  "ראשונה",
  "שניה",
  "שלישית",
  "רביעית",
  "חמישית",
  "שישית",
  "שביעית",
  "שמינית",
  "תשיעית",
  "עשירית",
  "אחת עשרה",
  "שתים עשרה",
  "שלוש עשרה",
  "ארבע עשרה",
  "חמש עשרה",
  "שש עשרה",
  "שבע עשרה",
  "שמונה עשרה",
  "תשע עשרה",
  "עשרים",
  "עשרים ואחת",
  "עשרים ושתיים",
  "עשרים ושלוש",
  "עשרים וארבע",
  "עשרים וחמש",
  "עשרים ושש",
  "עשרים ושבע",
  "עשרים ושמונה",
  "עשרים ותשע",
  "שלושים",
  "שלושים ואחת",
  "שלושים ושתיים",
  "שלושים ושלוש",
  "שלושים וארבע",
  "שלושים וחמש",
  "שלושים ושש",
  "שלושים ושבע",
  "שלושים ושמונה",
  "שלושים ותשע",
  "ארבעים",
  "ארבעים ואחת",
  "ארבעים ושתיים",
  "ארבעים ושלוש",
  "ארבעים וארבע",
  "ארבעים וחמש",
  "ארבעים ושש",
  "ארבעים ושבע",
  "ארבעים ושמונה",
  "ארבעים ותשע",
  "חמישים",
]

function replaceNumber(stringNumber: string): string | number {
  const index = numbers.indexOf(stringNumber);
  const result = index !== -1 ? index : stringNumber;
  if (result === stringNumber) {
    console.log(result);
  }
  return result;
}

function notComma(str: string): boolean {
  return !str.includes(",");
}

function splitStr(str: string): string[] {
  return str.split(",");
}

function hasKoma(str: string): boolean {
  return str.includes("קומה");
}

function removeKomaAndSpace(str: string): string {
  return str.replace("קומה ", "");
}

function removeSpaces(str: string): string {
  return str.replace(/\s/g, '');
}

function hasVavAfterSpace(str: string): boolean {
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === " " && str[i + 1] === "ו") {
      return true;
    }
  }
  return false;
}

function separateWords(text: string): string[] {
  let wordsArray = text.split(" ");
  for (let i = 0; i < wordsArray.length; i++) {
    let temp = wordsArray[i].split("");
    if (temp[0] === "ו") {
      temp.shift();
      wordsArray[i] = temp.join("");
      if (i !== wordsArray.length - 1) {
        wordsArray[i] += " ";
      }
    }
  }
  return wordsArray;
}

export default function multiFloors(str: string): number | string  {
  if (notComma(str) && !hasKoma(str) && !hasVavAfterSpace(str)) {
    return replaceNumber(str);
  }
  if (hasKoma(str)) {
    const newStr = removeKomaAndSpace(str);
    return replaceNumber(newStr);
  }
  if (hasVavAfterSpace(str)) {
    const arr = separateWords(str);
    let newStr = '';
    for (let i = 0; i < arr.length - 1; i++) {
      const temp1 = replaceNumber(arr[i]);
      newStr += temp1 + ',';
    }
    const temp1 = replaceNumber(arr[arr.length - 1]);
    newStr += temp1;
    return newStr;
  } else {
    const arr = splitStr(str);
    let newStr = '';
    for (let i = 0; i < arr.length - 1; i++) {
      const temp = removeSpaces(arr[i]);
      const temp1 = replaceNumber(temp);
      newStr += temp1 + ',';
    }
    const temp = removeSpaces(arr[arr.length - 1]);
    const temp1 = replaceNumber(temp);
    newStr += temp1;
    return newStr;
  }
}

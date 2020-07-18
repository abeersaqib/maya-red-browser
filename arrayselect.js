//Given two elements of certain selector, select the whole array of similar elements
//Sample for page : https://www.amazon.in/s?k=Phone

// Finds first difference in position
function findFirstDiffPos(a, b) {
  var shorterLength = Math.min(a.length, b.length);

  for (var i = 0; i < shorterLength; i++) {
    if (a[i] !== b[i]) return i;
  }

  if (a.length !== b.length) return shorterLength;

  return -1;
}

let elem1 =
  "#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(2) > div > span > div > div > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(2) > div.sg-col-4-of-24.sg-col-4-of-12.sg-col-4-of-36.sg-col-4-of-28.sg-col-4-of-16.sg-col.sg-col-4-of-20.sg-col-4-of-32 > div > div.a-section.a-spacing-none.a-spacing-top-small > div.a-row.a-size-base.a-color-base > div > a > span:nth-child(1) > span:nth-child(2) > span.a-price-whole";

let elem2 =
  "#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(n) > div > span > div > div > div > div > div:nth-child(4) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(2) > div.sg-col-4-of-24.sg-col-4-of-12.sg-col-4-of-36.sg-col-4-of-28.sg-col-4-of-16.sg-col.sg-col-4-of-20.sg-col-4-of-32 > div > div.a-section.a-spacing-none.a-spacing-top-small > div.a-row.a-size-base.a-color-base > div > a > span:nth-child(1) > span:nth-child(2) > span.a-price-whole";

// Replaces div:nth-child(2) at position 281 with div:nth-child(n)
function replaceAt(str, index, replacement) {
  return (
    str.substr(0, index) + replacement + str.substr(index + replacement.length)
  );
}

//Returns arrays of elements selected. use elem[0].textContent to extract values
function getAllValues(elemA, elemB) {
  var nPos = findFirstDiffPos(elemA, elemB);
  let elements = document.querySelectorAll(replaceAt(elemA, nPos, "n"));
  return elements;
}

const input = document
  .getElementsByTagName("pre")[0]
  .innerText.trim()
  .split("\n");
// const input = "30373\n25512\n65332\n33549\n35390".split("\n");
let arr = [];
input.forEach((line, index) => {
  arr[index] = Array.from(line);
});

const checkDirection = (d, x, y) => {
  let current = arr[x][y];
  if (d == "up") {
    let step = 1;
    while (parseInt(arr[x - step][y]) < parseInt(current)) {
      if (x - step == 0) return true;
      step++;
    }
  } else if (d == "down") {
    let step = 1;
    while (parseInt(arr[x - 0 + step][y]) < parseInt(current)) {
      if (x + step == arr.length - 1) return true;
      step++;
    }
  } else if (d == "left") {
    let step = 1;
    while (parseInt(arr[x][y - step]) < parseInt(current)) {
      if (y - step == 0) return true;
      step++;
    }
  } else if (d == "right") {
    let step = 1;
    while (parseInt(arr[x][y - 0 + step]) < parseInt(current)) {
      if (y - 0 + step == arr.length - 1) return true;
      step++;
    }
  }
  return false;
};

const checkDirectionScore = (d, x, y) => {
  let current = arr[x][y];
  if (d == "up") {
    let step = 1;
    while (parseInt(arr[x - step][y]) < parseInt(current)) {
      if (x - step == 0) return step;
      step++;
    }
    return step;
  } else if (d == "down") {
    let step = 1;
    while (parseInt(arr[x - 0 + step][y]) < parseInt(current)) {
      if (x + step == arr.length - 1) return step;
      step++;
    }
    return step;
  } else if (d == "left") {
    let step = 1;
    while (parseInt(arr[x][y - step]) < parseInt(current)) {
      if (y - step == 0) return step;
      step++;
    }
    return step;
  } else if (d == "right") {
    let step = 1;
    while (parseInt(arr[x][y - 0 + step]) < parseInt(current)) {
      if (y - 0 + step == arr.length - 1) return step;
      step++;
    }
    return step;
  }
  return false;
};
let score = 0;
let visible = arr[0].length * 2 + arr.length * 2 - 4;
// console.log(visible)
for (let i = 1; i < arr.length - 1; i++) {
  for (let j = 1; j < arr[0].length - 1; j++) {
    let current = parseInt(arr[i][j]);
    let up = parseInt(arr[i - 1][j]);
    let down = parseInt(arr[i + 1][j]);
    let left = parseInt(arr[i][j - 1]);
    let right = parseInt(arr[i][j + 1]);

    if (
      checkDirection("up", i, j) ||
      checkDirection("down", i, j) ||
      checkDirection("left", i, j) ||
      checkDirection("right", i, j)
    ) {
      visible++;
    }

    let tmpScore =
      checkDirectionScore("up", i, j) *
      checkDirectionScore("down", i, j) *
      checkDirectionScore("left", i, j) *
      checkDirectionScore("right", i, j);
    score = Math.max(tmpScore, score);
  }
}

console.log("p2", score);
console.log("p1", visible);

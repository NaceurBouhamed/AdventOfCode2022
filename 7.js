const input = document
  .getElementsByTagName("pre")[0]
  .innerText.trim()
  .split("\n");
class Node {
  constructor(isD, name, size, childs) {
    this.isD = isD;
    this.name = name;
    this.size = size;
    this.childs = childs;
  }
}
let nodes = [];
let currentDir = "";
let currentNode = {};
let path = "";
input.forEach((line) => {
  if (line[0] == "$") {
    // command
    if (line[2] == "c") {
      // switching directory
      currentDir = line.split(" ")[2];
      if (currentDir == "..") {
        let p = path.split("/");
        p.pop();
        path = p.join("/");
      } else {
        path = (path + "/" + currentDir).replaceAll("//", "/");
      }
    } else if (line[2] == "l") {
      nodes.push(new Node(true, path, 0, []));
      currentNode = nodes[nodes["length"] - 1];
    }
  } else {
    if (line[0] == "d") {
      let dName = line.split(" ")[1];
      currentNode.childs.push(
        new Node(true, (path + "/" + dName).replaceAll("//", "/"), 0, [])
      );
    } else {
      // reading file
      currentNode.size += parseInt(line.split(" ")[0]);
    }
  }
});

const computeSize = (node) => {
  let total = parseInt(node.size);
  if (node.childs.length == 0) {
    return total;
  } else {
    node.childs.forEach((n) => {
      let found = nodes.filter((el) => el.name === n.name)[0]; // node
      total += parseInt(computeSize(found));
    });
    return total;
  }
};

nodes.forEach((e) => (e.size = computeSize(e)));

sum = 0;
nodes.forEach((e) => {
  if (e.size <= 100000) sum += parseInt(e.size);
});
console.log(sum);

let candidate = nodes[0].size;
const FREE_SPACE = 70000000 - nodes[0].size; // biggest is root
nodes.forEach((e) => {
  if (parseInt(e.size) + parseInt(FREE_SPACE) >= 30000000)
  candidate = Math.min(e.size,candidate);
});
console.log(candidate);

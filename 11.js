  const input = document
    .getElementsByTagName("pre")[0]
    .innerHTML.trim()
    .split("\n");
  let monkeys = [];
  let j = 0;
  for (let i = 0; i < 55; i += 7) {
    const monkey = {
      items: input[i + 1]
        .split(":")[1]
        .trim()
        .split(",")
        .map((e) => parseInt(e.replaceAll(" ", ""))),
      op: input[i + 2].includes("+") ? "+" : "*",
      opValue: parseInt(`${input[i + 2].charAt(input[i + 2].length - 2)}${input[i + 2].charAt(input[i + 2].length - 1)}`.trim()),
      divider: input[i + 3].split("by ")[1] - 0,
      iftrue: input[i + 4].split("monkey ")[1] - 0,
      iffalse: input[i + 5].split("monkey ")[1] - 0,
      inspected: 0,
    };
    monkeys[j] = monkey;
    j++;
  }
  for (let i = 0; i < 10000; i++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length) {
        const inspection = monkey.items.shift();
        let worryLevel = inspection;
        if (monkey.op === "+") {
          if (monkey.opValue) {
            worryLevel += monkey.opValue;
          } else {
            worryLevel += worryLevel;
          }
        } else if (monkey.op === "*") {
          if (monkey.opValue) {
            worryLevel *= monkey.opValue;
          } else {
            worryLevel *= worryLevel;
          }
        }
        // worryLevel = Math.floor(worryLevel / 3);
        worryLevel = worryLevel % 9699690 
        if (worryLevel % monkey.divider === 0) {
          monkeys[monkey.iftrue].items.push(worryLevel);
        } else {
          monkeys[monkey.iffalse].items.push(worryLevel);
        }
        monkey.inspected++;
      }
    });
  }

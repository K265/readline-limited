import { readline } from "./index";

test("test", (done) => {
  const rl = readline("r:/test.txt", 1024);
  let num = 0;
  rl.on("line", (line) => {
    num += 1;
    if (num === 9) {
      rl.close();
    }
    console.log(`${num}: ${line}`);
  });
  rl.on("error", done);
  rl.on("close", () => {
    done();
  });
});

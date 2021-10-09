import { readline } from "./index";

test("test", (done) => {
  const rl = readline("r:/test.txt", 1048561);
  rl.on("line", (line) => {
    console.log(line);
  });
  rl.on("error", done);
  rl.on("close", () => {
    done();
  });
});

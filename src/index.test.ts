import { readline } from "./index";

test("test", (done) => {
  const rl = readline("r:/test.txt", 4, "utf-8");
  rl.on("line", console.log);
  rl.on("error", done);
  rl.on("close", () => {
    done();
  });
});

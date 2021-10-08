import { EventEmitter } from "events";
import fs from "fs";

export interface IReadline {
  on(event: "error", listener: (err: Error) => void): this;
  on(event: "line", listener: (input: string) => void): this;
  on(event: "close", listener: () => void): this;
  on(event: "pause", listener: () => void): this;
  on(event: "resume", listener: () => void): this;
  close(): void;
}

export class Readline implements IReadline {
  ev = new EventEmitter();
  inputStream: fs.ReadStream;

  constructor(
    p: string,
    maxCharsPerLine: number,
    encoding: BufferEncoding = "ascii"
  ) {
    this.inputStream = fs.createReadStream(p, {
      encoding,
      highWaterMark: maxCharsPerLine,
    });
    let remain = "";
    this.inputStream.on("data", (data1) => {
      const data = `${remain}${data1}`;
      if (!data.includes("\n")) {
        remain = data;
        if (remain.length >= maxCharsPerLine) {
          this.ev.emit(
            "error",
            new Error(`can't find line separator in ${maxCharsPerLine} chars`)
          );
          this.inputStream.close();
        }
        return;
      }

      let lastFound = 0;
      for (let i = 0; i < data.length; i += 1) {
        if (data[i] === "\n") {
          this.ev.emit("line", data.substring(lastFound, i));
          lastFound = i + 1;
        }
      }

      remain = data.substring(lastFound);
    });

    this.inputStream.on("error", (e) => this.ev.emit("error", e));
    this.inputStream.on("close", () => {
      if (remain) {
        this.ev.emit("line", remain);
      }

      this.ev.emit("close");
    });
    this.ev.on("close", () => this.inputStream.close());
  }

  close() {
    this.inputStream.close();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    this.ev.on(event, listener);
    return this;
  }
}

export const readline = (
  p: string,
  maxCharsPerLine: number,
  encoding: BufferEncoding = "ascii"
): IReadline => new Readline(p, maxCharsPerLine, encoding);

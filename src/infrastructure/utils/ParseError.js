export class ParseError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

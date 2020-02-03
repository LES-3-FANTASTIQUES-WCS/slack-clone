class UnknownError extends Error {
  constructor(...params) {
    super(...params);
    this.isUnknown = true;
  }
}

module.exports = { UnknownError };

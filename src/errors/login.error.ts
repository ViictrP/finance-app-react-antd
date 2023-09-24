const MESSAGE = 'Verifique seu e-mail e senha.'

export class LoginError extends Error {
  constructor() {
    super(MESSAGE);
  }
}

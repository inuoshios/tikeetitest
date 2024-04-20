export abstract class CustomException extends Error {
  constructor(public message: string, public code: number) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

export class NotFoundException extends CustomException {
  constructor(message: string) {
    super(message, 404);
  }
}

export class BadRequestException extends CustomException {
  constructor(message: string) {
    super(message, 400);
  }
}


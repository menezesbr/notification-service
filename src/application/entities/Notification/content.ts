export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateContantLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validateContantLength(content)

    if (!isContentLengthValid) {
      throw new Error('Content length error.')
    }
    this.content = content;
  }
}

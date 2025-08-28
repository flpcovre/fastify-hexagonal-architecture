export class AttachmentPath {
  private constructor(private readonly value: string) {}

  public static create(id: string, ext: string): AttachmentPath {
    return new AttachmentPath(`/attachments/${id}.${ext}`);
  }

  public toString(): string {
    return this.value;
  }
}
export class OfficialPhoneNumberId {
  public readonly value: string;

  constructor() {
    if (!process.env.OFFICIAL_PHONE_NUMBER_ID) {
      throw new Error('Missing environment variable: OFFICIAL_PHONE_NUMBER_ID');
    }

    this.value = process.env.OFFICIAL_PHONE_NUMBER_ID;
  }
}
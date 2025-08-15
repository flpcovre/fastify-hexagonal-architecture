export class OfficialAccessToken {
  public readonly value: string;

  constructor() {
    if (!process.env.OFFICIAL_ACCESS_TOKEN) {
      throw new Error('Missing environment variable: OFFICIAL_ACCESS_TOKEN');
    }

    this.value = process.env.OFFICIAL_ACCESS_TOKEN;
  }
}
export function calculateExpirationDate(now: Date, expiresIn: string | number): Date {
  if (typeof expiresIn === 'number') {
    return new Date(now.getTime() + expiresIn * 1000);
  }

  const timeString = expiresIn.toString();

  const timeRegex = /^(\d+)([smhd])$/;
  const match = timeString.match(timeRegex);

  if (match) {
    const [, timeValue, timeUnit] = match;
    const value = parseInt(timeValue);

    switch (timeUnit) {
    case 's':
      return new Date(now.getTime() + value * 1000);
    case 'm':
      return new Date(now.getTime() + value * 60 * 1000);
    case 'h':
      return new Date(now.getTime() + value * 60 * 60 * 1000);
    case 'd':
      return new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
    default:
      break;
    }
  }

  try {
    const parsedDate = new Date(timeString);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  } catch {
    // Ignora erros de parsing
  }

  // Fallback para 24h se não conseguir interpretar
  return new Date(now.getTime() + 24 * 60 * 60 * 1000);
}
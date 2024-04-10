export function addLeadingZero(number: number | string) {
  return number.toString().padStart(2, '0');
}

export function convertDate(isoDate: string, withTime = true) {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  const day = addLeadingZero(date.getUTCDate());
  const month = addLeadingZero(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const formattedDate = `${day}.${month}.${year}`;
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;

  if (!withTime) return formattedDate;

  return `${formattedDate} ${formattedTime}`;
}

export function returnFilledProperties(obj: { [key: string]: any }) {
  const res: any = {};

  Object.keys(obj).forEach(key => {
    const currentProperty = obj[key];
    if (typeof currentProperty === 'string' && currentProperty.trim().length) {
      res[key] = currentProperty;
    } else if (currentProperty) {
      res[key] = currentProperty;
    }
  });

  return res;
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  key: K | K[],
) {
  if (!obj) return {};

  const result: Partial<T> = {};

  if (Array.isArray(key)) {
    key.forEach(k => {
      result[k] = obj[k];
    });
  } else {
    result[key] = obj[key];
  }

  return result;
}

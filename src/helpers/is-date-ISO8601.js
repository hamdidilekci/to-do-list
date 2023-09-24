export default function isCustomISO8601(datetimeLocalValue) {
  // Regular expression to match the custom ISO 8601 format
  const iso8601Pattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;

  // Check if the input matches the pattern
  const match = datetimeLocalValue.match(iso8601Pattern);

  if (!match) {
    return false; // Does not match the pattern
  }

  // Extract the captured groups
  const year = parseInt(match[1]);
  const month = parseInt(match[2]);
  const day = parseInt(match[3]);
  const hour = parseInt(match[4]);
  const minute = parseInt(match[5]);

  // Check the validity of the extracted values
  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return false; // Invalid values
  }

  // If all checks pass, the input is considered valid
  return true;
}

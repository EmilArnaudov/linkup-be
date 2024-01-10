export function isSessionLive(
  startTimestamp: number,
  endTimestamp: number
): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= startTimestamp && currentTime <= endTimestamp;
}

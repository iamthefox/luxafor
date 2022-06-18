export type WaveKey = keyof typeof waves;
export type WaveType = typeof waves[WaveKey];

export const waves = {
  short: 0x01,
  long: 0x02,
  shortOverlapping: 0x03,
  longOverlapping: 0x04,
};

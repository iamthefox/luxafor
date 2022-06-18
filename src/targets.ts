export type TargetKey = keyof typeof targets;
export type TargetValue = typeof targets[TargetKey];

export const targets = {
  all: 0xff,
  top: 0x41,
  bottom: 0x42,
  one: 0x01,
  two: 0x02,
  three: 0x03,
  four: 0x04,
  five: 0x05,
  six: 0x06,
};

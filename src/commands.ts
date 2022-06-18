export type CommandKey = keyof typeof commands;
export type CommandValue = typeof commands[CommandKey];

export const commands = {
  color: 0x01,
  fadeTo: 0x02,
  flash: 0x03,
  wave: 0x04,
  police: 0x06,
  rainbow: 0x06,
};

import * as os from "os";
import { HID } from "node-hid";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { commands } from "./commands";

import type { AnyColor, RgbaColor } from "colord";
import type { HID as HIDDevice } from "node-hid";
import type { TargetValue } from "./targets";
import type { CommandValue } from "./commands";
import { DEVICE_PID, DEVICE_VID } from "./constants";
import { targets } from "./targets";

// extend colord with names plugin, so we can parse natural language colors like "red"
extend([namesPlugin]);

export class Device {
  private readonly device: HIDDevice | null;

  constructor(device: HIDDevice) {
    this.device = device;
    this.device.pause();
  }

  /**
   * Change color to given color
   */
  public color(color: AnyColor, target: TargetValue = targets.all) {
    this.write(commands.color, target, color, [0x00, 0x00, 0x00]);
  }

  /**
   * Gradually change color with a given speed
   */
  public fadeTo(
    color: AnyColor,
    speed: number = 20,
    target: TargetValue = targets.all
  ) {
    this.write(commands.fadeTo, target, color, [speed, 0x00, 0x00]);
  }

  /**
   * Flash given color and return to previous state
   */
  public flash(
    color: AnyColor,
    speed: number = 20,
    repeat: number = 5,
    target: TargetValue = targets.all
  ) {
    this.write(commands.flash, target, color, [speed, 0x00, repeat]);
  }

  /**
   * Start a coloured wave and return to previous state
   */
  public wave(
    color: AnyColor,
    type: number = 0x01,
    speed: number = 5,
    repeat: number = 5
  ) {
    this.write(commands.wave, type, color, [0x00, repeat, speed]);
  }

  /**
   * Start a police pattern
   */
  public police(repeat: number = 5) {
    this.writeRaw([commands.police, 0x05, repeat]);
  }

  /**
   * Start a rainbow pattern
   */
  public rainbow(repeat: number = 5) {
    this.writeRaw([commands.police, 0x08, repeat]);
  }

  /**
   * Turn off all the LEDs
   */
  public off() {
    this.color("#000");
  }

  private write(
    command: CommandValue,
    target: TargetValue,
    color: AnyColor,
    options: number[] = []
  ): void {
    const { r, g, b } = this.parseColor(color);
    const data = [command, target, r, g, b, ...options];

    this.writeRaw(data);
  }

  private writeRaw(data: number[]) {
    if (os.platform() === "win32") {
      data.unshift(0);
    }

    if (!this.device) {
      throw new Error("No device available");
    }

    this.device.resume();
    this.device.write(data);
    this.device.pause();
  }

  private parseColor(color: AnyColor): RgbaColor {
    return colord(color).toRgb();
  }
}

export const device = () => {
  return new Device(new HID(DEVICE_VID, DEVICE_PID));
};

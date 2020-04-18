import os from "os";
import hex2rgb from "hex-rgb";
import colors from "color-name";
import { WAVE_SHORT } from "./util/constants";

class Device {
  constructor(hidDevice) {
    this._hidDevice = hidDevice;
    this._hidDevice.pause();
  }

  /**
   * Set device color
   * @param color string
   * @param target Number
   */
  color(color, target = 0xff) {
    this._write(0x01, target, color, [0x00, 0x00, 0x00]);
  }

  /**
   * Fade to color
   * @param color string
   * @param target Number
   * @param speed Number
   */
  fadeTo(color, speed = 20, target = 0xff) {
    this._write(0x02, target, color, [speed, 0x00, 0x00]);
  }

  /**
   * Flash color given number of times
   * @param color string
   * @param target Number
   * @param speed Number
   * @param repeat Number
   */
  flash(color, speed = 20, repeat = 5, target = 0xff) {
    this._write(0x03, target, color, [speed, 0x00, repeat]);
  }

  /**
   * Start a wave with a given parameters
   * @param color
   * @param type
   * @param speed
   * @param repeat
   */
  wave(color, type = WAVE_SHORT, speed = 5, repeat = 5) {
    this._write(0x04, type, color, [0x00, repeat, speed]);
  }

  /**
   * Start a police pattern
   * @param repeat
   */
  police(repeat = 5) {
    this._writeRaw([0x06, 0x05, repeat]);
  }

  /**
   * Start a rainbow pattern
   * @param repeat
   */
  rainbow(repeat = 5) {
    this._writeRaw([0x06, 0x08, repeat]);
  }

  /**
   * Turn off all the LEDs
   */
  off() {
    this.color("#000");
  }

  _resolveColor(color) {
    if (color && color.startsWith("#")) {
      return hex2rgb(color);
    }

    if (color && colors[color]) {
      return {
        red: colors[color][0],
        green: colors[color][1],
        blue: colors[color][2],
      };
    }

    return { red: 0x00, green: 0x00, blue: 0x00 };
  }

  _write(command, target, color, options = []) {
    const { red, green, blue } = this._resolveColor(color);

    const data = [command, target, red, green, blue, ...options];

    this._writeRaw(data);
  }

  _writeRaw(data) {
    if (os.platform() === "win32") {
      data.unshift(0);
    }

    this._hidDevice.resume();
    this._hidDevice.write(data);
    this._hidDevice.pause();
  }
}

export default Device;

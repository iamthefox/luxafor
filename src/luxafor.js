"use strict";
const HID = require('node-hid');
const hex2rgb = require('hex-rgb');

class Luxafor {

  constructor() {
    this.device;
    this.options = {
      pid: 0xf372,
      vid: 0x04d8
    };

    // try to open usb device, log the error on failure
    try {
      this.device = new HID.HID(this.options.vid,this.options.pid);
    }
    catch (e) {
      console.log(e);
    }
  }

  /**
   * Write data to usb device
   *
   * @param data
   */
  write(data) {
    if(!this.device) {
      return false;
    }

    try {
      this.device.write(data);
    }
    catch (e) {
      console.log(e);
    }

  }

  /**
   * Set the color
   * @param led {String} 'both' for both sides of the device
   *               'top' for tab side
   *               'bottom' for backside
   *               numbers 1 to 6 to represent single leds
   * @param color hex color
   */
  setColor(led, color) {
    const rgb = hex2rgb(color);
    this.write([1,this.getLedType(led), rgb[0], rgb[1], rgb[2]]);
  }

  /**
   * Fade from current color to a new one
   *
   * @param led {String} 'both' for both sides of the device
   *                     'top' for tab side
   *                     'bottom' for backside
   *                     numbers 1-6 to represent single led
   * @param color        hex color
   * @param speed        0-255 number representing transition speed
   */
  fadeTo(led, color, speed) {
    const rgb = hex2rgb(color);
    this.write([2,this.getLedType(led), rgb[0], rgb[1], rgb[2], speed]);
  }

  /**
   * Blink new color for a specified amount of times with certain speed and return to previous state
   *
   * @param led {String} 'both' for both sides of the device
   *                     'top' for tab side
   *                     'bottom' for backside
   *                     numbers 1-6 to represent single led
   * @param color        hex color
   * @param speed        0-255 number representing transition speed
   * @param repeat       0-255 number of times we going to repeat
   */
  flash(led, color, speed, repeat) {
    const rgb = hex2rgb(color);
    this.write([3,this.getLedType(led), rgb[0], rgb[1], rgb[2], speed, 0, repeat]);
  }

  /**
   * Wave new color through all leds for certain amount of types and then return to previous state
   *
   * @param type
   * @param color
   * @param speed
   * @param repeat
   */
  wave(type, color, speed, repeat) {
    const rgb = hex2rgb(color);
    this.write([4,this.getWaveType(type), rgb[0], rgb[1], rgb[2], 0, repeat, speed]);
  }

  /**
   * Get wave type based on human readable string
   *
   * @param type
   * @returns {number}
   */
  getWaveType(type) {
    let wave = 0;
    switch (type) {
      case 'singleSmall':
        wave = 1;
        break;
      case 'singleLarge':
        wave = 2;
        break;
      case 'doubleSmall':
        wave = 3;
        break;
      case 'doubleLarge':
        wave = 4;
        break;
    }

    return wave;
  }

  /**
   * Get led(s) hex number based on string input
   *
   * @param string
   * @returns {number}
   */
  getLedType(string) {
    let led = 0;

    switch(string) {
      case 'both':
        led = 0xFF; // both sides
        break;
      case 'top': // tab side
        led = 0x41;
        break;
      case 'bottom':  // back side
        led = 0x42;
        break;
      case 1:
        led = 0x01;
        break;
      case 2:
        led = 0x02;
        break;
      case 3:
        led = 0x03;
        break;
      case 4:
        led = 0x04;
        break;
      case 5:
        led = 0x05;
        break;
      case 5:
        led = 0x01;
        break;
    }

    return led;
  }

}

module.exports = Luxafor;
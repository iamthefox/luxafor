'use strict';

const HID = require('node-hid');
const hex2rgb = require('hex-rgb');
const constants = require('./constants');

const COMMAND_SETCOLOR = 'COMMAND_SETCOLOR';
const COMMAND_FADETO = 'COMMAND_FADETO';
const COMMAND_FLASH = 'COMMAND_FLASH';
const COMMAND_WAVE = 'COMMAND_WAVE';

function Luxafor(opts) {

    this.device = null;

    // default options
    this.opts = Object.assign({
        // device id
        pid: 0xf372,
        vid: 0x04d8,

        // default settings
        defaults: {
            setColor: {
                target: 0xFF
            },
            fadeTo: {
                target: 0xFF,
                speed: 20
            },
            flash: {
                target: 0xFF,
                speed: 180,
                repeat: 5
            },
            wave: {
                type: 2,
                speed: 90,
                repeat: 5
            }
        }
    }, opts);

    // trying to initialize our device
    try {
        this.device = new HID.HID(this.opts.vid, this.opts.pid);
        // pause until next command
        this.device.pause();
    }
    catch (e) {
        this.device = new Error(e);
    }

    /**
     * Write data to hid device
     * @param data
     */
    this.write = function (data) {
        if (this.device instanceof Error || this.device === null) {
            return new Error('Device is not connected.')
        }
        try {
            this.device.resume();
            this.device.write(data);
            this.device.pause();
        }
        catch (e) {
            return new Error(e)
        }
        // if everything went fine, returning true
        return true;
    };

    /**
     * Converts color from hex to rgb array
     *
     * @param color hex color in the format of #ffffff
     */
    this.parseColor = function (color) {
        return hex2rgb(color);
    };

    /**
     * Issue command and write it onto hid device
     *
     * @param color
     * @param options
     */
    this.issueCommand = function (command, target, color, options) {
        // if there are no options, treat is as an empty array
        options = typeof options !== 'undefined' ? options : [];

        // converting hex to rgb array
        const rgb = this.parseColor(color);

        // writing data
        return this.write([this.getCommand(command), target, rgb[0], rgb[1], rgb[2]].concat(options));
    }

    /**
     * Get command constant by name
     * @param command
     */
    this.getCommand = function (command) {
        return constants.commands[command];
    }
}

/**
 * Set given color for given target
 *
 * @param color hex color
 * @param target target led
 */
Luxafor.prototype.setColor = function (color, target) {
    // if target is not defined, we assume that we want to change the color of all leds
    target = typeof target !== 'undefined' ? target : this.opts.defaults.setColor.target;

    return this.issueCommand(COMMAND_SETCOLOR, target, color);
};

/**
 * Fade current color to given color for target specified
 * @param color hex color
 * @param target
 * @param speed  integer value from 0 to 255, 0 is the quickest, 255 is the slowest
 */
Luxafor.prototype.fadeTo = function (color, target, speed) {
    // if target is not defined, we assume that we want to change the color of all leds
    target = typeof target !== 'undefined' ? target : this.opts.defaults.fadeTo.target;

    // specify default speed if not provided
    speed = typeof speed !== 'undefined' ? speed : this.opts.defaults.fadeTo.speed;

    return this.issueCommand(COMMAND_FADETO, target, color, [speed]);
};

/**
 * Blink/flash color
 *
 * @param color
 * @param target
 * @param speed
 * @param repeat
 */
Luxafor.prototype.flash = function (color, target, speed, repeat) {
    // if target is not defined, we assume that we want to change the color of all leds
    target = typeof target !== 'undefined' ? target : this.opts.defaults.flash.target;

    // specify default speed if not provided
    speed = typeof speed !== 'undefined' ? speed : this.opts.defaults.flash.speed;

    // specify default speed if not provided
    repeat = typeof repeat !== 'undefined' ? repeat : this.opts.defaults.flash.repeat;

    return this.issueCommand(COMMAND_FLASH, target, color, [speed, 0, repeat]);
};

/**
 * Wave color through all the leds
 * @param color
 * @param type
 * @param speed
 * @param repeat
 */
Luxafor.prototype.wave = function (color, type, speed, repeat) {
    // defining default wave type if not specified
    type = typeof type !== 'undefined' ? type : this.opts.defaults.wave.type;

    // specify default speed if not provided
    speed = typeof speed !== 'undefined' ? speed : this.opts.defaults.wave.speed;

    // specify default speed if not provided
    repeat = typeof repeat !== 'undefined' ? repeat : this.opts.defaults.wave.repeat;

    return this.issueCommand(COMMAND_WAVE, type, color, [0, repeat, speed]);
};

/**
 * Turn off all the leds
 */
Luxafor.prototype.off = function () {
    return this.setColor('#000');
};

/**
 * Return available targets
 *
 * @returns {*}
 */
Luxafor.prototype.getTargets = function () {
    return constants.targets;
};

/**
 * Return available targets
 *
 * @returns {*}
 */
Luxafor.prototype.getWaveTypes = function () {
    return constants.waveTypes;
};

module.exports = Luxafor;
# Luxafor

A simple library to control your Luxafor device via node.js

## About Luxafor

Luxafor is an LED indicator that connects to your computer through a USB port 
or via Bluetooth, and shows your availability or notifies you about important 
information, like incoming emails or calendar reminders.

Its Hardware Api is open, allowing developers to control the device through
their own applications.

You can go to http://luxafor.com/ to get more information about it.

## Installation
```
npm install luxafor-api --save
```

## Usage 
```
const Luxafor = require('luxafor-api');

// api call to change the color
let opts = {
    defaults: {
        wave: {
            type: 2,
            speed: 90,
            repeat: 5
        }
    }
};
device = new Luxafor(opts);
device.setColor('#fff');
```

## Target LEDs
Led | Code
--- | :---:
all | 0xFF
top row | 0x41
bottom row | 0x42
led #1-6 | 0x01 - 0x06




## API

### setColor(color, target)
Set target led's color. When target is not provided it assumes we want to change color for all leds.

### fadeTo(color, target, speed = 20)

Similar to setColor, the only difference it will transition smoothly from previous color to the one specified.

speed is a number 0-255 that represents the speed of the transition, 0 is the quickest 255 is the slowest.

### flash(color, target, speed = 180, repeat = 5)
Flash color for an amount of times specified in repeat parameter.

speed 0 to 255 number determines delay between each blink

repeat 0 to 255 number amount of times to blink before returning to previous state

### wave(color, type = 2, speed = 90, repeat = 5)
Starts a wave that goes through all the leds with the pattern specified in type variable

There are 4 types available:
  * 1 - short wave
  * 2 - long wave
  * 3 - overlapping short wave
  * 4 - overlapping long wave

### off()
Turns off all leds

### getTargets()
returns the object with all available targets

## getWaveTypes()
returns available wave types

*Note: each one of those methods will return (bool) true when command was successfully executed or new Error object when it fails.*




# Luxafor

A simple library to control your Luxafor device using Node

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

// or

yarn add luxafor-api
```

## Usage 
```
const { device, devices } = require('luxafor-api');

const luxafor = device(); // use devices() to get all devices

device.color('red'); // or use hex color e.g. #fff
```

## Target LEDs
Led | Code
--- | :---:
all | 0xFF
top row | 0x41
bottom row | 0x42
led #1-6 | 0x01 - 0x06

## API

### color(color, target?)

Set device color. Optionally can set target LED's from the table above. Defaults to all LEDs

### fadeTo(color, speed? = 20, target?)

Fade device color from current to a given color. 

speed is a number 0-255 that represents the speed of the transition, 0 is the quickest 255 is the slowest.

### flash(color, speed? = 180, repeat? = 5, target?)

Flash color for an amount of times specified in repeat parameter.

speed 0 to 255 number determines delay between each blink

repeat 0 to 255 number amount of times to blink before returning to previous state

### wave(color, type = WAVE_SHORT, speed = 90, repeat = 5)
Starts a wave that goes through all the LEDs with the pattern specified in type variable

There are 4 types available:
  * WAVE_SHORT - short wave
  * WAVE_LONG - long wave
  * WAVE_SHORT_OVERLAPPING - overlapping short wave
  * WAVE_LONG_OVERLAPPING - overlapping long wave
  
 Type constants are available as so
 
```js
import { device, constants } from 'luxafor-api';

const luxafor = device();
luxafor.wave('blue', constants.WAVE_SHORT);
```

### police(repeat? = 5)

Starts a predefined police pattern. Goes back to previous state once repeat limit is reached.

### rainbow(repeat? = 5)

Starts a predefined rainbow pattern. Goes back to previous state once repeat limit is reached.

### off()
Turns off all leds

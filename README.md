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

```js
import { device, devices } from "luxafor-api";

const luxafor = device(); // use devices() to get all devices

luxafor.color("red"); // or use hex color e.g. #fff
```

## Targets

You can target each LED light individually using pre-defined constants.

```js
import { device, targets } from "luxafor-api";

const luxafor = device();

luxafor.color("orange", targets.top); // default value is targets.all

/*
 * available values are:
 * targets.all
 * targets.bottom
 * targets.top
 * targets.one to targets.six
 */
```

## API

### color(color, target?)

Set device color. 

### fadeTo(color, speed? = 20, target?)

Fade device color from current to a given color.

speed is a number between 0 and 255 that represents the speed of the transition, 0 is the quickest 255 is the slowest.

### flash(color, speed? = 180, repeat? = 5, target?)

Flash color for an amount of times specified in repeat parameter.

speed 0 to 255 number determines delay between each blink

repeat 0 to 255 number amount of times to blink before returning to previous state

### wave(color, type = waves.short, speed = 90, repeat = 5)

Starts a wave that goes through all the LEDs with the pattern specified in type variable.

```js
import { device, waves } from 'luxafor-api';

const luxafor = device();
luxafor.wave('blue', waves.short);

/*
 * available values are:
 * waves.short
 * waves.long
 * waves.shortOverlapping
 * waves.longOverlapping
 */
```

### police(repeat? = 5)

Starts a predefined police pattern. Goes back to previous state once repeat limit is reached.

### rainbow(repeat? = 5)

Starts a predefined rainbow pattern. Goes back to previous state once repeat limit is reached.

### off()

Turns off all leds

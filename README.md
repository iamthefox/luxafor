# Luxafor

A simple javascript library that provides simple API to control Luxafor devices

## About Luxafor

Luxafor is an LED indicator that connects to your computer through a USB port 
or via Bluetooth, and shows your availability or notifies you about important 
information, like incoming emails or calendar reminders.

Its Hardware Api is open, allowing developers to control the device through
their own applications.

You can go to http://luxafor.com/ to get more information about it.

## Installation
```
npm install luxafor-api --save-dev
```

## Usage 
```
const device = require('luxafor-api');

// api call to change the color
device.setColor('both', '#fff');
```

## API
### setColor(led, color) 
Set luxafor color based on hex color provided.

First argument allows us to target specific LED or all of them at the same time.
It accepts following options:
- 'both' for both front and back sides LEDs of Luxafor device
- 'top' for top (tab side) LEDs only
- 'bottom' for back side LEDs only
- 1 to 6 integer numbers representing each LED

### fadeTo(led, color, speed)

Similar to setColor, the only difference it will transition smoothly from previous color to the one specified.

speed is a number 0-255 that represents the speed of the transition, 0 is the quickest 255 is the slowest.

### flash(led, color, speed, repeat)
Blink new color for a specified amount of times with certain speed and return to previous state
led param has same meaning as setColor and fadeTo
color is just a hex color representation
speed 0 to 255 number determines delay between each blink
repeat 0 to 255 number amount of times to blink before returning to previous state

### wave(type, color, speed, repeat)
Wave new color through all LEDs for certain amount of types and then return to previous state

type is just a string that represents 4 different wave types:
  * singleSmall (1 LED)
  * singleLarge (2 LED)
  * doubleSmall (1 LED with other LEDs keeping previous color)
  * doubleLarge (2 LED with other LEDs keeping previous color)

color, speed and repeat are the same as in flash function.


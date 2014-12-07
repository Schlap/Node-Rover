Node Rover - Makers Academy Final Project
========================

## Node Rover

### Introduction

Node Rover is a group final project from Makers Academy. The original task was to build some form of robot that could be controlled wirelessely. Our team decided to make a robot based on the Mars rover (4 engines with continuous tracks). We decided that we would buidl it from scratch, and control it via a Node.js server. The goal was to have a mobile first web app which could control several aspects of the rover (motor movement, claw, camera pan tilt bracket) over wifi.

### Languages/Platforms/Tools

* Node.js
* C
* Mocha
* Zombie
* MongoDB
* Mongoose
* Twit
* WiFlyHQ
* Arduino (microcontroller)
* Johnny-Five
* jQuery
* JavaScript

### Learning Outcomes

Node.js, JavaScript and Mocha were all somewhat familar to the team members. The true challenges were with the hardware (electronic wiring and related hardware knowledge), as well as programming directly to the Arduino with C. We had to take a ground up approach to physically configuring the rover, starting with simple lighting of LED lights via usb, and progressing to wireless single character commands over telnet. Eventually we had a fully fledged wifi rover that was controllable via a desktop browser, smartphone, smartphone gyrometer, and even with Twitter commands.


### To-do List
- [ ] Refactor the code. Can definitely remove a lot of duplication.
- [ ] Fix bugs - mainly the occasional server crash due to lack of TCP connection error handling.
- [ ] Add an IP camera in order to use the video stream code that was incorporated.
- [ ] Write code the the built in engine Encoders on the rover (for precision control).

### Instructions

The live version of the site will be launched shortly.

Clone the repository:

```
$ git clone git@github.com:snozza/project-noderover.git
```

Change into the directory and npm install the modules:

```
$ cd project-noderover
$ npm install
```

Run the tests: 

```
$ mocha
```

Start the node server and visit http://localhost:3000/ 

```
$ node server.js

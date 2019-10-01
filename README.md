# Disaster Master

A disaster simulator for training disaster relief workers. Set up your own disaster scenario, get your trainees to connect, and run through you disaster scenario.<br>
This program is open to modification from anyone looking to adapt this program to suit your organisation and its training methods.

## Install notes

### Requirements

- Windows 10
- Google Chrome

### How to Run

- Download the packaged version DisasterMasterPortable.zip
- Unzip and run runsimulator.bat
- Refer to the user manual for a more indepth usage guide

## Technical Guide

Disaster Master runs as a local Node.js web server. This makes the program fully portable, it can be run on a local network, or on a single computer with multiple browser tabs.
Node.js binary version is installed along with required npm packages in the packaged version meaning it is fully portable.

### Dependencies

- clone-deep
- cross-zip
- dateformat
- express
- express-fileupload
- extract-zip
- formidable
- hh-mm-ss
- ip
- multer
- opn
- path
- pdfmake
- pdfobject
- rimraf
- socket.io
- supertest
- vis.js
- xml2js
- zip-folder

### Troubleshooting Issues

If the server is failing to start:
- Open the Command Line
- cd to the program directory
- Run 'npm install'
- Try running the program again

## License

To be added

#

# Disaster Master

A disaster simulator for training disaster relief workers. Set up your own disaster scenario, get your trainees to connect, and run through you disaster scenario.<br>
This program is open to modification from anyone looking to adapt this program to suit your organisation and its training methods.

## Install notes

### Requirements

- Windows 10
- Google Chrome
- OPTIONAL: A Standard LAN Router (enables multiple connected devices including laptops over the same network, most mobile hotspots can do the same job)

### How to Run

Offline portable version:
This version uses a portable Node.js binary installation with node modules pre-installed, all packaged up with the program.

- Download the packaged version DisasterMasterPortable.exe
- Run it
- Browse to location to extract, then click "Extract"
- Navigate to selected location and run DisasterMaster.bat
- Refer to the user manual for a more indepth usage guide

To run from the repo:

- clone the repo 'git clone '
- install [Node.js](https://nodejs.org/en/download/)
- open command prompt in cloned repo
- run 'npm install'
- run DisasterMaster.bat

## Technical Guide

Disaster Master runs as a local Node.js web server. This makes the program fully portable, it can be run on a local network, or on a single computer with multiple browser tabs. With no external internet dependency.
Node.js binary version is installed along with required npm packages in the packaged version meaning it is fully portable.

### Product Architecture

This section aims to address how this product functions from a high level perspective, this product is comprised of the following core components. Firstly, a Node server script, server.js, that utilises autoevents.js on a separate concurrent thread (to handle uninterrupted time tracking, whereby logically determining which simulation events have been triggered), located on root. Next, bare HTML Skeleton files, hq-run-simulation, hq-config, ngo-simulation, ngo-config, scenario-edit, scenario-upload located on root. Next, lengthy JS files, run-simulation, ngo-simulation, scenario-edit located in resources/js. And lastly a Bootstrap CSS (disaster-sim-style.css) file in which has been extended to style the aforementioned components located in resources/styles (HTML files were based upon Bootstrap design also). Each of these core components interact with each other in order to support this product's key main features, with the first being scenario creation.

Whereby, given a running instance of the server, users can firstly choose to construct/edit a scenario (.zip) file. This then invokes the server to supply the scenario-edit HTML/JS assets to the client, which results in the scenario-edit JS manipulating scenario-edit-HTML's DOM dynamically according to firstly whether they chose to edit an existing simulation file and secondly users input regarding key simulation variables. This effectively forms a UI containing custom simulation data that will stay consistent with the eventual scenario-edit file being downloaded to the client. Moreover, in order to construct each scenario the scenario-edit JS file is partially dependent on the server component to temporarily store simulation media.

Next, now given that a user has access to a valid simulation file, they can now choose to simulate there created/modified scenarios. In doing so they are first presented with the hq-config page supplied by the server, whereby this pages purpose is to provide the front end component of simulation file parsing. And upon a valid file being uploaded, this file is then transferred to the server for processing. As such, simulation variables are extracted from the file and stored for the duration of the current simulation (no long term DB persistence). Following this, the client is then redirected by the server to the crutch of the entire product being HQ in which's main purpose is for simulation management. This product component utilises hq-simulation.html, a bare HTML file with placeholders for major DOM manipulation and logic processing by run-simulation.js to enable simulation management sub features being: Scenario Timeline / Event Management, Communication, Inbox, Simulation Review.  These sub features are heavily coupled with the server via socket.io, in order to request details about the current scenario, ensured for by initial file processing and to propagate live changes within a running simulation to NGO's (Non Government Organisations / the trainees). With the most noteworthy of these sub features being Simulation Review, in which invokes the server to generate a PDF that summaries the events of a simulation before returning this file back to the HQ client as a downloaded file. 

Lastly, NGO's have the capacity to interact with the current scenario via two methods, as determined by whether the current simulation is set to "online" or "offline", however keep in mind that these terms are not to be taken literally instead, they indicate the presence of multiple client machines to enable remote NGO's usage over a LAN. Irrespective of this, the first method being on a given opened browser "tab" reserved for each joined NGO (in the case the environment does not support a LAN nor a range of connected computing devices). And the second method being, an environment that does support a LAN with a range of connected computing devices. Regardless, of which method however, the process by which NGO users interact with the simulation is identical as the server handles both cases seamlessly. Whereby, when an NGO is attempting to join they are supplied from the server a config page in which NGO's submit there manually transferred pass key (used for identification in order to differentiate from each otherwise identical NGO). Following this, NGO's (now identified by their URL)  are redirected by to the NGO simulation component. Whereby, this component consists of ngo-simulation HTML/JS files, akin to the HQ simulation component. As such the HTML is barebones, again heavily reliant on the JS to manipulate it's DOM in order to support the embedded sub features being Communication and the Inbox plus hourly status reports. So you could consider the NGO view to be a stripped down limited version of the HQ view. And again like HQ, these sub features are heavily coupled with the server via socket.io, in order to request details about the current scenario plus to communicate with HQ about simulation particulars and have discourse with sister NGO's.

### Dependencies

- bootstrap
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
1.  Make sure there is not already a server instance running

2.  - Open the Command Prompt
    - cd to the program directory
    - Run 'npm install'
    - Try running the program again

## License

[GNU General Public License v3.0](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/LICENSE)

#

# ENGR 301 Assignment 1: Project Requirements Document

The aim of this document is to
specify the requirements of the system your group is to build. 
The focus of a requirements document is the problem you are attempting to solve:  not a first attempt at a solution to that problem.
This document
should communicate clearly to the supervisor, client, and course
coordinator what the system you build is going to do, and
what constraints it must meet while doing so.

The document should also demonstrate your understanding of the main
analysis principles and quality guidelines, and applicable standards, using tools and notations as necessary to communicate the requirements precisely,
unambiguously and clearly in a written technical document. Page specifications below are *limits not targets* and refer to the pages in the PDF generated from the markdown. Because the size of your document is necessarily limited, you should ensure
that you focus your efforts on those requirements that are most
important to completing a successful system: if sections are at their
page limit, indicate how many items would be expected in a complete
specification. 

The ENGR 301 project proposal and requirements document should be based
on the standard ISO/IEC/IEEE 29148:2011(E), primarily sections 8.4 and
9.5, plus section 9.4 for projects involving hardware and ISO 25010
SQuaRE for systemic requirements. While excerpts from the standard have been quoted within the template, to understand what is required it will be necessary to read earlier sections of the standards themselves. A supplementary treatment of requirements gathering in engineering projects may be found in [Requirements in Engineering Projects](https://victoria.rl.talis.com/items/F166DA94-DAD8-FBDB-0785-7A63C9BA3603.html?referrer=%2Flists%2F5886F297-2506-1F17-45D9-7F04CEE284EE.html%23item-F166DA94-DAD8-FBDB-0785-7A63C9BA3603) (Talis). The requirements
document should contain the sections listed below, and conform to the
formatting rules listed at the end of this brief. 

All team members are expected to contribute equally to the document and list
their contributions in section 6 of the document. You should work on
your document in your team's GitLab repository in a directory called
`M1_Requirements`. While collective contributions are expected to be the exception rather than the rule, if more than one team member has contributed to a particular 
commit then all those team member IDs should be included in the first line
of the git commit message. `git blame`, `git diff`, file histories, etc. will be tools used to assess individual contributions, so everyone is encouraged to contribute individually, commit early and commit often. Any team wishing to separate individually contributed sections into a single file before collation into the single proposal document for submission is welcome to do so.

------

<div style="page-break-after: always;"></div>

# ENGR 301 Project *16* Project Proposal and Requirements Document

#### Riley Grice, Nathan Ellison, Tom Buurmans, Daniel Miller, Lachlan Keene

## 1. Introduction

The project we have been assigned to is Project 16. Project 16 is software based and the organisation we are working for is RedR Australia. Our client organisation RedR Australia is a "leading international humanitarian response agency that selects, trains and deploys technical specialists." (As RedR states). The goal of the project is to produce a piece of computer software that will be able to assist in the disaster simulations that RedR Australia carries out. The purpose of these simulations is to train new staff to work together and to maintain a level head when under the stress of attempting to maintain order amongst natural disaster victims. During a given simulation, there are several teams of people that are assigned different roles. There is also an overseer of the simulation that watches over the teams as they solve problems together. Currently, the overseer communicates with the teams using both phones and emails. Given that there are multiple teams participating in the simulation (potentially up to 7 groups), the overseer would quickly gain a large workload. This is where the project purpose is revealed. Whereby, RedR would like to automate the process of running as well as tracking the simulation. Because, the tasks involved in managing the simulation (communication, event initialisation, and post-simulation review) are rather tedious and error-prone, given that they are performed by people. And that participants in RedR's current manual simulation feel a lack of immersion  This then presents us with the opportunity to develop a program, such that a computer would assist the human operator. Whereby, reducing their workload considerably and allowing them to focus their attention on other tasks. Furthermore, It would also allow for a greater sense of realism. Whereby, upon the initialisation of a simulation, teams open and read the emails they receive from the overseer, the software would play sounds that emulate the atmosphere of a real disaster zone. Therefore, making the participants feel more immersed in the scenario and thus make them act as if they really were in a real disaster simulation.

### Client

Client: Regan Potangaroa
Email: regan.potangaroa@vuw.ac.nz

### 1.1 Purpose

The purpose of our software is to reduce the total workload of the overseer in the RedR Disaster Simulation and to increase immersion for it's participants by automating manual tasks involved in the simulation.

### 1.2 Scope

The Scope of this undertaking is to produce a computer program: that is going to be used in order to automate some of the responsibilities of the Overseer in the disaster simulations that RedR frequently run. The cost of producing such a program will be little to none, as all of the development processes will be able to be completed using hardware that is already available to every team member and to RedR. The final deliverable product will be a single piece of software, that will be capable of the following key features that define the scope.

1. Ability to load dynamic simulation files, from an Overseer at HQ machine, that dictates for the details of each type of scenario and such that Overseer has main control over current simulation.
2. Operating on 1..* Machines, whereby a single machine implies no access to the internet.
3. Inter-communication between Overseer at HQ and NGO's at Client machines, each machine being over network infrastructure operated by RedR, and communication via superficial emails and texts between teams and Overseer at HQ. Communication may have embedded imagery and audio files.
4. Tracking for the progress of the simulation, a varying time scale that is used for each simulation.
5. Custom creation of varying scenario situations.
6. Real-time interfering of scenario by Overseer.
7. Review of the events that occurred in past simulations, with functionality to export scenario result.
8. Ability to function in a range of limited environments on varying hardware.



### 1.3 Product overview 

#### 1.3.1 Product perspective

The software product is going to be a standalone application and will not be implemented into a larger system. This is because the client currently doesn't have other systems to integrate the product with. This will be the first of it's kind and thus will not need to be related to other products. 

##### How does the software operate within the following constraints?

a) System interfaces; The secondary types systems that the Software will have to interact with, will be to a server API that hosts a Database. This will be in order to facilitate master and slave inter-communication.<br>
b) User interfaces; We will implement a user interface in a browser environment, to allow simulation participants to have ease of interaction. <br>
c) Hardware interfaces; The specific kind of hardware that the software is going to be running on is unknown, however, as we are not developing hardware this is irrelevant. <br>
d) Software interfaces; We don't know which other software our program will have to interface with. The client did not give the team a specific requirement as to which software to use. The client did, however, suggest that a bonus requirement would be for integration with an open source software called KoboToolBox (https://www.kobotoolbox.org/, which is information management software). So this will be an idea that the team will consider. The client also informed us that the machines the software will be running on will tend to be Windows based. This vague source of information could result in a problem for us if we are to depend on software/software libraries, that require additional installation. Because installation is impossible for us due to clients machines being remote and inaccessible. Therefore, the team will need to ensure that the language they choose to develop in, omits the need for software interface dependency's, as they are out of our control. <br>
e) Communications interfaces; The program is required to communicate with external cloud service's to support the storing of simulation scenario information, as well as communication between client machines<br>
f) Memory; The program will have to be optimised such that it doesn't consume all of the memory on the machines<br>g) Site adaptation requirements; The software will have to be built to support universal types of machines as it needs to be able to run on the hardware that is present in any disaster simulation settings.<br>

#### 1.3.2 Product functions

As stated in section 1.1, the purpose of the program is to automate some of the responsibilities for the overseer during the simulations that RedR run. The software will have to be capable of doing this in a number of different environments, given that the characteristics of its operating environment cannot always be predicted. The main functions of the program are to be able to send messages from one party to another and track the timescale being simulated. The program will have to be capable of doing both of these things either with or without an internet connection being available. If no internet connection is available, the program will have to be able to run on a single machine and "act" as if it were on multiple different computers. It will do so by way of allowing users to log in and see their own messages that they have received, both from the overseer and from other participating teams. If there is an internet connection available, as well as supplementary machines, the program must be able to run on each different machines concurrently. And allow the users to be able to communicate with each other over a given network infrastructure. The software must also be able to keep track of the time within the simulation, given that time is scaled down for each simulation. Next, the software will have the ability to capture the events that have occurred within a simulation, such that they can be replayed for review purposes. Therefore, all in all, the minimum viable product will be a program that is simply able to send messages over a network (or emulate it on one machine), keep track of current simulation state with regards to current time, such that events are triggered at relevant intervals, and that it supports simulation review. Beyond that, having the program be able to send/receive images and audio files would significantly enhance the illusion, that the simulation participants really are in a disaster simulation. Moreover, having the program play certain audio files (such as sounds of helicopters and news reports) over the displaying of text, regarding the simulation, would only further add to the realism. And would, therefore, be a desirable feature of the product. 

#### 1.3.3 User characteristics   

There are going to be many different people that will use the system once it is deployed. Given that RedR trains a number of different people, all from different backgrounds, the users of the system are going to be considerably varied. There are going to be three main classes of user types. These include; Simulation Participant, Overseer (Government Roleplayer) and Technician. The Simulation Participants are going to be people who are being tested/trained for deployment into real world disaster zones. Thus, they will be relatively competent but also likely to be under some form of stress, as they attempt to maintain order and solve problems related to the situation that they have been placed in. This may affect their ability to use the software. The Overseer is going to be the person responsible for communicating with the teams, via simulated emails and text messages. They will not be participating in the simulation in the same way as the teams but will still have a large workload. Given that the overseer has to communicate with each team at any given moment, so they are likely going to be under pressure and may not able to think clearly. Which may also limit their ability to use the software. The technician is going to be the person that will attempt to fix the program should it start to display undocumented behaviour. This role could be played by anyone with some amount of technical knowledge. Their ability to use the software will likely not be reduced due to stress, compared to the other users, as they will not be participating in the simulation. 

#### 1.3.4 Limitations

While the team will put forward their best attempt to satisfy the client, there will be limitations that may slow progress. There may also be requests from the client that simply may not be able to be met, because of the nature of the software being used to develop the final product, as well as additional time and knowledge constraints. For example, Regan, the client, mentioned to the team that he wanted to have the final program, be able to send text messages to mobile phones. Regan also mentioned how he wanted entire simulation events to be recorded as a video, this feature would be a limitation for us. Because it is dependent on whether the deployable environments support recording functionality and whether we could host large video files reasonably. These are examples of features that may be out of reach, simply because the team has never had any experience in producing software capable of this, nor are we able to assess the deployable environments for hardware suitability. The machines that will run the end product software, may also be their own limitation to the project. The operating system that RedR's machines run on is subject to inconsistency. The hardware of RedR's computers is also unknown but this will likely not be of concern. This is because the simulation program that will be developed, will not be particularly computationally expensive as it will not have any complex graphics to render as part of the simulation. 

The users may also become a limitation of the system. The software is only as good as the people that use it. Given that the users of the software may be otherwise preoccupied with other tasks or under some kind of situational stress, the usefulness of the software may be limited based on how the users interact with it. 

Another limitation of the program may be that there is no internet connection available to utilise. Given that the simulations are going to run in a very remote region of Australia (to simulate a different country), it may be the case that there is no internet connection available. In this case, the program will be required to run on a single machine but behave as if it were running on multiple machines. This may limit the usability of the system seeing as only one person will be capable of using it at a time, while it may be that multiple people *wish* to access it at the same time. Since it will take longer for the simulation teams to be able to check messages, this may limit the usefulness of the product. 

## 2. References

1.2017,  Software Life Cycle Processes, IEEE Standard 12207, [Online], pp 24-60, Available: https://ieeexplore.ieee.org/document/8100771.

## 3. Specific requirements  

### 3.1 External interfaces

The external interfaces needed for our system will be Ethernet and Wifi. The Latter is depending on the specific hardware of each HQ system configuration. Our program needs to support the capturing of all Disaster simulation data in real time. Because Regan wants the ability to review data post-simulation event. Furthermore, this means that our software solution needs to support the uploading or the transferring of this data to an external location via Ethernet and or WIFI, as an external interface. The external destination will be to a list of email addresses, that will be inputted at the end of each simulation, for the user's convenience. And the uploading of this data will be at the instant a simulation is complete. The review data will be in the format of a simple custom defined XML text file, therefore it will be small in size. Once the email has been processed via the aforementioned External interface that is being utilised, it will notify the HQ Terminal that the function has been accomplished.

### 3.2 Functions

**HQ creates new scenario**

Scenario editor is the system used by HQ to create 
a list of scheduled events to be sent to individual NGOs during the simulation. New Scenario is the use case for HQs who want to create
a new scenario (such as first-time users).

| User Action                                     | System Responsibility                                        |
| ----------------------------------------------- | ------------------------------------------------------------ |
| HQ launches Scenario editor                     |                                                              |
|                                                 | System prompts user to either create new scenario or edit existing one |
| HQ selects "create new scenario"                |                                                              |
|                                                 | System prompts user to choose the number and names of NGOs and create pre-scheduled messages to be sent to them. |
| HQ selects NGO number and names                 |                                                              |
|                                                 | System adds NGOs to NGO list                                 |
| HQ creates and submits messages to message list |                                                              |
|                                                 | System adds pre-scheduled messages to list and displays them |
| HQ selects "save scenario"                      |                                                              |
|                                                 | System saves scenario to local file                          |

**HQ begins simulation**

Allows HQ to start simulation, All scheduled events and messages will start firing. System will start recording data regarding simulation.

| User Action                              | System Responsibility                              |
| ---------------------------------------- | -------------------------------------------------- |
| HQ launches HQ program                   |                                                    |
|                                          | System queries user to load scenario               |
| HQ selects scenario from local disk      |                                                    |
|                                          | System queries user for scenario log save location |
| HQ selects save location on local disk   |                                                    |
|                                          | System launches core system interface              |
| when ready HQ presses "Start simulation" |                                                    |
|                                          | System begins simulation                           |

**HQ ends simulation**

Allows HQ to end simulation, stopping events and all transmittion of messages. Recorded data can then be viewed/saved.

| User Action               | System Responsibility                       |
| ------------------------- | ------------------------------------------- |
| HQ selects "end scenario" |                                             |
|                           | system promts user to view/save log or exit |
| HQ selects exit           |                                             |
|                           | System ends program                         |

**HQ schedules email to be sent to NGO**

HQ creates scheduled email while the simulation is running to be sent later in the simulation

| User Action                                                  | System Responsibility               |
| ------------------------------------------------------------ | ----------------------------------- |
| HQ selects "compose email"                                   |                                     |
|                                                              | System opens new email interface    |
| HQ fills in relevant fields (recipient, subject, message contents) |                                     |
| HQ selects time to schedule message                          |                                     |
| HQ selects "Add message to schedule"                         |                                     |
|                                                              | System adds message to message list |

***NGO sends email to HQ**

NGO creates and sends email to HQ.

| User Action                                                  | System Responsibility                     |
| ------------------------------------------------------------ | ----------------------------------------- |
| NGO selects "Compose Email"                                  |                                           |
|                                                              | System opens new email template interface |
| NGO fills in relevant fields (recipient, subject, message contents) |                                           |
| NGO submits email                                            |                                           |
|                                                              | System submits email to HQ                |

**NGO opens received file**

NGO recieves and downloads file attached to message from HQ.

| User Action                      | System Responsibility                                      |
| -------------------------------- | ---------------------------------------------------------- |
|                                  | System indicates to NGO that new message has been recieved |
| NGO opens message                |                                                            |
|                                  | System indicates file attached to message                  |
| NGO clicks on attached file      |                                                            |
|                                  | system downloads file to NGOs local system                 |
| NGO views file from local folder |                                                            |

**HQ edits scheduled event from event-list**

While running the simulation HQ edits contents/details of scheduled event.

| User Action                                              | System Responsibility                                        |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| HQ selects event from event list which they wish to edit |                                                              |
|                                                          | System opens edit screen showing details of event (details will depend on type of event (email, text, audio file etc.)) |
| HQ modifies fields                                       |                                                              |
| HQ saves event                                           |                                                              |
|                                                          | System updates event in event list                           |

**HQ exports recording of current simulation**

Once the simulation has ended, HQ exports simulation log to local disk.

| User Action         | System Responsibility                                        |
| ------------------- | ------------------------------------------------------------ |
|                     | Simulation ends                                              |
|                     | System gives HQ option to view log, save log or exit         |
| HQ selects save log |                                                              |
|                     | System saves log to local disk in easily interperateable format |
|                     | System returns to previous screen                            |

**Client Joins scenario session**

Before simulation start, NGO connects to core system session via the internet.

| User Action                                   | System Responsibility                                        |
| --------------------------------------------- | ------------------------------------------------------------ |
| NGO launches client program                   |                                                              |
|                                               | client program launches                                      |
|                                               | System initiates connection procedure and prompts NGO for authentication for specified core system |
| NGO authenticates and connects to core system |                                                              |
|                                               | Core system prompts user to choose an NGO from the sessions NGO list |
| NGO selects NGO from list                     |                                                              |
|                                               | System submits selection to core system and grants client access to messages |

**Other usecases in order of priority**

- HQ sends email to NGO.
- HQ creates new scenario event in scenario editor.
- HQ defines timescale for simulation before it starts (e.g. 1 hour real world = 1 day simulation).
- HQ defines time limit for simulation before it starts.
- HQ deletes scheduled event from event-list.
- HQ views email inbox.
- NGO views email inbox.
- HQ/NGO view simulation time.
- HQ opens saved recording of previous simulation.
- HQ edits existing scenario in scenario editor.
- HQ adds from local disk to scenario in scenario editor.
- HQ sends scheduled audio event to NGO.
- HQ toggle audio effect for audio event.
- HQ loads file from local disk to send to NGO.
- NGO makes new log entry to record miscellaneous data (radio communication, notes etc.).
- NGO sends email to another NGO.
- HQ views details of recorded events.
- HQ replies to NGOs email via inbox.
- NGO replies to HQ/other NGO via inbox.
- HQ filters outgoing scheduled events by NGO.
- HQ filters inbox by NGO.
- HQ toggles between offline single system mode, or online mode.
- Client reconnects to core system while simulation is running.
- HQ views list of connected clients.
- HQ kicks client from session.
- HQ sends text to NGO.
- NGO sends text to HQ.
- NGO sends text to NGO.
- HQ views text in inbox.
- NGO views text in inbox.
- HQ sends scheduled text to NGO.

### 3.3 Usability Requirements

Define usability (quality in use) requirements. Usability requirements and objectives for the software system include measurable effectiveness, efficiency, and satisfaction criteria in specific contexts of use.

User Friendliness: For all NGO and HQ users, the interface beign used should be inviting and friendly, meaning
that all tasks required to do in the interface by users should not be complex and simple with guidance for the 
users.

Error Tolerance: Errors in the program must be recorded by the simulation so future debugging can be completed more effectively.
Error corrections should also be made, if a message fails to send, the program will resend the message until it is properly sent.
All errors made by users of the HQ and NGOs will be dealt with correctly and an error message will be shown with what went wrong.
This will help users make less mistakes if future, as feedback errors will help them learn how and how not to use the program.

Customization & Personalization: For HQ users, adding customizations and personalizations into the simulation is necessary for
training purposes. Personilization allows the HQ the improve certain characteristic of one specific NGO. Customization allows
the HQ to train all NGOs in the simulation for new events which expands training for other scenarios.

User Engagement & Immersion: The user interfaces for the NGOs must be engaging. This will keep training during the simulation 
more exciting and focusing for the trainees. Immersion with sounds, messages and events will increase the immersion which will
help train the NGOs for real world disaster responses as the simulation becomes more realistic.

Performance: All messages must be sent within 10 seconds and files loading scenarios
must not more than 30 seconds to load.

Satisfaction Criteria of Specific contexts:
Creating a functional offline version of the Disaster Simulaion program. Where
scenarios can be loaded, run and recorded with an organization using the simulation
sending messages between the HQ and the organization on the same computer.
Replaying the recording will be important for analytical purposes for RedR
Australia, including a replay of the scenario with all messages sent with time
stamps is a must.

### 3.4 Performance Requirements

Performance is an important requirement for this system, due to the real-time, instantaneous, nature of scenario simulation. This invokes the following performance requirements upon our program.

**Messaging Performance**

The core feature of the program will be to support instantaneous text/image/audio based messages between the 1 to * core NGO terminals and the Single HQ terminal concurrently. As such, this dictates that the delay between sending and receiving messages must not exceed 10 seconds. Should this performance requirement not be met, then this will result in unresponsive and ineffective disaster based scenarios. Leading to user frustration when utilisation our Software solution.

**Synchronisation Performance**

In addition, there will be concurrent program instances that rely on their parent (HQ), as well as sibling (NGO) terminals, all being synchronized with one another. Because, the core functionality of our program will be based upon simultaneous event sending and receiving from a master instance, to multiple slave instances, with regards to time. Therefore, this means that this implies that the HQ terminal must constantly be monitoring the performance of group terminals to ensure that there is no more than a 5-second difference in pinging master to slave. If so, this critical performance requirement is being satisfied and the program will be performing effectively.

**Logging Performance**

Another critical performance requirement is that the program has the capacity to log every event that has occurred throughout the simulation in real time. Meaning, that should there be variance in the delay between event occurrence to event logging, then there are implications of potential to have events logged out of order and so the log time entries will not be accurate.

**Simulation Loading Performance**

Additionally, as our program will support the loading of custom scenarios, prior to the initialisation of each scenario run through. It means that our program will need to be able to process the content of the loaded files in a reasonable amount of time, being under 5 seconds. If this performance requirement is not met, then users will become annoyed, by having to load in simple files that in reality wouldn't be expected to take more than 5 seconds.

**Computing Hardware Performance**

Moreover, due to the size of the data being transferred, between a limited amount of computers, being relatively small, it ensures that a large computational overhead is not necessary for the system in which we need to build. This is fortunate when considering that we have been informed by our client that RedR has Computing Hardware limitations. As such, in addition, we must keep this in mind such that we don't build Software that over exceeds our target deployable environment limits.

### 3.5 Logical Database Requirements

a) Types of information used by various functions:

Pictures: Displayed on the User Interface and being sent from HQ to NGO's.

Emails/Messages: Displayed on the User Interface and being sent to and from
every user type in the simulation.

Sound Effects: Displayed on the User Interface and being sent from HQ to NGO's.

Scenario File (for loading): Loaded file in the HQ which will send messages/emails, 
pictures, and sound effects from this file.

Recording File: This will record all information sent and recieved by all players 
in the Simulation with the time of the action associated.

b) Frequency of use:
The Simulation will be used upto six times a month.

c) Accessing capabilities:
HQ: Will have full control over the scenario being able to change time e.g. 1 day = 1 hour in the Simulation.
Also, controlling events from the scenario, pushing them forward or delaying them. HQ will be able to inject new 
events and messages into the Simulation. This gives the HQ more control over how they want the Simulation
to play out and to customize training experiences.

NGO(s): Have limited access, they will only be able to view what has 
been sent to them by the HQ and other NGO's. The only purpose for the NGO's program is
to be used for communication.

d) Data entities and their relationships:
Mains:
    NGO and HQ mains will be used as to communicate information between their own programs.
    NGO main will transfer information around in the NGO program and the same for the HQ main.

UIs and Senders:
    - Each UI for HQ and NGO will take a message that was sent on the UI and passed through its main to the sender.

UIs and Receivers:
    - Each UI for HQ and NGO will take message received by the receiver and pass it through its main to the UI to be displayed.

HQ reciever and the Recorder:
    - These two entities will communicate using the HQ main, copying all information received into the recorder

Senders and Receivers: 
    - If online the sender and receiver will communicate using interent connections.


If offline the sender and receiver will communicate through a direct connection on the same computer.

HQSender and NGOtReviver: Sends messages and events from the scenario from the HQ's program to the NGO programs'.

NGOSender and HQReceiver: Send messages from the NGO programs' to the HQ's program.


ScenarioLoader and the HQ main:
    - This will load a scenario file and send events and messages into the HQ main where it will wait to be fired at the right time.
    

e) Integrity constraints:
Integrity constraints provide a way of ensuring that changes made to the database by authorized users do not result in a loss of data consistency.

f) Data retention requirements:
Data collected during the Simultion such as messages and events will all be stored in a file in the HQ program. The data kept will be necessary for analylitical purposes in a review after each Simulation.
All data collected in the file must be time stamped in a timeline fashion, as it will make reviewing a timeline more effective for analysis.

Overview Domain Model/UML Classes and Description for every Class

The UML diagram is located in the teams GitLab repo (Many details omitted, as unneeded for requirements drafting) :
https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/P16_Diagram.jpg

| Class           | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| ScenarioCreator | A stand-alone program for creating a disaster scenario.      |
| PlayRecorder    | A stand-alone program for running over a recorded simulation. |
| HQ              | A core class for running the simulation, providing all the functionality from the HQ. |
| ScenarioLoader  | A class that loads in the scenario file for the HQ to run.   |
| Recorder        | A class that monitors the events of the HQ and records it with timestamps. |
| HQUI            | The user interface for the HQ.                               |
| HQSender        | Handles the sending of messages to clients.                  |
| HQReceiver      | Handles receiving messages from clients.                     |
| ClientSender    | Handles the sending of messages to the HQ.                   |
| ClientReceiver  | Handles receiving messages from the HQ.                      |
| Client          | A core class for the functionality of clients.               |
| ClientUI        | The user interface for the HQ.                               |



### 3.6 Design constraints

**Project Limitations.**

This project has design constraints imposed upon it by project limitations. These Constraints will dictate the way in which our project Development Life Cycle is affected.

**Time**

 A project limitation constraint is Time. We are bound by our delivery date in October 2019, in addition to Regan's request for frequent updates to show how our project is progressing. As such, we must plan our time accordingly, using agile time management practices.

**Budget**

Another project limitation constraint is our budget. We have been allocated a budget of $0. This is very reasonable, however, because firstly, we are working for a charity organisation. And secondly, because this project does not require the purchasing of licensed software packages, nor additional physical hardware.

**Variation and Uncertainty in Computationaly Limited Deployable Environments**

Our next project limitation is that the program must have the capacity to function in multiple environments. Whereby, these environments will vary in terms of there properties to one another. These properties being access to the external internet and the quantity of concurrent simulation computers. This variance is a result of the real world simulation environment being dynamic, as Regan has stated that the program will be run in varying locations, with some being more equipped in terms of there hardware. This constrains us, as we are required to develop a program that supports features that may mutually oppose each other, proving a difficulty to develop in regards to. The next project limitation is in relation to the latter. Due to the uncertainty of not knowing exactly what environments our program will be deployed into, we must build our program so that it can be deployed and applicable to a theoretically limitless amount of computing environments. This is a major constraint for us as we must consider seriously our programming language of choice to meet this requirement adequately.

**Video Recording Of NGO's**

The client has requested that it would be a well received addition for the program to support video capturing of NGO's. However, this involves design constraints, as firstly we are unsure what sort of recording hardware the client has. And secondly we are constrained by our ability to process and store large video files, as we have very limited capacity for large file storage.

**External Standard Compliance.**

An external standard that is imposed on our project is the requirement of adhering to the IEEE 12207-2017 Systems and software engineering - Software life cycle
processes document. This standard is opposed upon us because we are professional engineers and such must conform to professional industry practices. This standard outlines how when developing Software, for utilisation by organisations and for the public, there is a framework of best
practice to follow. This framework includes processes, that when applied correctly, through development cycles, will result in the satisfaction of our client.
The content of processes, in this standard, that is relevant to our project is summarised as follows.

**Agreement Process**

Pertains to how there is a procurement phase. Whereby, we need to ensure that we are on clear established agreement terms, such that us as developers and Regan
the client have the same mutual understanding of what the project requirements are. This will be achieved by frequent meetings with the client until all requirement issues are resolved.

**Technical Management Processors**

Pertain to what strategies we will be making use of to organise our work in a structured direct manner. Tools that will be used to achieve this are Task Planning
via the Issues feature in Gitlab (By which will form agile sprints), Decision Management by way of keeping log records in Git that track our progress to decide what features to dedicate time toward to
next, and risk management which will be addressed in Sub-Section 5.

**Technical Processors**

Are Technical based actions that we will utilise to ensure for software quality throughout development. These processors are inclusive as follows.

*Architecture Design*

Will allow us to effectively determine what platforms and languages we will be utilising for project software development, this designing process will be acted out and shown in our Architecture Design Report.

*Implementation.*

Is the act of writing our code, up to this phase, we have ensured that this phase will be achieved comprehensively, as the aforementioned processes would
have set us up adequately in terms of preparation.

*Integration Process*

Which is the step of combining our individual components into one coherent functional system.

*Verification Process*

Is the process of monitoring the way in which we are building our software, to ensure that it meets a high coding standard.

*Validation Process*

Whereby we reflect over what we have accomplished thus far, to review in regards to assuring that features we have implemented, are in accordance
to the established requirements.

*Operation and Maintenance Process*

Is the action of partially deploying our program at Regan's disposal, such that he will be able to provide us with feedback that outlines whether
the program meets his expectations or not, indicating where further work needs to be dedicated towards. [1]

```

```



### 3.7 Nonfunctional system attributes

1. Performance Requirements
   - Messages that are sent and received by NGO's and the HQ must be sent to each other within 10 seconds. Messages must be sent and received within 10 seconds because the Simulation must be similar to that of sending messages in a real disaster response.
   - Pictures and Sounds must be played when received and opened by an NGO's. These are played to create more immersion in the simulator, this will be how NGO's will react to important news bulletins and updates during a disaster.
   - Must be able to run offline and online, offline is necessary because the Simulation may be used to train people where there is no internet. The online version will be more useful, as it can handle more users in the simulation through web-based design.
   - Offline will run from one computer and have the ability to be split on multiple monitors/tabs connected/on to the computer.
2. Scalability
   - New scenarios must be able to load onto the HQ program. 
   - After loading new scenarios, the HQ program must be able to run it with the NGO's.
   - Amount of NGO's running with the HQ in the Simulation can be changed for different scenarios. Different scenarios mean the NGO's can train for different environments and different disasters.
3. Capacity
   - The online version must handle messages between at least seven NGO's and one HQ. This would be as if a normal network was used in real life for the NGO's, a network that will have capacity for communication.
   - The offline version will only handle one user at a time during the Simulation. An HQ will run simultaneously to a client NGO on the same computer.
4. Availability
   - The Simulation will be functional once the HQ has loaded the scenario and has NGO's connected.
5. Reliability
   - There must be an error detection system for messages that have failed to be received or sent, and for the failed scenario, pictures, and sounds.
   - There must be an error correction system for failed messages, pictures, and sounds.
6. Modifiability
   - During the Scenario, the HQ should be able to create new scenario messages and be able to send them to the NGO's. This is for the HQ running the simulation to control the scenario, this control allows the HQ to add new problems and add more to the Simulation.
   - Scenarios files can be edited when the Simulation is not running. If changes in the scenario need to be made by RedR Australia, then they can do it to fit their training purposes.
   - During the Scenario, the HQ should be able to fire, prevent or delay any event from the loaded Scenario from executing. Allows more control over the Simulation for HQ.
7. Maintainability
   - A process where if a failure occurs during the Simulation, the recording of everything by the HQ will be able to be used the recorded error to find the bug(s). This will be for bug fixing and testing, for development of the Project and new scenarios created or modified.
8. Serviceability/Supportability
   - Create a User Manual for the users. This is because the Project Team cannot deploy the Project in Australia.
   - The offline version will need to be installed.
   - A tutorial will be made to guide NGO's on how to use the web-based clients.
9. Security
   - RedR Australia would like to keep all scenario files encrypted and only decrypted when running the Simulation on the HQ program. Privacy for RedR Australia's scenarios is stressed by them.
   - All NGO and the HQ programs data will be wiped when the programs are shut down. Except for the recording of the Simulation by the HQ which will be exported out.
10. Portability
    - Other RedR NGO's may want to use the Disaster Simulation Program to train up more Disaster response NGO's around the world. The Simulation Program should be able to be emailed between RedR NGO's .
11. Manageability
    - HQ will have to manage the scenario and time of the Simulation. This will be in their HQ user interface for HQ user to utilize. Allows the HQ controls for pausing and time constraints.
12. Environmental
    - Online version: The environment will be in a regular workplace. A Program will run on several computers all connected via the HQ's Program.  
    - Offline version: The environment can be anywhere, our client Regan said "We may have people using the simulation in Afganistan and Iraq.", the offline version should run anywhere in the world for easy access training purposes. 
13. Data Integrity
    - The Recorded data file must have errors detected and displayed on the file as bad data. Can be used for bug fixing and testing, but so that unreliable data is easily spotted in the recording file of the simulation.
    - The scenarios will need a token or password to decrypt the scenario file. This will ensure the security of the scenarios even if the scenario files are stolen.
14. Usability
    - Client - Display sent and received messages (similar to an email inbox). In the real disaster response, emails will is crucial to organizing the response, so having the program messages similar to an email will help the immersion.
    - HQ 
      - Display a list of loaded events from the scenario file and what times the events will execute. 
      - Display sent and received messages (similar to an email inbox). 
15. Accuracy
    - Recorded data in the recorded data file must contain the type of data (picture, message, sound), the content of the data, the time of recording and if there was an error in the recording. 

### 3.8 Physical and Environmental Requirements 

There is no hardware needed for this project.

However our software must be used in different environments. Two different versions will be able to run. One offline and online.

Online: Mainly in office buildings with internet connection and many computers on the same network.

Offline: Anywhere in the world, no internet connection required and only one computer necessary to run the simulation.

RedR are going to be running their simulations in an isolated section of the Australian outback. This area is going to be a very dry, hot and arid place. Some simulations are going to run inside buildings (such as in old school buildings) and some are going to be run outdoors. For those simulations that are run indoors, there will more than likely be internet access. It may be the case that some classes don't have internet access. The program will have to be able to function whether it has access to the internet or not. Without internet, the software will run locally on a single machine. It will distinguish users via a type of login system and each user will only be able to access specific parts of the program. 

### 3.9 Supporting information

a) Sample input/output formats, descriptions of cost analysis studies, or results of user surveys:

- Inputs from the HQ and the organizations will be in txt format for sending basic messages to each other.
  - There will be feedback from testing by our client Regan who will test it himself and send constant feedback.
    - Output is the recording file, which will contain txt, jpeg and mp3.

b) Supporting or background information that can help the readers of the SRS:
    - RedR Austrlia's Disaster Simulation Program is to help train people in organizations. Training will consist of communicating with other organizations. The trainees will have to get funding and make a budget for supplies to respond.
    - This program will help train people for real world disaster response in organizations.

c) A description of the problems to be solved by the software:

- Simplifying the training simulation program for the RedR Australia training team.
  - Allowing Offline training for disaster simulations on a computer anywhere in the world. This allows quick response training to disasters around the world for RedR Australia.
    - Allowing Online training with multiple teams with a uniform software to communicate and train. This will solve having the use of emailing websites to communicate during the simulation.
    - The online version will allow training to be done easily by many people around the world and not have to be run onsite by only RedR Australia.

d) Special packaging instructions for the code and the media to meet security, export, initial loading, or other
requirements:
    - Load scenario file which is encrypted.
        - Recording file of entire simulation with stamp marks for all recordings.
        - Recording file will need to be replayed through the Program for easy analysis. 

## 4. Verification

To verify that the software performs the correct functions, the client will be the first person to check with. The client is the one who knows exactly what they want their system to do. The simplest way the team 
can test that the software functions properly would be to have the client sit down and attempt to use the software without any input from the team. That way, the user interface will be able to be tested with 
unbiased results. Upon the completion of the program, before testing with the client, the team will also be able to verify the functions of the software by comparing the program to this very document, as it holds 
records of all of requirements that were gathered from the client during the first few meetings.

3.3: The usability of the simulation can be best tested with the client deploying a test version and giving feedback on usability requirements such as custom additions of HQ messages during a simulation, error 
tolerance and correction of messages during the simulation, the user friendliness of the NGO user interface and the HQ user interface (UIs). Feedback from the client in deployed testing will give the project information
on what errors are occurring when and where and how to make the program more friendly to the NGO and HQ users during the simulation for better training. Having the UIs engaging will help keep trainees keep focused and
have more stimulation. Feedback on the immersion of the UIs will be crucial from the client's deployment and testing of the Project.

3.4 Performance Requirements: Unfortunately, it will be imposable to verify that the program is performing correctly in the environment it will be deployed (Australian locations). However, an approximation of this 
environment can be created and tested locally. Simulating the performance of the system can be tested by creating a network of windows based computers connected to another windows based computer for the core 
system. The network will be tested within the university network to approximate the internet environment found where simulations will be run. (e.g. university campus in Australia). Real simulations may run for 
up to six hours with up to 7 client computers and 1 HQ computer. Testing this at full scale may be infeasible however, due to lack of time and access to windows based computers. Testing will have to be 
done on a smaller population of approximately 4 computers run over a shorter period. Successfully Sending text-based messages between up to 8 computers can be tested by running a simulation on the test environment. 
The system will pass this requirement if it can maintain a stable connection between all computers over the extended period of time. The system must also recover quickly from any packet loss that may occur over 
the network. Message delay over the system can also be tested within this same environment, where the delay between sending and receiving a message is recorded. Log accuracy can be tested in this same 
environment. To do this the number of messages or actions occurring in the system during the simulation can be pre-recorded then compared to the number of entries within the log once the simulation ends.

3.7 Non-Function Requirements: Feedback will be given to us about non-functional requirements by the client who wished to test themselves. The client will use the program and figure out their needs for 
non-functional requirements. Testing can also be done by the team to ensure there are no bugs and issues around the non-functional requirements. Testing for security, usability, reliability and manageability 
can be tested by both the team and the client. These will be tailor made for the client with feedback given from them to the project development team.

## 5. Development schedule.

### 5.1 Schedule

In discussion with our client Regan there are no specific deliverable dates except from a final release at the end of the course on 11/10/2019.
For thorough testing, a functional prototype would be developed as early as possible so that Regan can test in the field and provide us with feedback.

### 5.2 Budget

Our project does not require a budget as it is purely software built using free tools.
Our client does not have a budget in mind from RedR themselves. We have decided to face that if and when it comes up, due to the likelihood of us needing a budget.

### 5.3 Risks 

| Risk                                                         | Likelihood | Severity     |
| ------------------------------------------------------------ | ---------- | ------------ |
| A large number of project members are sick at critical times during the project, hindering progress resulting in us falling short of delivery goals. | Moderate   | Serious      |
| Unforeseen major changes to requirements prompting a redesign of the system. | Moderate   | Tolerable    |
| There is a natural disaster and Regan gets called out into the field to help, making it impossible to communicate with him. | Low        | Serious      |
| Expansion in number of users, or amount of data stored, requires paid services, creating unexpected budget requirements. | Moderate   | Tolerable    |
| The project requires more time to develop than expected, causing us to fall short of delivery goals. | High       | Serious      |
| Developed program has too big a learning curve, making it too difficult for users to use and forcing the client to discard it. | Moderate   | Catastrophic |
| The team focuses on non-required features and functionality (such as visuals), restricting us from finishing on-time. | Moderate   | Serious      |
| The developed software ends up requiring hardware investment for testing, making it too costly for the client. | Low        | Catastrophic |
| Employee turnover at RedR resulting in the termination of our project. | Low        | Catastrophic |
| A disaster at VUW restricting access to our files.           | Low        | Serious      |

| Risk                                                         | Strategy                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| A large number of project members are sick at critical times during the project, hindering progress resulting in us falling short of delivery goals. | Keep up team discussion and documentation so that each member knows everyone's role, a sick team member's work could then be picked up by the rest of the team. |
| Unforeseen major changes to requirements prompting a redesign of the system. | Keep up regular communication with the client about requirements, questioning what they need, especially early on, to lower the likelihood of an unforeseen change. |
| There is a natural disaster and Regan gets called out into the field to help, making it impossible to communicate with him. | Retrieve concrete requirements from Regan early on so that we could carry on the project with little to no input from him. |
| Expansion in number of users, or amount of data stored, requires paid services, creating unexpected budget requirements. | Research such possibilities and make the client aware. Ask for a potential budget from the client. |
| The project requires more time to develop than expected, causing us to fall short of delivery goals. | Investigate adopting complete components from elsewhere, make as much use from available resources as possible. |
| Developed program has too big a learning curve, making it too difficult for users to use and forcing the client to discard it. | Assign time near the end date of the project specifically for user interface design and test with people outside the team. |
| The team focuses on non-required features and functionality (such as visuals), restricting us from finishing on-time. | Assign time to specific parts of development with correct priorities based on requirements. This will keep us on track. |
| The developed software ends up requiring hardware investment for testing, making it too costly for the client. | Discuss with the client and the school about their possible testing facilities. |
| Employee turnover at RedR resulting in the termination of our project. | This event is completely out of our control and there can be nothing done about it if it happens |
| A disaster at VUW restricting access to our files.           | Incorporate a version control system such as GitLab that stores files offsite. This can be accessed remotely. |

If the project will involve any work outside the ECS laboratories, i.e. off-campus activities, these should be included in the following section.

### 5.4 Health and Safety

Document here project requirements for Health and Safety. All teams must state in this section:

1. How teams will manage computer-related risks such as Occupational Over-Use, Cable management, etc.  

Occupational Over-Use can be avoided by not working for lengthy periods of time without a break. The team has agreed to 2 10 minute breaks for each 4 hour lab session to break up the time. During this time, team members can go for a walk, get a drink, eat, or anything to aid their general wellbeing. This is stated in our team contract.
To avoid creating tripping hazards with poor cable management, the team will endeavour to keep cables off the floor where possible. The ECS computer labs are a good example of this. If not possible, the team should be made aware of any cabling around the teams working space by the owner of the cable. Team members should also scan the area around them when arriving at the space to work.

2. Whether project work requires work or testing at any external (off-campus) workplaces/sites. If so, state the team's plans for receiving a Health and Safety induction for the external workplaces/sites. If the team has already received such an induction, state the date it was received. 

The teams health and safety induction took place on 21/03/2019 and was presented by the school's Safety Officer Roger Cliffe.
Our project does not require us to go off university campus. Our lab work is done on VUW Kelburn campus, and our meeting with Regan take place on the VUW Te Aro campus.

3. Whether project work requires the team test with human or animal subjects? If so, explain why there is no option but for the team to perform this testing, and state the team's plans for receiving Ethics Approval _prior_ to testing.

Our project will be tested with human subjects. This is by requirement of our client, Regan. Once the team has developed a functional version, it will be used in the real world running disaster simulations. These tests will be fully conducted by Regan making it his ethical requirement to ensure the safety of the people using the software.

Also, the document in this section any additional discussions with the School Safety Officer regarding Health and Safety Risks. Give any further information on relevant health and safety regulations, risks, and mitigations, etc.

#### 5.4.1 Safety Plans

Project requirements do not involve risk of death, serious harm, harm or injury.

## 6. Appendices

### 6.1 Assumptions and dependencies 

One key assumption that we will have to make is that the computers that are being operated during the disaster simulation are capable of running the software that will be produced. It is also assumed that RedR will be responsible for maintaining their own network infrastructure and will be responsible for getting the software back online should it go down. 

The client suggested using KoboToolBox as a framework for the program, though the team has yet to decide whether to actually use this. This choice will be made at a later date when the time for deciding how to build the system comes. 

Client computers support basic sound playback functionality.

Client computers can support video capturing if client makes this feature mandatory.



### 6.2 Acronyms and abbreviations

Overseer: The individual responsible for communicating with each of the teams participating within the simulation.

RedR Australia: An organisation that selects, trains and deploys staff to assist in disaster situations, and is associated with the client. 

HQ: Head Quarters in the simulation, where the command centre of program is run from.

NGO: Non Government Organisation or Organisation, for short, is the name given to teams of participating trainees in the simulation.

## 7. Contributions

Riley Grice: Completed 3.3, 3.5, 3.7, 3.8, 3.9. Helped on 4.

Nathan Ellison: Mainly contributed to sections 1, 2 and 6. 

Daniel Miller: 3.2, 4

Tom Buurmans: 5, UML and class descriptions in 3.5, collaborated in coming up with use cases and ordered them for 3.2

Lachlan Keene: Document editing, accuracy and consistency. In addition to sections: 2, 3.1, 3.2 (Collaborated with Daniel and Tom) 3.4, 3.6, 4, 6

Please consult our requirement GitLab branches to see individual report progress, our strategy for merging to master document was by way of copy pasting sub sections directly.

------

## Formatting Rules 

- Write your document using [Markdown](https://gitlab.ecs.vuw.ac.nz/help/user/markdown#gitlab-flavored-markdown-gfm) and ensure you commit your work to your team's Git repository.
- Submit only a single PDF file generated from the Markdown using one of the common Markdown renderers.
- Major sections should be separated by a horizontal rule.

## Assessment 

Each contributor to the document will receive an individual assessment, based on both the finished PDF and contributions to the project visible through ``git blame``, ``git diff``, file histories, etc.  

The goal of a requirements document is the problem you are attempting to solve:  not a first attempt at a solution to that problem. The most important factor in the assessment of the document is how well it meets that goal.  The document will be assessed for both presentation and content. 

The presentation will be based on how easy it is to read, correct spelling, grammar, punctuation, clear diagrams, and so on.

The content will be assessed according to its clarity, consistency, relevance, critical engagement and a demonstrated understanding of the material in the course. We look for evidence these traits are represented and assess the level of performance against these traits. Each page of the report will be assessed at approximately the same value. Any material over the page limit may not be read and, as a consequence, reports that exceed the limit are unlikely to earn as high a mark as those which observe the page limit.

We aim to evaluate ENGR301 documents and projects as if they were real projects rather than academic exercises &mdash; especially as they are real projects with real clients. The best way to get a good mark in a document or assessment is to do the right thing for your project, your client, and your team. We encourage you to raise questions with your tutor, project champion, or course staff, as soon as possible, so you can incorporate their feedback into your work.

------
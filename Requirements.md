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

---

<div style="page-break-after: always;"></div>

# ENGR 301 Project *16* Project Proposal and Requirements Document
#### Riley Grice, Nathan Ellison, Tom Buurmans, Daniel Miller, Lachlan Keene

## 1. Introduction

One page overall introduction including sections 1.1 and 1.2.

ENGR301 Project 16 is a project that is going to be carried out by the members mentioned above for RedR Australia. The goal of the project is to be produce a piece of computer software that will be able to assist in the disaster simulations that RedR Australia carry out. The purpose of the simulations is to train new staff to both work together and maintain a level head when under the stress of attempting to maintain order among natural disaster victims. During a given simulation, there are several teams of people that are assigned different roles. There is also an overseer of the simulation that watches over the teams as they solve problems together. The overseer communicates with the teams using both phones and emails. Given that there are multiple teams participating in the simulation (up to 7 groups), the overseer would quickly gain a large workload. This is where the project purpose comes in. RedR would like to automate the process of sending the emails as well as tracking the progress of the simulation. These tasks would be rather tedious and error prone if they were performed by a human. Allowing a computer to stand in for the human operator would reduce their workload considerably and allow them to focus their attention on other tasks. It would also allow for a greater sense of realism. When the simulation teams open and read the emails they receive from the overseer, the software would be able to play sounds that emulate the atmosphere of a real disaster zone. It would make the participants feel more immersed in the scenario and thus make them act like they really were in a real disaster simulation. The software would also allow for accurate tracking of time throughout the simulation. In a given scenario, time will be scaled down (e.g. 1 hour of real time equals 1 day of simulation time) for the sake of convenience and to create a sense of pressure for the teams. 

### Client

Identify the client and their contact details

Client: Regan Potangaroa
Email: regan.potangaroa@vuw.ac.nz

### 1.1 Purpose

The purpose of the system is to reduce the total workload of the overseer in the RedR disaster simulations by automating some of their responsibilities.

### 1.2 Scope

One paragraph describing the scope of the system (9.5.2)

The goal of this undertaking is to produce a computer program that is going to be able to be used to automate some of the responsibilities of the overseer in the disaster simulations that RedR frequently run. The cost of producing such a program will be little to none as all of the development process will be able to be completed using hardware that is already available to every team member. The final deliverable product will be a single piece of software that will be capable of operating on multiple machines as well as communicating with each machine over a network operated by RedR. The program will be able to automate the sending and receiving of emails between the teams that are participating in the disaster simulation. It will also track the progress of the simulation since the time scale that is used for each simulation is not one to one (in most cases, 1 hour = one day). 

[Will need to insert diagrams] 

### 1.3 Product overview 
#### 1.3.1 Product perspective

One page defining the system's relationship to other related products
(9.5.3. but not the subsections in the standard.)

> **9.5.3 Product perspective** <br>
> Define the system's relationship with other related products. 
> 
The software product is going to be a standalone application and will not be implemented into a larger system. This is because the client currently doesn't have other systems to integrate the product with. This will be the first of it's kind and thus will not need to be related to other products. 

> If the product is an element of a larger system, then relate the requirements of that larger system to the functionality of the product covered by the software requirements specification.
> 
> If the product is an element of a larger system, then identify the interfaces between the product covered by the software requirements specification and the larger system of which the product is an element. 
>
> A block diagram showing the major elements of the larger system, interconnections, and external interfaces can be helpful.
> 
> Describe how the software operates within the following constraints:  
a) System interfaces; The kinds of other systems that the software will have to interact with is also largely unknown. It will likely have to communicate with an email system to be able to communicate with the simulation teams.
b) User interfaces; The software will implement it's own user interface to allow simulation participants to easily be able to interact with it. 
c) Hardware interfaces; The kind of hardware that the software is going to be running on is also unknown. 
d) Software interfaces; We don't know which other software our program will have to interface with. The client did not give the team a specific requirement as to which software to use. The client did ssuggest some open source software called KoboToolBox (https://www.kobotoolbox.org/), so the software the team produces will likely have to communicate with KoboToolBox. The client also told us that the machines that the software will be running on are Windows based. While this will likely not be a problem, the team will need to ensure that the language that is chosen to create the software is capable of running on a Windows machine. The version of Windows is also not known, but this will be brought up at the next meeting with the client. 
e) Communications interfaces; 
f) Memory; The program will have to be optimised such that it doesn't consume all of the memory on the machines
g) Operations; 
h) Site adaptation requirements; The software will have to be able to run on the hardware that is present in the disaster simulation setting (which will be several different Windows machines)

#### 1.3.2 Product functions

One page summary of the main functions of the product (9.5.4),
briefly characterizing the minimum viable product.

As stated in section 1.1, the purpose of the program is to automate some of the responsibilities of the overseer during the simulations that RedR run. The software will have to be capable of doing this in a number of different environments, given that the characterisitics of it's operarting environment cannot always be predicted. The main functions of th program are to be able to send messages from one party to another, and track the timescale being simulated. The program will have to be capable of doing both of these things either with or without an internet connection being available. If no internet connection is available, the program will have to be able to run on a single machine and "act" as if it were on multiple different computers by way of allowing users to login and see their own messages that they have received both from the overseer and from other participating teams. If there is an internet connection available, the program must be able to run on multiple different machines at once and allow the users to be able to communicate with each other over the network. The software must also be able to keep track of the time within the simultion (given that time is scaled down for each simulation). The minimum viable product will be a program that is simply able to send messages over a network (or emulate it on one machine) and keep track of time. Beyond that, having the program be able to send/receive videos, images and audio files would significantly enhance the illusion that the simulation participants really are in a disaster simulation. Having the program play certain audio files (such as sounds of helicopters and news reporters) on top of displaying text to the simulation participants would only further add to the realism, and would therefore be a desireable feature of the product. 

#### 1.3.3 User characteristics   

One page identifying the main classes of users and their
characteristics (9.5.5) 

There are going to be many different people that will use the system once it is deployed. Given that RedR trains a number of different people all from different backgrounds, the users of the system are going to be considerably varied. There are going to be THREE main classes of user. These include; Simulation Participant, Overseer (Government Roleplayer) and Technician. The simulation participants are going to be people who are being tested/trained for deployment into real world disaster zones. Thus, they will be relatively competent but also likey to be under some form of stress as they attempt to maintain order and solve problems related to the situtation that they have been placed in. This may affect their ability to use the software. The overseer is going to be the person responsible for communicating with the teams via email. They will not be participating in the simulation in the saem way as the teams but will still have a large workload. Given that the overseer has to communicate with each team every hour (with time scaled down to 1 hour real time equals 1 day simulation time), they are likely going to be under pressure and may not able to think clearly, which may also limit their ability to use the software. The technician is going to be the person that will attempt to fix the program should it start to display undocumented behaviour. This role could be played by anyone with some amount of technical knowledge. Their ability to use the software will likely not be reduced due to stress compared to the other users as they will not be participating in the simulation. 

#### 1.3.4 Limitations

One page on the limitations on the product (9.5.6)

While the team will put forward their best attempt to satisfy the client, there will be limitations that may slow progress. There may also be requests from the client that simply may not be able to be met simply because of the nature of the software being used to develop the final product, as well as additional time and knowledge constraints. Regan (the client) mentioned to the team that he wanted to have the final program be able to send text messages to mobile phones. This is an example of a feature that may be out of reach simply because the team have never had any experience in producing software capable of this. The machines that will run the end product software may also be their own limitation to the project. The operating system that RedR's machines run is currently unknown. The hardware of RedR's computers is also unknown but this will likely not be of concern. This is because the simulation program that will be developed will not be particularly computationally expensive as it will not have any complex graphics to render as part of the simulation. 

The users may also become a limitation of the system. The software is only as good as the people that use it. Given that the users of the software may be otherwise preoccupied with other tasks or under some kind of situational stress, the usefulness of the software may be limited based on how the users interact with it. 

Another limitation of the program may be that there is no internet connection available for the program to use. Given taht teh simulations are going to run in a very remote region of Australia (to simulate a different country), it may be the case that there is no internet connection available. In this case, the program will be required to run on a single machine but behave as if it were running on multiple machines. This may limit the usabability of the system seeing as only one person will be capable of using it at a time, while it may be that multiple people *wish* to access it at the same time. Since it will take longer for the simulation teams to be able to check messages, this may limit the usefulness of the product. 

## 2. References

References to other documents or standards. Follow the IEEE Citation 
Reference scheme, available from the [IEEE website](https://www.ieee.org/) (please use the search box).
(1 page, longer if required)

IEEE Systems and software engineering -- Software life cycle processes, IEEE Standard 12207, 2017

## 3. Specific requirements  

20 pages outlining the requirements of the system.
You should apportion these pages across the following 
subsections to focus on the most important parts of your product.

### 3.1 External interfaces

The external interface needed for our system will be Ethernet. Our program needs to support the capturing of all Disaster simulation data in real time.
Because Regan wants the ability to review data post simulation event. As such, this means that our software solution, needs to support the uploading or
the transferring of this data to an external location via Ethernet, as an external interface. The reason as to why Ethernet is the external interface for internet,
, is because our Software will be deployed onto desktop computers meaning they don't support a Wifi external interface. The external destination will be to a list
of email addresses, that will be inputed at the start of each simulation, for convenience. And the uploading of this data will be at the instant a simulation is
complete. The data will be in the format of a simple custom defined XML text file, therefore it will be small in size. Once the email has been processed via
the Ethernet External interface it will noify the HQ Terminal that the function has been accomplished.


### 3.2 Functions

This is typically the longest subsection in the document - see 9.5.11.
List up to fifty use cases (in order of priority for development), and
for at least top ten focal use cases, write a short goal statement and
use case body (up to seven pages).  Identify the use cases that
comprise a minimum viable product.

**Scenario Editor - New Scenario**

Scenario editor is the system used by the simulation administrator to create 
a list of scheduled messages to be sent to individual NGOs (clients) during 
the simulation. New Scenario is the use case for users who want to create
a new scenario (such as first-time users).

|  User Action  | System Responsibility |
| --- | --- |
|User launches Scenario editor|  |
|  |System prompts user to either create new scenario or edit existing one|
|User selects "create new scenario"|  |
|  |System prompts user to choose the number and names of NGOs and create pre-scheduled messages to be sent to them.|
|User selects NGO number and names|  |
|  | System adds NGOs to NGO list |
|User fills in pre-scheduled messages, and submits them to message list|  |
|  |System adds pre-scheduled messages to list and displays them|
|User selects "save scenario"|  |
|  | System saves scenario to local file |

**HQ - Add unscheduled message**

During the simulation, the simulation administrator may want to send additional
messages from the HQ system. Unscheduled messages can be sent imediately, or
added to the list of outgoing messages to be sent at a later time.

|  User Action  | System Responsibility |
| --- | --- |
| User selects "add unscheduled message" |  |
|  | System opens new message interface |
| User fills in relevant fields (recipient, message type (text/email), subject, message contents, message time) and optionality attaches file to message |  |
| User selects "Add message to schedule" |  |
|  | System adds message to message list |

**HQ - Begin Simulation**

The HQ system will start sending pre-scheduled messages and begin recording data
from the simulation.

|  User Action  | System Responsibility |
| --- | --- |
| User launches HQ program |  |
|  | System queries user to load scenario |
| User selects scenario from local disk |  |
|  | System query user for scenario log save location |
| User selects save location on local disk |  |
|  | System launches interface and starts opens to allow clients to connect|
| When clients have connected user presses "Start simulation" |  |
|  | System begins simulation |

**HQ - End Simulation**

The HQ system will end the messaging process and record senario data to a local
file.

|  User Action  | System Responsibility |
| --- | --- |
| User selects "end scenario"  | System automaticly ends senario when run time expired |
|  | system saves log to previously defined save destination |
|  | System ends program |

**HQ - Receive Message from NGO**

HQ system will identify and display message from any of the NGO clients

|  User Action  | System Responsibility |
| --- | --- |
|  | System indicates to user that new message has been received |
| User selects new message, displayed in message list (filterable by client NGO) |  |
|  | System opens message contents |
| User inspects message and can download any attached files |  |


**Client - Join Scenario Session**

NGO client should establish 2 way connection with HQ system.

|  User Action  | System Responsibility |
| --- | --- |
| User launches client program |  |
|  | System launches |
|  | System initiates connection procedure and prompts user for authentication for specified HQ (host)|
| User authenticates and connects to HQ |  |
|  | System prompts user to choose an NGO from the sessions NGO list |
| User selects NGO from list |  |
|  | System submits selection to host and opens main interface |

**NGO - Send Message to HQ**

|  User Action  | System Responsibility |
| --- | --- |
|  User selects "Send Message" |  |
|  | System opens new message template interface |
| User fills in relevant fields (recipient, message type (text/email), subject, message contents) and optionality attaches file to message |  |
| User submits message |  |
|  | System submits message to HQ(via internet or from same system) |

**NGO - Receive Message from HQ or NGO**

|  User Action  | System Responsibility |
| --- | --- |
|  | System indicates to user that new message has been received |
| User selects new message, displayed in message list |  |
|  | System opens message contents |
| User inspects message and can download any attached files |  |

**NGO access messages from the core system, in the event there is no internet access.**

|  User Action  | System Responsibility |
| --- | --- |
| User begins senario |  |
|  | System launches senario and sends messages to locally stored client |
| User can access client inbox/outbox  |  |

**Client reconnect to HQ while simulation running.**

|  User Action  | System Responsibility |
| --- | --- |
| User connects to HQ system |  |
|  | HQ system re-initialises client, and provides client with all sent messages|
| user accesses messages |  |

**other usecases (order needs to be checked)**

* HQ toggles between cloud hookup or local simulation.

* HQ system can change the time scale of the simulation before it starts (e.g. 1 hour real world = 1 day simulation).

* HQ system can change the simulation run time prior to the simulation starting.

* HQ User can edit message on message list from the HQ system while the simulation is running.

* HQ User can delete message on message list from the HQ system while the simulation is running.

* HQ User loads existing senario in senario editor to make adjustments, before saving to current or new file.

* NGO clients can playback audio file or open any other form of file sent attached to a message (unsure if this will be within the client application, or via a download).

* HQ user can select any outgoing message to view details and contents. This includes previously sent messages.

* NGO client users cannot access any HQ tools or information.

* Users of both HQ system and NGO client can view simulation time/day on their respective interfaces. (1 hour = 1 day simulation time).

* Unsure if NGO clients are able to communicate with other NGO clients. This needs to be clarified.

* NGO clients can create log entry (text or audio) documenting radio communication or other general information.

* HQ user can load file from local disk and atach it to message (Audio files specified to be attached, unsure about other files - images etc).

* HQ user can apply sound effects over audio recordings for immersion, unsure where sound effects will be stored.

* HQ user filters outgoing messages on message list by recipiant

* HQ user filters recieved messages by recipiant

* NGO client directly replies to message from HQ, where recipiant, subject and message fields are pre-filled.

* HQ user replies directly to client, where recipiant, subject and message fields are pre-filled.

* HQ client can view a list of connected NGO clients.
 
* HQ can kick NGO client from session.


### 3.3 Usability Requirements
See 9.5.12. for most systems, this will be around one page.

Define usability (quality in use) requirements. Usability requirements and objectives for the software system include measurable effectiveness, efficiency, and satisfaction criteria in specific contexts of use.

Usability is the Program's ability to elegantly run desired features specified by the client.

Usability Requirements and Objectives:

Offline:
Run a disaster scenario over on one computer where a the HQ and the organization
will run on. This will ensure the program can be run anywhere for training
purposes.

Online:
Run a distaster scenario with two types of programs running while communicating
with each other over the internet. The two types of programs running are the
Organization(s) and one HQ.

Both the HQ and Organization(s) must be able to receive and send messages to each
other. These messages are videos, emails, sounds and pictures, this is to
increase the immersion for the organization using the program. These must reach
their destination with one minute.

All messages are to be recorded by the HQ so that a review of what happened in
the Simulation Program can be analysed after the Simulation.

Measureable Effectiveness:
The effectiveness of the Program will be in the recording of the Simulation. The
recording will be analysed and the HQ can see what good and bad actions have been
taken by organiztions. Training over time using the Simulation will give feedback
to the organzations and trainees' actions can be seen, critqued and improved.

Efficiency:
All messages must be sent within a minute and files loading scenarios
must not take 5 minutes to load.

Satisfaction Criteria of Specific contexts:
Creating a functional offline version of the Disaster Simulaion program. Where
scenarios can be loaded, run and recorded with an organization using the simulation
sending messages between the HQ and the organization on the same computer.
Replaying the recording will be important for analytical purposes for RedR
Australia, including a replay of the scenario with all messages sent with time
stamps is a must.

### 3.4 Performance requirements

Performance is an important requirement for this system due, to the real time nature of scenario simulation. The core feature of the program will be to support
instantaneous text based messages between the 1 to 7 core Group terminals and the Single HQ terminal concurrently. As such, this dictates that the delay between
sending and receiving messages must not exceed 10 seconds. Should this performance requirement not be met, then this will result in unresponsive and ineffective
disaster based scenarios. In addition, there will be concurrent terminals that rely on their parent (HQ), as well as sibling (Group) terminals, all being
synchronised with one another. Therefore, this means that this implies that the HQ terminal must constantly be monitoring the performance of group terminals to
ensure that this critical performance requirement is being satisfied. Another critical perfromance requirement is that the program has the capacity to log every
event that has occured throughout the simulation in real time. Meaning that should there be a delay in this feature then the log time entries wil not be accurate.
Moreover, due to the size of the data being transferred, between a limited amount of terminals, being relatively small, it ensures that a large computational
overhead is not necessary for the system in which we need to build.



### 3.5 Logical database requirements

See 9.5.14. for most systems, a focus on d) and e) is appropriate,
such as an object-oriented domain analysis. You should provide an
overview domain model (e.g.  a UML class diagram of approximately ten
classes) and write a brief description of the responsibilities of each
class in the model (3 pages).

a) Types of information used by various functions:

Pictures: Displayed on the User Interface and being sent from HQ to Organizations.

Videos: Displayed on the User Interface and being sent from HQ to Organizations.

Emails/Messages: Displayed on the User Interface and being sent to and from
every player in the simulation.

Sound Effects: Displayed on the User Interface and being sent from HQ to Organizations.

Scenario File (for loading): Loaded file in the HQ which will send messages/emails, 
pictures, videos and sound effects from this file.

Recording File: This will record all information sent and recieved by all players 
in the Simulation with the time of the action associated.


b) Frequency of use:
The Simulation will be used six times a month.

c) Accessing capabilities:
HQ: Have access to the scenario's entire data collection, being able to view 
every video, message, picture and sound. HQ i running the Simulation and needs
to have full control and visibility over every organization. 

Organization(s): Have limited access, they will only be able to view what has 
been sent to them by the HQ and other Organizations. This done to make the 
Simulation as real as possible to put pressure and need on communication between
organizations and HQ.

d) Data entities and their relationships:
A data entity is an object in a data model. Data is typically designed by breaking things down into their smallest parts that are useful for representing data relationships

e) Integrity constraints:
Integrity constraints provide a way of ensuring that changes made to the database by authorized users do not result in a loss of data consistency.

f) Data retention requirements:
Keeping recorded data

Overview Domain Model/UML Classes and Description for every Class

The UML diagram is located in the teams GitLab repo:
https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/P16_Diagram.jpg

| Class              | Description          |
| ------------------ | -------------------- |
| ScenarioCreator    | A stand-alone program for creating a disaster scenario. |
| PlayRecorder       | A stand-alone program for running over a recorded simulation. |
| HQ                 | A core class for running the simulation, providing all the functionality from the HQ. |
| ScenarioLoader     | A class that loads in the scenario file for the HQ to run. |
| Recorder           | A class that monitors the events of the HQ and records it with timestamps. |
| HQUI               | The user interface for the HQ. |
| HQSender           | Handles the sending of messages to clients. |
| HQReceiver         | Handles receiving messages from clients. |
| ClientSender       | Handles the sending of messages to the HQ. |
| ClientReceiver     | Handles receiving messages from the HQ. |
| Client             | A core class for the functionality of clients. |
| ClientUI           | The user interface for the HQ. |


### 3.6 Design constraints



###Project Limitations.

This project has design constraints imposed upon it by project limitations. These Constraints will dictate the way in which our project Development Life Cycle is affected. A project limitation constraint is time. We are bound by our delivery date in October, in addition to Regan's request of frequent updates to show how our project is progressing. As such, we must plan our time accordingly, using agile time management practices.

Another project limitation constraint is our budget. We have been allocated a budget of $0. This is very reasonable however, because firstly, we are working for a charity organisation. And secondly because this project does not require the purchasing of licensed software packages, nor additional physical hardware.

Our next project limitation is that the program must have the capacity to function in multiple environments. Whereby, these environments will vary in terms of there properties to one another. These properties being access to the external internet and the quantity of concurrent simulation computers. This variance is a result of the real world simulation environment being dynamic, as Regan has stated that the program will be run in varying locations, with some being more equipped in terms of there Hardware. This constrains us, as we are required to develop a program that supports features that may mutually oppose each other, proving a difficulty to develop in regards to.

The next project limitation is in relation to the latter. Due to the the uncertainty of not knowing exactly what environments  our program will be deployed into, we must build our program so that it can be deployed and applicable to a theoretical limitless amount of computing environments. This is a major constraint for us as we must consider seriously our programming language of choice to meet this requirement adequately.

###External Standard Compliance.
An external standard that is imposed on our project is the requirement of adhering to the IEEE 12207-2017 Systems and software engineering - Software life cycle
processes document. This document outlines how when developing Software, for utilisation by organisations and for the public, there is a framework of best
practice to follow. This framework includes processes, that when applied correctly, through development cycles, will result in the satisfaction of our client.
The content of processes, in this standard, that is relevant to our project is summarised as follows. The standard writes how the Software Life Cycle Process is
split into four main parts.

###Agreement Process
Pertains to how there is a procurement phase. Whereby, we need to ensure that we are on clear established agreement terms, such that us as developers and Regan
the client have the same mutual understanding of what the project requirements are.

###Technical Management Processors
Pertain to what strategies we will be making use of to organise our work in a structured direct manner. Tools that will be used to achieve this are Task Planning
via Issues feature in Gitlab, Decision Management by way of keeping log records in Git that track our progress to decide what features to dedicate time toward
next, and risk management which will be addressed in Sub-Section 5.



###Technical Processors
Are technical based actions that we will utilise to ensure for software quality throughout development. These processors are inclusive as follows.

    ###Architecture Design
    That will allow us to effectivly determine what platforms we will need to implement our overall solutions.
    ###Implementation.
    Is the act of writing our code, upto this phase, we have ensured that this phase will be achieved comprehensivly, as the aforementioned processes would
    have set us up adequately in terms of preperation.
    ###Integration Process
    Which is the step of combining our individual components into one coherent functional system.
    ###Verification Process
    Is the process of monitering the way in which we are building our software to ensure that it is upto a high coding standard.
    ###Validation Process
    Whereby we reflect of what we have accomplished thus far, to review in regards to assuring that features we have implemented are in accordance
    to the established requirements.
    ###Operation and Maintenance Process
    Is the action of partiarly deploying our program at Regans disposal, such that he will be able to provide us with feedback that outlines wether
    the program meets his expectations or not, indicating where further work needs to be dedicated towards.




### 3.7 Nonfunctional system attributes

Present the systemic (aka nonfunctional) requirements of the product
(see ISO/IEC 25010).
List up to twenty systemic requirements/attributes.
Write a short natural language description of the top nonfunctional
requirements (approx. five pages).

1. Performance Requirements
    - Messages that are sent and recieved by Organizations and the HQ must be sent to each other within a minute. Messages must be sent and recieved within a minute because it needs the Simulation must be similar to that of sending messages in a real disaster respose.
    - Videos, Pictures and Sounds must be played when received and opened by an Organization. These are played to create a more immersion in the simulator, this will be how organizations will react to important news bullitens and updates during a disaster.
    - Must be able to run offline and online, offline is necessary because the Simulation may be used to train people where there is no internet. The online version will be more useful, as it can handle more users in the simulation through web based design.
    - Offline will run from one computer and have the ability to be split on multiple monitors connected to the computer.

2. Scalability
    - New scenarios must be able to load onto the HQ program. 
    - After loading new scenarios, the HQ program must be able to run it with the organizations.
    - Amount of Organizations running with the HQ in the Simulation can be changed for different scenarios. Different senarios means the orginazations can train for different environments and different disasters.
    
3. Capacity
    - The online version must handle messages between atleast seven Organizations and one HQ. This would be as if a normal network was used in real life for the organizations, a network that will have capacity for communication.
    - The offlive version will only handle one user at a time during the Simulation. An HQ will run simulataneously to a client organization on the same computer.
 
4. Availability
    - The Simulation will be functional once the HQ has loaded the scenario and has Organizations connected.

5. Reliability
    - There must be an error detection system for messages that have failed to be received or sent, and for failed scenario videos, pictures and sounds.
    - There must be a error correction system for failed messages, pictures, videos and sounds.

6. Modifiablilty
    - During the Scenario, the HQ should be able create new scenario messages and be able to send them to the Organizations. This is for the HQ running the simulation to control the scenario, this control allows the HQ to add new problems and add more into the Simulation.
    - Scenarios files can be edited when the Simulation is not running. If changes in the scenario need to be made by RedR Australia, then they can do it to fit their training purposes.
    - During the Scenario, the HQ should be able to fire, prevent or delay any event from the loaded Scenario from executing. Allows more control over the Simulation for HQ.

7. Maintainability
    - A process where if a failure occurs during the Simulation, the recording of everything by the HQ will be able to be used the recorded error to find the bug(s). This will be for bug fixing and testing, for development of the Project and new scenarios created or modified.

8. Serviceability/Supportability
    - The online version will need an installation for the HQ program and the Organizations can enter the simulation via online clients.
    - Create a User Manual for the users. This is because the Project Team cannot deploy the Project in Australia.
    - To install the Disaster Simualtion, a tutorial with instructions will be made to show how it will be done. This is done so other RedR Organizations can use this.
    - The offline version will need to be installed.
    - A tutorial will be made to guide organizations on how to use the web based clients.

9. Security
    - RedR Australia would like to keep all scenario files encrypted and only decrypted when running the Simulation on the HQ program. Privacy for RedR Australia's scenarios is stressed by them.
    - All organization and the HQ prgrams data will be wiped when the programs are shutdown. Except for the recoding of the Simulation by the HQ which will be exported out.

10. Portability
    - Other RedR organizations may want to use the Disaster Simulation Program to train up more Disaster response organizations around the world. The Simulation Program should be able to be emailed between RedR Organizations.

11. Manageability
    - HQ will have manage the scenario and time of the Simulation. This will be in their HQ user interface for HQ user to utilize. Allows the HQ controls for pausing and time contraints.

12. Environmental
    - Online version: The environment will be in a regular workplace. A Program will run on serveral computers all connected via the HQ's Program.  
    - Offline version: The environment can be anywhere, our client Regan said "We may have people using the simulation in Afganistan and Iraq.", the offline version should run anywhere in the world for easy access training purposes. 

13. Data Integrity
    - The Recorded data file must have errors detected and displayed on the file as bad data. Can be used for bug fixing and testing, but so that unreliable data is easily spotted in the recording file of the simulation.
    - The scenarios will need a token or password to decrypt the scenario file. This will ensure security of the scenarios even if the scenario files are stolen.

14. Usability
    - Client - Display sent and received messages (similar to an email inbox). In the a real disaster response, emails will is crucial to organizing the response, so having the program messages simlar to an email will help the immersion.
    
    - HQ 
         - Display a list loaded events from the scenario file and what times the events will execute. 
         - Display sent and received messages (similar to an email inbox). 

15. Accuracy
    - Recorded data in the recorded data file must contain the type of data (picture, video, message, sound), the content of the data, the time of recording and if there was an error in the recording. 


### 3.8 Physical and Environmental Requirements 

For systems with hardware components, identify the physical
characteristics of that hardware (9.4.10) and environment conditions
in which it must operate (9.4.11).  Depending on the project, this
section may be from one page up to 5 pages.

There is no hardware needed for this project.

However our software must be used in different environments. Two different versions will be able to run. One offline and online.

Online: Mainly in office buildings with internet connection and many computers on the same network.

Offline: Anywhere in the world, no internet connection required and only one computer necessary to run the simulation.

RedR are going to be running their simulations in an isolated section of the Australian outback. This area is going to be a very dry, hot and arid place. Some simulations are going to run inside buildings (such as in old school buildings) and some are going to be run outdoors. For those simulations that are run indoors, there will more than likely be internet access. It may be the case that some classes don't have internet access. The program will have to be able to function whether it has access to the internet or not. Without internet, the software will run locally on a single machine. It will distinguish users via a type of login system and each user will only be able to access specific parts of the program. 

### 3.9 Supporting information

see 9.5.19. 
The SRS should explicitly state whether or not these information items are to be considered part of the
requirements. The SRS should contain additional supporting information including:

a) Sample input/output formats, descriptions of cost analysis studies, or results of user surveys:
    - Inputs from the HQ and the organizations will be in txt format for sending basic messages to each other.
    - There will be feed back from testing by our client Regan who will test it himself and send constant feedback.
    - Output is the recording file, which will contain txt, jpeg and mp3.

b) Supporting or background information that can help the readers of the SRS:
    - RedR Austrlia's Disaster Simulation Program is to help train people in organizations. Training will consist of communicating with other organizations. The trainees will have to get funding and make a budget for supplies to respond.
    - This program will help train people for real world disaster response in organizations.

c) A description of the problems to be solved by the software:
    - Simplifying the training simulation program for the RedR Australia training team.
    - Allowing Offline training for disaster simulations on a computer anywhre in the world. This allows quick response training to disasters around the world for RedR Australia.
    - Allowing Online training with multiple teams witha uniform software to communicate and train. This will solve having the use emailing websites to communicate during the simulation.
    - The online version will allow training to be done easily by many people around the world and not have to be run onsite by only RedR Australia.

d) Special packaging instructions for the code and the media to meet security, export, initial loading, or other
requirements:
    - Load scenario file which is encrytped.
    - Recording file of entire simulation with stamp marks for all recordings.
    - Recording file will need to be replayed through the Program for easy analysis. 

## 4. Verification

3 pages outlining how you will verify that the product meets the
most important specific requirements. The format of this section
should parallel section 3 of your document (see 9.5.18).
Wherever possible (especially systemic requirements) you should
indicate testable acceptance criteria.

## 5. Development schedule.

### 5.1 Schedule

Identify dates for key project deliverables: 

In discussion with our client Regan there are no specific deliverable dates except from a final release at the end of the course on 11/10/2019.
For thorough testing, a functional prototype would be developed as early as possible so that Regan can test in the field and provide us with feedback.

### 5.2 Budget

Our project does not require a budget as it is purely software built using free tools.
Our client does not have a budget in mind from RedR themselves. We have decided to face that if and when it comes up, due to the likelihood of us needing a budget.

### 5.3 Risks 

Identify the ten most important project risks to achieving project goals: their type, likelihood,
impact, and mitigation strategies (3 pages).

| Risk      | Likelihood    | Severity      |
| --------- | ------------- | ------------- |
| A large number of project members are sick at critical times during the project, hindering progress resulting in us falling short of delivery goals. | Moderate | Serious |
| Unforeseen major changes to requirements prompting a redesign of the system. | Moderate | Tolerable |
| There is a natural disaster and Regan gets called out into the field to help, making it impossible to communicate with him. | Low | Serious |
| Expansion in number of users, or amount of data stored, requires paid services, creating unexpected budget requirements. | Moderate | Tolerable |
| The project requires more time to develop than expected, causing us to fall short of delivery goals. | High | Serious |
| Developed program has too big a learning curve, making it too difficult for users to use and forcing the client to discard it. | Moderate | Catastrophic |
| The team focuses on non-required features and functionality (such as visuals), restricting us from finishing on-time. | Moderate | Serious |
| The developed software ends up requiring hardware investment for testing, making it too costly for the client. | Low | Catastrophic |
| Employee turnover at RedR resulting in the termination of our project. | Low | Catastrophic |
| A disaster at VUW restricting access to our files. | Low | Serious |

| Risk      | Strategy      |
| --------- | ------------- |
| A large number of project members are sick at critical times during the project, hindering progress resulting in us falling short of delivery goals. | Keep up team discussion and documentation so that each member knows everyone's role, a sick team member's work could then be picked up by the rest of the team. |
| Unforeseen major changes to requirements prompting a redesign of the system. | Keep up regular communication with the client about requirements, questioning what they need, especially early on, to lower the likelihood of an unforeseen change. |
| There is a natural disaster and Regan gets called out into the field to help, making it impossible to communicate with him. | Retrieve concrete requirements from Regan early on so that we could carry on the project with little to no input from him. |
| Expansion in number of users, or amount of data stored, requires paid services, creating unexpected budget requirements. | Research such possibilities and make the client aware. Ask for a potential budget from the client. |
| The project requires more time to develop than expected, causing us to fall short of delivery goals. | Investigate adopting complete components from elsewhere, make as much use from available resources as possible. |
| Developed program has too big a learning curve, making it too difficult for users to use and forcing the client to discard it. | Assign time near the end date of the project specifically for user interface design and test with people outside the team. |
| The team focuses on non-required features and functionality (such as visuals), restricting us from finishing on-time. | Assign time to specific parts of development with correct priorities based on requirements. This will keep us on track. |
| The developed software ends up requiring hardware investment for testing, making it too costly for the client. | Discuss with the client and the school about their possible testing facilities. |
| Employee turnover at RedR resulting in the termination of our project. | This event is completely out of our control and there can be nothing done about it if it happens |
| A disaster at VUW restricting access to our files. | Encorporate a version control system such as GitLab that stores files offsite. This can be accessed remotely. |

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

One page on assumptions and dependencies (9.5.7).

One key assumption that we will have to make is that the computers that are being operated during the disaster simulation are capable of running the software that will be produced. It is also assumed that RedR will be responsible for maintaining their own network and will be responsible for getting the software back online should it go down. 

The client suggested using KoboToolBox as a framework for the program, though the team has yet to decide whether to actually use this. This choice will be made at a later date when the time for deciding how to build the system comes. 

### 6.2 Acronyms and abbreviations

One page glossary _as required_.

Overseer: The individual responsible for communicating with each of the teams participating within the simulation.
RedR Australia: An organisation that selects, trains and deploys staff to assist in disaster situations, and is associated with the client. 

## 7. Contributions

A one-page statement of contributions that lists each member of the
group and what they contributed to this document.

Riley Grice: Completed 3.3, 3.5, 3.7, 3.8, 3.9.

Nathan Ellison: Mainly contributed to sections 1, 2 and 6. 

Daniel Miller: 

Tom Buurmans: 5, UML and class descriptions in 3.5

Lachlan Keene: 


---

## Formatting Rules 

 * Write your document using [Markdown](https://gitlab.ecs.vuw.ac.nz/help/user/markdown#gitlab-flavored-markdown-gfm) and ensure you commit your work to your team's Git repository.
 * Submit only a single PDF file generated from the Markdown using one of the common Markdown renderers.
 * Major sections should be separated by a horizontal rule.


## Assessment 

Each contributor to the document will receive an individual assessment, based on both the finished PDF and contributions to the project visible through ``git blame``, ``git diff``, file histories, etc.  

The goal of a requirements document is the problem you are attempting to solve:  not a first attempt at a solution to that problem. The most important factor in the assessment of the document is how well it meets that goal.  The document will be assessed for both presentation and content. 

The presentation will be based on how easy it is to read, correct spelling, grammar, punctuation, clear diagrams, and so on.

The content will be assessed according to its clarity, consistency, relevance, critical engagement and a demonstrated understanding of the material in the course. We look for evidence these traits are represented and assess the level of performance against these traits. Each page of the report will be assessed at approximately the same value. Any material over the page limit may not be read and, as a consequence, reports that exceed the limit are unlikely to earn as high a mark as those which observe the page limit.

We aim to evaluate ENGR301 documents and projects as if they were real projects rather than academic exercises &mdash; especially as they are real projects with real clients. The best way to get a good mark in a document or assessment is to do the right thing for your project, your client, and your team. We encourage you to raise questions with your tutor, project champion, or course staff, as soon as possible, so you can incorporate their feedback into your work.

---
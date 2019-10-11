# The Final Project Report

**Project:** *Disaster Simulator*
**Client:** *Regan Potangaroa*  
**Date:** *11 October 2019*

## 1. Project Objectives

To create a disaster simulator software product for training disaster relief workers, in which is more effective for the trainees and trainers than their current solution to the problem of manually simulating disasters. This is ensured for by way of automating many current manual actions involved during the scenario for the trainers, in addition to increasing simulation immersion for the trainees. A portable offline solution would also allow for use in adverse conditions such as during disasters. Moreover, this product would also enable for the generation of a structured analysis report of the trainees, regarding actions that they invoked in response to simulation events, throughout each disaster simulation. 

## 2. Summary of Project Results

This Team has produced a product that is capable of increasing efficiency and immersion of manual approaches to disaster simulation. This was achieved as a result of implementing and designing a grouping of key disaster simulation required features for the intended user base. These features are inclusive of, however not limited to; Scenario Creation, Event Management/Displaying, Dynamic Environments Adaptability, Entity Communication, and Reflection Documentation. The team believes that within these product features the client will be satisfied by the level of quality delivered as they directly help the training of disaster relief workers.

## 3. Original and Delivered Scope

### Original Scope

[From Requirements Scope](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/wikis/Team%2016/Requirements)

"The Scope of this undertaking is to produce a computer program: that is going to be used in order to automate some of the responsibilities of the Overseer in the disaster simulations that RedR frequently run. The cost of producing such a program will be little to none, as all of the development processes will be able to be completed using hardware that is already available to every team member and to RedR. The final deliverable product will be a single piece of software, that will be capable of the following key features that define the scope.

1. Ability to load dynamic simulation files, from an Overseer at HQ machine, that dictates for the details of each type of scenario and such that Overseer has main control over the current simulation.
2. Operating on 1..* Machines, whereby a single machine implies no access to the internet.
3. Inter-communication between Overseer at HQ and NGO's at Client machines, each machine being over network infrastructure operated by RedR, and communication via superficial emails and texts between teams and Overseer at HQ. Communication may have embedded imagery and audio files.
4. Tracking for the progress of the simulation, a varying time scale that is used for each simulation.
5. Custom creation of varying scenario situations.
6. Real-time interfering with the scenario by Overseer.
7. Review of the events that occurred in past simulations, with functionality to export scenario results.
8. Ability to function in a range of limited environments on varying hardware."

### Delivered Scope

The following discussion serves as to outline that each area of the project scope has been met. And it does so by detailing current product evidence to demonstrate how each scope are has been met.

#### 1. Ability to load dynamic simulation files, from an Overseer at HQ machine, that dictates for the details of each type of scenario and such that Overseer has main control over the current simulation.

[Example File Breakdown](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/ExampleScenarioFilePic.PNG)

Post user interaction with the scenario editor, a simulation zip file is generated. Whereby, each of these zip files contain meta simulation information, in addition to simulation media files (Documents, Videos, Audio, Imagery). This file is then parsed through to the server to set up the given simulation structure.

#### 2. Operating on 1..* Machines, whereby a single machine implies no access to the internet.

Each simulation can either be run in an offline or online mode. Online is possible when the given physical simulation environment supports a standard LAN with a machine (Laptop/Desktop irrespective of OS, excluding the host/server in which Windows 10 is required) for each participating entity. However, when a standard LAN is not present then the offline mode is required. This offline mode means that each participating entity of the simulation is required to make use of a single Windows 10 computer, as host and the client. Whereby, the users must make use of this computers browser, with a tab to represent each entity, such that participating simulation user groups must rotate in order to share their access to this sole machine.

#### 3. Inter-communication between Overseer at HQ and NGO's on Client machines, each machine being over network infrastructure operated by RedR, and communication via superficial emails and texts between teams and Overseer at HQ. Communication may have embedded imagery and audio files.

[Emailing Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/emailer.PNG)

[Messaging Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/Messaging.PNG)

[Event Display Report Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/ViewEvent.PNG)

Inter-communication between the trainer (HQ) and the trainees (NGO's) has been achieved as intended by implementing a replication of email / texting systems. Furthermore, for replicated emails, Multimedia events can be embedded within, in the form of pdf, mp4, mp3, and jpg file types.

#### 4. Tracking for the progress of the simulation, a varying time scale that is used for each simulation.

[Timeline Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/timeline.PNG)

[Timer Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/timer.PNG)

The Overseer has access to a timeline of simulation events with each event associated with each trainee group at their designated event sending times. The Overseer can click on these events to observe there details and make changes. Regarding the timer, the Overseer and NGOs will be able to keep track of time during the simulation and measure it against their progress in the duration of the scenario simulation. Lastly, regarding time an hour to day ratio can be specified when constructing a file, to input how many real time hours should correspond with artificial simulation days.

### 5. Custom creation of varying scenario situations.

[Create or Edit Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/CreateOrEdit.PNG)

The Overseer can choose to either create a new scenario simulation file or edit an existing scenario simulation file.

[Scenario Creation Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/editing.PNG)

Regardless of which option they choose, they will be displayed with this interface, either with pre filled in UI elements if they chose to edit and existing file or without, if they choose to create a new simulation. Various scenario options are supported here including the offline/online scenario "mode", title, duration, time scale, property specifying for each new and existing NGO, event tags, event construction (including time of occurrence, recipient, subject, media type ) and library event items (in which are quick add real time scenario event additions) . 

### 6. Real-time interfering with the scenario by Overseer.

[Editing Live Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/LiveEdit.PNG)

The Overseer can use the live editing from the timeline feature to control events details such as time, recipient, and deletion. New events can be created and scheduled from scratch or via pre-set library items that are created during the scenario creation. This gives more control to the Overseer during the simulation training and allows for interfering.

#### 7. Review of the events that occurred in past simulations, with functionality to export scenario results.

[End of Simulation Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/pdfReivewPopUp.PNG) 

Shows the download pop up of the review PDF.

[Status Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/status.png)

NGOs will say how they're going each hour and respond to the pop up with how they feel their NGO group is doing so far.

[Review PDF Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/ReviewPDF.PNG)

These PDF's are generated post user requesting for this file, this contains the event response conversations between the NGOs and HQ, with their response times and chosen best fit tag. This document also includes the statuses of how the NGOs felt they were going for each simulation hour in the training simulations. These PDF's will be analyzed after the simulation by the Overseer in a breakdown for them to review and talk about with the NGOs.

#### 8. Ability to function in a range of limited environments on varying hardware.

This software solution has the capacity to very versatile in terms of the networking environments it supports. Because this product scales from functioning on a single Windows 10 computer as host/client all the way up to supporting a LAN that features between 2-7 laptop/desktop devices. In addition to this feat, this software solution is fully portable and localized to a single directory to function, ensuring that external software dependency issues are minimalized, with regards to how little setup/maintenance is required to get this product functioning as intended.

#### Others additional scope goals

- Colour Changing of the system 

[Colour Changing Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/ColourChanger.PNG)

This creates less offense to different organisations who wish to use the software. 

- Licensing

The client wanted the software to be open source and for no one to be able to commercialise it. Therefore, we have used the GNU General Public License v3.0 which allows for it to be open source and any parties that choose to modify it are nevertheless prevented from profiting from it.

## 4. Original and Actual Schedule

#### Original Schedule

| Epic                      | Epic Schedule   |
| ------------------------- | --------------- |
| Minimal Viable Product    | May 21 - Jun 7  |
| Preliminary UI Design     | Jun 7 - Jul 16  |
| CI/CD Pipeline            | Jul 8 - Jul 22  |
| Running Scenario          | Jul 16 - Sep 16 |
| Creating/Editing Scenario | Jul 16 - Sep 16 |
| Reviewing Scenario        | Jul 16 - Sep 16 |
| Polishing/Testing/Closure | Sep 17 - Nov 1  |

#### Actual Schedule

| Epic                      | Epic Schedule   |
| ------------------------- | --------------- |
| Minimal Viable Product    | May 21 - Jun 7  |
| Preliminary UI Design     | Jun 7 - Jul 16  |
| CI/CD Pipeline            | Jul 8 - Aug 19  |
| Running Scenario          | Jul 16 - Sep 16 |
| Creating/Editing Scenario | Jul 16 - Sep 16 |
| Reviewing Scenario        | Jul 16 - Oct 1  |
| Polishing/Testing/Closure | Sep 17 - Nov 1  |

There are two main discrepancy's between the planned schedule and the actual schedule. The first is the CI/CD Pipeline. The team underestimated the work required for this aspect of the project particularly as CD was never apart of this project scope hence given a low priority for the team over trimester 1.  So come trimester 2, the team is given a new project team member who was then naturally assigned the role of CD , as they claimed they were competent in this field. However, now come the mid tri break, little objective work has been contributed towards CD by this new Team member. Therefore, another team member took it upon themselves to deploy over the mid trimester break, as they realised that this project aspect was severely lacking, which resulted from the team poorly managing this. As well as the new team member explicitly refusing to perform their assigned task. Therefore, this explains why this discrepancy occurred.

The second discrepancy was regarding the review aspect of this product. The main reasons for this were that other features took longer than expected to develop, and that the Team had performed a poor job at upskilling team members about how this project functions. This then resulted in the team member essentially assigned to this epic having little understanding as to what was required of them and rightly so. Therefore, towards the end of the schedule this project aspect was not developed productively and hence its due date had to be pushed back which was not planned for. 

## 5. Delivered Expenditure

Originally the project had no budget. There were no foreseen costs.

However, in order to set up a pipeline to continuously deploy for demonstration the team used Heroku as an external host. This cost totaled to $21 for 2 months of use.

## 6. Project Self-Assessment

The delivered product is a unique use-case for a Node.js server which allows for the ability to be used in a range of environments, including changing network connection and devices - both things not possible on traditional servers. This causes a required learning curve for initially using the program with no native executable and having to settle for compressed archives for portability due to the complex nature of a local server over a traditional client. The program achieves full synchronization between clients and the server, keeping the real-time feel and immediacy that's important for a disaster simulation. Flexibility with scenarios is well implemented with the ability to adapt your disaster scenario to fit your training method, prior to or during a simulation. Editing during the simulation triggers updates to all clients keeping everything running seamlessly.

## 7. Lessons Learned Summary

There were a number of lessons learned from both positive and negative experiences throughout the development process. 

The team held several retrospective meetings toward the end of the development process. The retrospectives were an effective tool for determining what worked and what didn't within the team. They improved the project team’s productivity and cohesion directly after each session, and in retrospect should have been utilized much earlier in the development process.

Peer programming was great for developing features, bug fixing, and creating solutions to problems. Both people involved in peer programming could have a similar perspective of how the code they’d written works. This means the code can be developed quicker and safer with a clear discussion of the two programmers. The team agreed in retrospectives to use peer programming more throughout the middle towards the end of the project for the development of certain features and bugs.

Breaching the IP agreement by using an unauthorized communication tool was one of the biggest failures and learning experiences in the project. Although there is no real excuse for using the unauthorised tool, the project team learned that it is never a good idea to breach an agreement such as this. And that it is extremely important to address issues such as this early before they become a habit and out of hand.

More criticism within the group was also discussed in the retrospectives, where features created by members of the project would not be subjected to enough scrutiny and criticism for their approach and ideas of how they were going to implement the feature. The group now thoroughly discusses new features and with more ideas involved it allows for better solutions and designs of the feature. 

Human resource management was another issue within the project team. Inter team arguments and disagreements on ideas was common and constructive, however this escalated in a few circumstances. The learning experience in this case was to address future team issues like this earlier while they are minor, rather than leaving them to fester and become much larger problems.

Planning sprints was discussed as very positive during retrospectives and the team felts that the milestones and sprints with certain deliverable goals were very good and useful for productivity and  the development of the project. Reaching our goals with few latencies and most on time. The project will be delivered on time to the client due to great planning from the team.

## 8. Procurement Summary

Our only procured service was the use of Heroku. This was used as a host for running the web app online for presentation and testing purposes. Since our requirements were always to have the web app being hosted locally for full portability and local network access, Heroku was just a convenient way to present and allow people to easily test the program. On delivery and transitioning according to the transition plan, the Heroku service has been closed.
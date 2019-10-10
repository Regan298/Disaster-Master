# The Final Project Report
**Project *Disaster Simulator*:** 
**Client:** *Regan Potangaroa*  
**Date:** 11 October 2019

## 1. Project Objectives

Create a disaster simulator for training disaster relief workers, which is more effective for the trainees and trainers. The software will be more effective by automating many current actions during the scenario for the trainers and give a structured analysis to the trainees about their progress after the disaster simulation. 


## 2. Summary of Project Results

A statement, summarising the results of the project; what actually resulted from project execution. This should convey to the reader those aspects of the project results which are not obvious from other documents.

## 3. Original and Delivered Scope

The things that are within the scope of the delivered project; the things that the delivered project can do. This should convey to the reader those aspects of the project results which are not obvious from other documents. If the project has a significant Issue backlog on delivery, a summary of the pending features, why these features were not completed and how they could be picked up by others if project work was to resume.

### Original Scope

[From Requirements Scope](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/wikis/Team%2016/Requirements)

The Scope of this undertaking is to produce a computer program: that is going to be used in order to automate some of the responsibilities of the Overseer in the disaster simulations that RedR frequently run. The cost of producing such a program will be little to none, as all of the development processes will be able to be completed using hardware that is already available to every team member and to RedR. The final deliverable product will be a single piece of software, that will be capable of the following key features that define the scope.

1. Ability to load dynamic simulation files, from an Overseer at HQ machine, that dictates for the details of each type of scenario and such that Overseer has main control over the current simulation.
2. Operating on 1..* Machines, whereby a single machine implies no access to the internet.
3. Inter-communication between Overseer at HQ and NGO's at Client machines, each machine being over network infrastructure operated by RedR, and communication via superficial emails and texts between teams and Overseer at HQ. Communication may have embedded imagery and audio files.
4. Tracking for the progress of the simulation, a varying time scale that is used for each simulation.
5. Custom creation of varying scenario situations.
6. Real-time interfering of the scenario by Overseer.
7. Review of the events that occurred in past simulations, with functionality to export scenario results.
8. Ability to function in a range of limited environments on varying hardware.


### Delivered Scope

Every scope goal has been met.

### 3.1. Ability to load dynamic simulation files, from an Overseer at HQ machine, that dictates for the details of each type of scenario and such that Overseer has main control over the current simulation.



### 3.2. Operating on 1..* Machines, whereby a single machine implies no access to the internet.

- Offline and Online 

The simulations can be run on when the computer is offline or online, the NGOs training in the scenario simulation can use different tabs on Google Chrome on one computer to do their training, this allows offline use for mutiple NGOs to train. As well as that, NGOs can use other computers that are on the same network and connect into the scenario simulation via a link from the Overseer, no selection of offline or online is necessary as both run at the same time if possible. Very versitile.


### 3.3. Inter-communication between Overseer at HQ and NGO's at Client machines, each machine being over network infrastructure operated by RedR, and communication via superficial emails and texts between teams and Overseer at HQ. Communication may have embedded imagery and audio files.

- Emailing System 

[Emailing Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/emailer.PNG)

The replicated email system allows for the similar use of emails for NGOs to communiate to the Overseer during the simulation. 

- Messaging System 

[Messaging Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/Messaging.PNG)

Replicated messaging system allows NGOs to communicate to the Overseer and other NGOs during the simulation. The messaging system is very similar to texting and the Messenger application for phones.

- Events Displayed 

[Event Display Report Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/ViewEvent.PNG)

Multimedia events can be shown in events sent from the Overseer to the NGOs in a range of pdfs, mp4, mp3, and images.


### 3.4. Tracking for the progress of the simulation, a varying time scale that is used for each simulation.

- Timeline 

[Timeline Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/timeline.PNG)

The Overseer will be able to see the timeline with each event for each group at their designated event sending times. The Overseer can click on these events and see what they look like

- Timer 

[Timer Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/timer.PNG)

The Overseer and NGOs will be able to keep track of time during the simulation and measure it against their progress in the duration of the scenario simulation.


### 3.5. Custom creation of varying scenario situations.

- Creating and editing scenarios 

[Create or Edit Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/CreateOrEdit.PNG)

The Overseer can choose to either create a new scenario simulation file or edit an existing scenario simulation

[Creating Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/creating.PNG)

Creating a new simulation occurs here with the ability to add NGOs with passkeys, new events with multimedia files with release time, very similar to editing. After adding new items in the scenario the new scenenario simulation file can be downloaded.

[Editing Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/editing.PNG)

Editing will load up a scenario simulation file and load the content of the scenario with their NGOs and the events' content. Then adding, editing, removing items in the screen a new edited scenario simulation file can be downloaded.


### 3.6. Real-time interfering with the scenario by Overseer.

- Live Editing scenario 

[Editing Live Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/LiveEdit.PNG)

The Overseer can use the live editing from the timeline feature to control events of edit deatils of the event such as time, recipient, and deletion. This gives more control to the Overseer during the simulation training and allows interfering.


### 3.7. Review of the events that occurred in past simulations, with functionality to export scenario results.

- Review pdf after scenario completion 

[End of Simulation Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/pdfReivewPopUp.PNG) 

Shows the download pop up of the review PDF.

[Review PDF Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/ReviewPDF.PNG)

This PDF contains the event repsonse conversations between the NGOs and HQ, with their response times, this includes the statuses of how the NGOs felt they were going at each hour in the training simulations. It also contains the messages bewteen NGOs and the Overseer. This PDF will be analysed after the simulation by the Overseer in a breakdown for them to review and talk about to the NGOs.

- Status Screen 

[Status Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/status.png)

NGOs will say how they're going each hour and respond to the pop up with how they feel their NGO group is doing so far.


### 3.8. Ability to function in a range of limited environments on varying hardware.

It can run anywhere, the node.js server is meant to be portable which is a special usecase for a server.


### 3.9. Others additional scope goals

- Colour Changing of the system 

[Colour Changing Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/ColourChanger.PNG)

This is create less offence to different NGO groups who wish to use the software. 

- Licencing

The client would like the software to be open source and for no one to be able to commercial it. We have used the GNU General Public Licence V3.0 which allows for open source and any edits of the software must use this licence.


## 4. Original and Actual Schedule

A summary of the original timelines and a summary of deviations from the original plan. This should convey to the reader those aspects of the project results which are not obvious from other documents.

## 5. Delivered Expenditure

Originally the project had no budget. There were no foreseen costs.

However, in order to setup a pipeline to continuously deploy for demonstration. The team used Heroku. This cost totalled to $14 for 2 months of use.

## 6. Project Self-Assessment

The delivered product is a unique use-case for a Node.js server which allows for the ability to be used in a range of environments, including changing network connection and devices - both things not possible on traditional servers. This causes a required learning curve for initially using the program with no native executable and having to settle for compressed archives for portability due to the complex nature of a local server over a traditional client. The program achieves full synchronisation between clients and the server, keeping the real-time feel and immediacy that's important for a disaster simulation. Flexibility with scenarios is well implemented with the ability to adapt your disaster scenario to fit your training method, prior or during a simulation. Editing during the simulation triggers updates to all clients keeping everything running seemlessly.

## 7. Lessons Learned Summary

Lessons learned which are of significance, impact and priority to the client. The focus here is on the lessons-learned at the intersection of the technical and management aspects of your project which are relevant to the client. Projects which have encountered significant technical or non-technical issues which will be of particular relevance to the client or the client's organisation should document these in this section.

Human Resource Management

IP Agreement Breach from a communication tool

Team Work

Agile

Client Communication


The disaster simulator project meets major scope goals, and delivers the baseline functionality requirements specified in the requirements document. 
Additional scope goals for extra polish or advanced functionality were left out however, such as the audio overlay feature, or graphs outputted in the review pdf.

Time goals were unclear in the first half of the project, due to poor time management planning, however in the second half time was managed much better, 
with comprehensive epic and milestone use. For this second half of the project, time goals were mostly meet, although many features were carried between sprints 
due to the over estimation of work that could be completed. Cost goals were also met, with no cost imposed on the client. Costs associated with Heroku were 
overlooked, however this cost was neutralised as it was covered by the University.

The success criteria listed in the project scope statement was:

    1. Ability to load dynamic simulation files, from an Overseer at HQ machine, that dictates for the details of each type of scenario and such that Overseer has main control over current simulation. 
    2. Operating on 1..* Machines, whereby a single machine implies no access to the internet. 
    3. Inter-communication between Overseer at HQ and NGO's at Client machines, each machine being over network infrastructure operated by RedR, and communication via superficial emails and texts between teams and Overseer at HQ. Communication may have embedded imagery and audio files. 
    4. Tracking for the progress of the simulation, a varying time scale that is used for each simulation. 
    5. Custom creation of varying scenario situations. 
    6. Real-time interfering of scenario by Overseer. 
    7. Review of the events that occurred in past simulations, with functionality to export scenario result. 
    8. Ability to function in a range of limited environments on varying hardware.

All of these success criteria points have been met by the project.



On 10/9/18 Team 16 had an unpleasant meeting with James and our current SM Nick in order to address how our poor communication was resulting in the Team 
being Dysfunctional. As such, it was revealed to all Team members in this meeting that an informant of James had disclosed screenshot evidence of Team 16's 
illicit and unapproved Facebook Messenger Group Chat. Whereby, these screenshots revealed to Staff of VUW Engineering that Team 16 was using this medium 
in order to communicate potentially sensitive information amongst the team. And therefore, breaking the IP agreement in the process. The reciprocation's 
of this were that members of Team 16 course grades are to be severely reduced for there voluntary acts of breaking this agreement, regardless of Lachlan's 
defense that the primary purpose of this unproved channel was for off topic chatter (however this was not the case in its entirety) and that the product 
that Team 16 is developing is to deemed as open source upon completion. Regardless, Team 16 not only feels very remorseful for there wrong doing and has 
agreed that there proposed punishment is fair. But also as has made clear by James, there poor demonstration of communication skills has resulted in the 
team being dysfunctional with individuals in the Team not being as informed as others due to poor propagation of crucial team information. As such upon 
reflection, the Team vows to cease all communication over non approved channels in addition to ensuring that there communication over Mattermost increases 
significantly in order to address the aforementioned risks.

## 8. Procurement Summary
Our only procured service was the use of Heroku. This was used as a host for running the webapp online for presentation and testing purposes. Since our requirements were always to have the webapp being hosted locally for full portability and local network access, Heroku was just a convenient way to present and allow people to easily test the program. On delivery and transitioning according to the transition plan, the Heroku service has been closed.
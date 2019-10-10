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

- Events Displayed 

[Event Display Report Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/ViewEvent.PNG)


- Timer 

[Timer Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/timer.PNG)

- Emailing System 

[Emailing Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/emailer.PNG)

- Messaging System 

[Messaging Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/Messaging.PNG)

- Timeline 

[Timeline Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/timeline.PNG)

- Live Editing scenario 

[Editing Live Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/LiveEdit.PNG)

- Creating and editing scenarios 

[Create or Edit Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/CreateOrEdit.PNG)

[Creating Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/creating.PNG)

[Editing Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/editing.PNG)

- Review pdf after scenario completion 

[End of Simulation Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/pdfReivewPopUp.PNG) 

[Review PDF Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/ReviewPDF.PNG)

- Colour Changing of the system 

[Colour Changing Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/ColourChanger.PNG)

- Status Screen 

[Status Picture](https://gitlab.ecs.vuw.ac.nz/ENGR300-2019/Project-16/redr-disaster-simulation-program/blob/master/Images/status.png)

- Offline and Online 

- Licencing


## 4. Original and Actual Schedule

A summary of the original timelines and a summary of deviations from the original plan. This should convey to the reader those aspects of the project results which are not obvious from other documents.

## 5. Delivered Expenditure

Originally the project had no budget. There were no foreseen costs.

However, in order to setup a pipeline to continuously deploy for demonstration. The team used Heroku. This cost totalled to $14 for 2 months of use.

## 6. Project Self-Assessment

A short statement of the team’s assessment of the delivered project, with a focus on the technical aspects. This should convey to the reader those aspects of the project results which are not obvious from other documents.

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
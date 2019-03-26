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
> If the product is an element of a larger system, then relate the requirements of that larger system to the functionality of the product covered by the software requirements specification.
> 
> If the product is an element of a larger system, then identify the interfaces between the product covered by the software requirements specification and the larger system of which the product is an element. 
>
> A block diagram showing the major elements of the larger system, interconnections, and external interfaces can be helpful.
> 
> Describe how the software operates within the following constraints:  
a) System interfaces; 
b) User interfaces; 
c) Hardware interfaces; The kind of hardware that the software is going to be running on is also unknown. 
d) Software interfaces; We don't know which other software our program will have to interface with. The client did not give the team a specific requirement as to which software to use. The client did ssuggest some open source software called KoboToolBox (https://www.kobotoolbox.org/), so the software the team produces will likely have to communicate with KoboToolBox. The client also told us that the machines that the software will be running on are Windows based. While this will likely not be a problem, the team will need to ensure that the language that is chosen to create the software is capable of running on a Windows machine. The version of Windows is also not known, but this will be brought up at the next meeting with the client. 
e) Communications interfaces; 
f) Memory; The program will have to be optimised such that it doesn't consume all of the memory on the machines and 
g) Operations; 
h) Site adaptation requirements; The software will have to be able to run on the hardware that is present in the disaster simulation setting (which will be several different Windows machines)

#### 1.3.2 Product functions

One page summary of the main functions of the product (9.5.4),
briefly characterizing the minimum viable product.

As stated in section 1.1, the purpose of the program is send messages (mainly emails), thus, the minimum viable product must at the very least be capable of sending emails and possibly other types of message to and from other machines. 

#### 1.3.3 User characteristics   

One page identifying the main classes of users and their
characteristics (9.5.5) 

There are going to be many different people that will use the system once it is deployed. Given that RedR trains a number of different people all from different backgrounds, the users of the system are going to be considerably varied. There are going to be THREE main classes of user. These include; Simulation Participant, Overseer (Government Roleplayer) and Technician. The simulation participants are going to be people who are being tested/trained for deployment into real world disaster zones. Thus, they will be relatively competent but also likey to be under some form of stress as they attempt to maintain order and solve problems related to the situtation that they have been placed in. This may affect their ability to use the software. The overseer is going to be the person responsible for communicating with the teams via email. They will not be participating in the simulation in the saem way as the teams but will still have a large workload. Given that the overseer has to communicate with each team every hour (with time scaled down to 1 hour real time equals 1 day simulation time), they are likely going to be under pressure and may not able to think clearly, which may also limit their ability to use the software. 

#### 1.3.4 Limitations

One page on the limitations on the product (9.5.6)

While the team will put forward their best attempt to satisfy the client, there will be limitations that may slow progress. There may also be requests from the client that simply may not be able to be met simply because of the nature of the software being used to develop the final product, as well as additional time and knowledge constraints. Regan (the client) mentioned to the team that he wanted to have the final program be able to send text messages to mobile phones. This is an example of a feature that may be out of reach simply because the team have never had any experience in producing software capable of this. The machines that will run the end product software may also be their own limitation to the project. The operating system that RedR's machines run is currently unknown. The hardware of RedR's computers is also unknown but this will likely not be of concern. This is because the simulation program that will be developed will not be particularly computationally expensive as it will not have any complex graphics to render as part of the simulation. 

The users may also become a limitation of the system. The software is only as good as the people that use it. Given that the users of the software may be otherwise preoccupied with other tasks or under some kind of situational stress, the usefulness of the software may be limited based on how the users interact with it. 

## 2. References

References to other documents or standards. Follow the IEEE Citation 
Reference scheme, available from the [IEEE website](https://www.ieee.org/) (please use the search box).
(1 page, longer if required)

## 3. Specific requirements  

20 pages outlining the requirements of the system.
You should apportion these pages across the following 
subsections to focus on the most important parts of your product.

### 3.1 External interfaces

See 9.5.10. for most systems, this will be around one page. 

### 3.2 Functions

This is typically the longest subsection in the document - see 9.5.11.
List up to fifty use cases (in order of priority for development), and
for at least top ten focal use cases, write a short goal statement and
use case body (up to seven pages).  Identify the use cases that
comprise a minimum viable product.

### 3.3 Usability Requirements

See 9.5.12. for most systems, this will be around one page.

> **9.5.12 Usability requirements**<br>
> Define usability (quality in use) requirements. Usability requirements and objectives for the software system include measurable effectiveness, efficiency, and satisfaction criteria in specific contexts of use.

### 3.4 Performance requirements

See 9.5.13. for most systems, this will be around one page.
Hardware projects also see section 9.4.6.

> **9.5.13 Performance requirements** <br>
> Specify both the static and the dynamic numerical requirements placed on the software or on human interaction with the software as a whole. 
> 
> Static numerical requirements may include the following:
> 
> a) The number of terminals to be supported;  
> b) The number of simultaneous users to be supported;  
> c) Amount and type of information to be handled.
> 
> Static numerical requirements are sometimes identified under a separate section entitled Capacity.
> 
> Dynamic numerical requirements may include, for example, the numbers of transactions and tasks and the amount of data to be processed within certain time periods for both normal and peak workload conditions. The performance requirements should be stated in measurable terms.
> 
>  For example, "_95 % of the transactions shall be processed in less than 1 second._" rather than, "An operator shall not have to wait for the transaction to complete."
> 
> NOTE Numerical limits applied to one specific function are normally specified as part of the processing subparagraph description of that function.


### 3.5 Logical database requirements

See 9.5.14. for most systems, a focus on d) and e) is appropriate,
such as an object-oriented domain analysis. You should provide an
overview domain model (e.g.  a UML class diagram of approximately ten
classes) and write a brief description of the responsibilities of each
class in the model (3 pages).

### 3.6 Design constraints

see 9.5.15 and 9.5.16. for most systems, this will be around one page.

> 9.5.15 Design constraints<br>
> Specify constraints on the system design imposed by external standards, regulatory requirements, or project limitations.
> 
> 9.5.16 Standards compliance<br>
> Specify the requirements derived from existing standards or regulations, including:
> 
> a) Report format;<br>
> b) Data naming;<br>
> c) Accounting procedures;<br>
> d) Audit tracing.
> 
> For example, this could specify the requirement for software to trace processing activity. Such traces are needed for some applications to meet minimum regulatory or financial standards. An audit trace requirement
may, for example, state that all changes to a payroll database shall be recorded in a trace file with before and
after values.

### 3.7 Nonfunctional system attributes

Present the systemic (aka nonfunctional) requirements of the product
(see ISO/IEC 25010).
List up to twenty systemic requirements/attributes.
Write a short natural language description of the top nonfunctional
requirements (approx. five pages).


### 3.8 Physical and Environmental Requirements 

For systems with hardware components, identify the physical
characteristics of that hardware (9.4.10) and environment conditions
in which it must operate (9.4.11).  Depending on the project, this
section may be from one page up to 5 pages.

### 3.9 Supporting information

see 9.5.19. 

## 4. Verification

3 pages outlining how you will verify that the product meets the
most important specific requirements. The format of this section
should parallel section 3 of your document (see 9.5.18).
Wherever possible (especially systemic requirements) you should
indicate testable acceptance criteria.

## 5. Development schedule.

### 5.1 Schedule

Identify dates for key project deliverables: 

1. architectural prototype
1. minimum viable product
1. further releases

(1 page).

### 5.2 Budget

Present a budget for the project (table), and justify each budget item
(one paragraph per item, one page overall). 

### 5.3 Risks 

Identify the ten most important project risks to achieving project goals: their type, likelihood,
impact, and mitigation strategies (3 pages).

If the project will involve any work outside the ECS laboratories, i.e. off-campus activities, these should be included in the following section.

### 5.4 Health and Safety

Document here project requirements for Health and Safety. All teams must state in this section:

1. How teams will manage computer-related risks such as Occupational Over-Use, Cable management, etc.  

2. Whether project work requires work or testing at any external (off-campus) workplaces/sites. If so, state the team's plans for receiving a Health and Safety induction for the external workplaces/sites. If the team has already received such an induction, state the date it was received. 

3. Whether project work requires the team test with human or animal subjects? If so, explain why there is no option but for the team to perform this testing, and state the team's plans for receiving Ethics Approval _prior_ to testing.

Also, the document in this section any additional discussions with the School Safety Officer regarding Health and Safety Risks. Give any further information on relevant health and safety regulations, risks, and mitigations, etc.


#### 5.4.1 Safety Plans

Safety Plans may be required for some projects, depending on project requirements. Safety Plan templates are available on the course Health & Safety page. Two questions all teams must answer are:

**Do project requirements involve anything that can cause serious harm or death?**  
Examples: building/modifying devices using voltages > 60 V, chemicals, large moving machinery, flying devices, bodies of water.

If so, you will have to write a separate Safety Plan as part of project requirements, and the Safety Plan must be referenced in this section. For health and safety risks involving serious harm or death, you must first contact the School Safety Officer and Course Coordinator first to discuss the Safety Plan and project requirements.

**Do project requirements involve anything that can cause harm or injury?**  
Examples: building/modifying things with voltages <= 60V, small moving machinery, wearable devices.

If so, you will have to write a separate Safety Plan as part of project requirements, and the Safety Plan must be referenced in this section. For health and safety risks involving har or injury, you should write a draft of the Safety Plan before contacting the School Safety Officer and Course Coordinator to discuss the Safety Plan and project requirements.

If a safety plan is required, list in this section the date the School Safety officer accepted your Health and Safety plan (if accepted by submission date).

_If the project is purely software and requires no contact risks involving physical harm, then state "Project requirements do not involve risk of death, serious harm, harm or injury." in this section._


## 6. Appendices
### 6.1 Assumptions and dependencies 

One page on assumptions and dependencies (9.5.7).

One key assumption that we will have to make is that the computers that are being operated during the disaster simulation are capable of running the software that will be produced. It is also assumed that RedR will be responsible for maintaining their own network and will be responsible for getting the software back online should it go down. 

The client suggested using KoboToolBox as a framework for the program. 

### 6.2 Acronyms and abbreviations

One page glossary _as required_.

Overseer: The individual responsible for communicating with each of the teams participating within the simulation.
RedR Australia: An organisation that selects, trains and deploys staff to assist in disaster situations.

## 7. Contributions

A one-page statement of contributions that lists each member of the
group and what they contributed to this document.

Riley Grice: 
Nathan Ellison: 
Daniel Miller: 
Tom Buurmans: 
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
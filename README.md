# Welcome to TMS-app (Task Management System Application)
This document outlines the structure, setup and functionalities of Tasktrec app. It's is designed for developpers, contributors and users to understand the project and how it works.

# Project Overview
Name: tasktrec-app

Description: An online Application that manage processes and transactions involved in the monitoring and recording updates in a project.

Target audience: Developers, programmers, students, and anyone interested in learning and practicing coding.
Tech stack: Full stack application.

## About

This app help project manager to create a project, divide the project into tasks and assigns status to those tasks. The project manager is able within the app
to invite member via email. The member can join the app via a link sent in the email. Once accepting the terms and registering, he can now signin to the app.
The project manager can assign task to the member(s). monitor the progress of the task (and the project); he can set a task as "done" and also set project as "finished". and then start a new project.
The aims also to display statistic about all the work done within the project from the begining.


## App

![home](./assets/tasktrec_home.png)
![dashboard](./assets/tasktrec_dashboard.png)

## Build with
This project was built using the following technologies;

Frontend: ReactJs with JavaScript
Backend: ExpressJs with NodeJs, JavaScript and Sequelize-ORM
Database: MySQL
Assets: Storing images, icons, and other static files

### Prerequisites

Knowledge about JS:

- Basic data structures
- Arrays
- Functions
- Constructors
- Knowledge of webpack (optional)

## Clone project

- To get a local copy up and running follow these simple example steps.
- Clone this repository with `git@github.com:frckbrice/TMS-app-frontend.git` using your terminal or command line.
- Change to the project directory by entering: cd frontend-tasktrec in the terminal.

## Command line steps

- $ git clone `$ git@github.com:frckbrice/TMS-app-frontend.git`
- $ `cd frontend-tasktrec `
- $ `git checkout feature/[name_of_the _feature]


# Setup and installation:
Install dependencies: Use the following command line tool to install required libraries and frameworks;

## Start App

- run `npm install`
- run `npm run start` or `npm start` in your command line


# Key functionalities
- Create Project by the project manager
- divide project into tasks by the project manager
- invite members
-  When a member join the project, assign task to a member
-  monitor the progresses and updates of the task made by the member of the project.
-  update the task status ("todo", "in progress", "ready to review", "done"). there possibility to add statuses.
-  set the task as "done" of the project as "finished/ended"
-  receive notification for the invite for the member already in the system
-  update profile info for the user of the app
-  see projects created, projects in which you are involved
  
## Live Site

[Link](https://unruffled-euler-e01838.netlify.app/)

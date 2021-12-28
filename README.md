# Patient's Health WebApp
Based off of something I started for a university project in my final year that was not fully completed.

See site at [link](https://patient-health-app.herokuapp.com)

<!-- Also be sure to see 
## [YOUTUBE WALKTHROUGH](https://www.youtube.com/watch?v=2LTY80dYC0g&t=81s) -->

## Tables of Contents
* [Background](#background)
* [Images](#images)
* [Technologies](#technologies)
* [Requirements to run the project](#requirements-to-run-the-project)
* [Setup](#setup)
* [Running the project](#running-the-project)
* [Project Shortcomings](#shortcomings)
* [Modifications](#modifications)
* [Trello Board](https://trello.com/b/e8hwRTpR/patientapp)
* [***Video Walkthrough - Youtube***](https://www.youtube.com/watch?v=2LTY80dYC0g&t=81s)

## Background
My project was to create a system that would allow patients with chronic illness to book appointments online and view prescriptions.

## Images



## Technologies
- [Java](#java)
- [Gradle](#gradle)
- [Spring Framework](#spring-framework)
- [Mockito](#mockito)
- [Hibernate](#hibernate)
- [H2 Database](#h2-database) (The original project used MYSQL Server)
- [Thymeleaf Templating Engine](#thymeleaf-templating-engine)
- [Javascript](#javascript)
- [TypeScript](#typescript)
- [jQuery](#jquery)
- [HTML](#html)
- [CSS](#css)
- [SASS](#sass)
- [Bootstrap](#bootstrap)

    ### Explanation of Each Technology's Role

    #### Java
    Is used to write/create the server side of the application. This include main data structures for manipulating database information as POJO objects on ther server side.

    #### Gradle
    A build tool technology (i.e. like Maven) used to provide easily portable/shareable dependency management.

    #### Spring Framework
    Spring is a framework for developing Java Applications. In particular I used the Spring MVC, Spring Security by way of Spring Boot in order to build the backend in a secure MVC type architecture. Spring Framework also provides a good means of creating and working with REST in order to create APIs for any AJAX related calls. Spring's Web depndency also provides and embedded Apache Tomcat Server for running the project.

    #### Mockito
    A testing framework which I used for mock testing the rest and view controller methods (i.e. backend web API).

    #### Hibernate
    Hibernate is the implementation of JPA (Java Persistence API) that is being used to model the database and carryout SQL queries directly through [POJO's]() instead of through MySQL statements.

    #### H2 Database
    The database used to persist application information. Using H2 for portability (can be embedded in the application) and because it's free to use.

    #### Thymleaf Templating Engine
    An alternative to using JSP pages, Thymeleaf allows you to create regular HTML pages that can be rendered by the browser, but with some additional syntax that allows Thymleaf to insert java objects and values from the server side into the HTML DOM elements. This is great for design without runnings the entire server instance.

    #### JavaScript
    It's the main language used on the client side for crreating dynamic and interactive content.

    #### TypeScript
    The javascript is actually written in typescript and compiled to javascript by Node.js.

    #### jQuery
    A javascript library good for working with AJAX among many other useful things [see website](https://jquery.com/).
    
    #### HTML
    The mark up langauge of the web.

    #### CSS
    The styling language of the web.

    #### SASS
    The CSS of the project is compiled from SASS, which adds addtional language features like variables for example.

    #### Bootstrap
    HTML,CSS and Javascript library for creating dynamic web content[see website](https://getbootstrap.com/).

## Requirements to run the project
You will need to have java 11 or higher installed and on your classpath in order to run the project.

Optionally you can use a local installation of gradle to build and run this, but there is a gradle wrapper (gradlew) which can be used instead.


## Setup

### Now
Once downloaded no further setup is required. (though you should wait for a moment after running before interacting with the application - to make sure server has run all it's processes.)

### Originally
Originalled, in order to run the project, you needed to configure it (in the application.properties) to work with a MySQL database instance, which could be either a local instance or remote instance using ssh tunnelling.

In my case it was configured to run with a University MySQL server instance, sometimes a local MySQL database instance, and later on a raspberry pi instance of MariaDB.

## Running the Project
From the terminal, cd the project directory. Once inside the directory: 

On Mac and Linux
```
./gradlew bootRun
```

On Windows
```
./gradlew.bat bootRun
```

Once the boot process is complete, you can then view the website from https://localhost:8090/ (if you are using default configurations). 

<!-- There for each type their are 3 users (i.e. {usertype}{number} - e.g. Admin2). -->

You can login to the application using these credentials:
| usertype |username | password|
|:---:|:---:|:---|
|ADMIN|a1  | password|
|ADMIN|a2  | password|
|ADMIN|a3  | password|
|PATIENT|p1 | password|
|PATIENT|p2 | password|
|PATIENT|p3 | password|
|DOCTOR|d1 | password|
|DOCTOR|d2 | password|
|DOCTOR|d3 | password|
 

To access the H2 console to view the database go to https://localhost:8090/h2-console/ and enter:

Saved Settings: Generic H2 (Embedded)

Settings Name: Generic H2 (Embedded)

Driver Class: org.h2.Driver

JDBC URL: jdbc:h2:file:./data/db

User Name: admin

Password: admin

as shown in the image below:
![h2console](./images/h2console.png)



## Project Shortcomings
 ### Main
 

### Aside


### Summary


## Modifications
I would like to extend it with a messaging system in the future. I would also like to add a some way for patients to set up orders for prescriptions but I'd need to give some thought to how it might be implemented in a way that really enhaces the project, rather than just being sent to a dummy Pharmacy API, (as prescriptions are handled by the pharmacy, not the GP, which is was this Patient Health App is desgined for - Surgery patient,doctor and admin use).
<!-- In future once done: I have since gone back and have worked on completing aspects of the project not related to Google Cloud Console [see here for explaination](#main). -->

##Youtube Walkthrough


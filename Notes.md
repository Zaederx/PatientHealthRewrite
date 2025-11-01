# Notes
Usally things that I learn or find helpful that might be useful in the future.

## Using @Query for more control over DB query's https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-introduction-to-query-methods/  

## Spring JPA Query Methods - https://www.ronaldjamesgroup.com/blog/spring-data-jpa-query-methods-by-bruno-drugowick

## Logging in Spring - https://docs.spring.io/spring-boot/docs/2.1.7.RELEASE/reference/html/boot-features-logging.html

## By directional relationships in hibernate require the mappedBy key word - otherwise you will have constraint violations each time you try to delete an object referenced by another column

## SECTION TESTING - some good libraries / dependencies for mocking

import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.equalTo;

## Credentials are removed after successful authentication by default
This means that if you try to find the credentials in the authentication object i.e.
```
Authentication auth = SecurityContextHolder.getContext().getAuthentication();
String userPassword = "";
if (auth != null) {
    logger.debug("authentication not null");
    //here the credentials will be null if the user is already authenticated.
    userPassword = auth.getCredentials().toString();
    logger.debug("userPassword:"+userPassword);
}
```

## Passwords cannot be retrieved unless you write some custom Spring classes (a way of protecting passwords)
If you try 
```
String password = user.getPassword()// will not work because it is protected.
```


## Creating a docker image and uploading to docker hub
Create a docker file
```
FROM openjdk:17
VOLUME /tmp
COPY build/libs/PatientHealth-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","./app.jar"]
```
From within the project folder, create patient
```
docker -t patient-health .
```
### From Docker 'Ask Gordan'
Yes, you need to create a Docker Hub repository before pushing an image to it. If the repository doesn't exist, the push will fail. Here's how you can create a repository:

Steps to Create a Docker Hub Repository:
Sign in to Docker Hub:

Go to Docker Hub⁠ and log in with your account.
Create a Repository:

Click on Create Repository.
Fill in the required details:
Repository Name: Choose a unique name (e.g., my-repo).
Short Description: Optional, but helpful for others.
Visibility: Choose Public (accessible to everyone) or Private (restricted access).
Click Create.
Tag Your Image:

Use the repository name and your namespace (`username` or `organization`) to tag your image:
```
docker tag my-app my-namespace/my-repo:v1.0
```
Push the Image:

Push the tagged image to the repository:
```
docker push my-namespace/my-repo:v1.0
```
If the repository already exists, you can skip the creation step and directly push your image.

Sources:

https://docs.docker.com/docker-hub/repos/create/⁠
https://docs.docker.com/docker-hub/repos/manage/hub-images/push/⁠

### Summary of Docker instructions
Create a repository online in Docker Hub. The repository I created is `zaederx/patient-health-app`.

Then build the project docker image:
```
docker build -t patient-health .
```

Tag patient-health with the repository that was created in Docker Hub:
```
docker tag patient-health zaederx/patient-health-app
```

Push docker image to Docker Hub:
```
docker push zaederx/patient-health-app
```

## Port for Render.com
Must use port 1000 when hosting on render.com (unless you know how to configure it otherwise - which I don't [it's not very clear how to do it for Java+Docker in the instructions - [see port binding](https://render.com/docs/web-services#port-binding) & [environment variables](https://render.com/docs/configure-environment-variables) - it doesn't say how this works for Java+Docker so I'm just using port 1000])
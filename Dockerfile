FROM openjdk:17
VOLUME /tmp
COPY build/libs/PatientHealth-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 10000
ENTRYPOINT ["java","-jar","./app.jar"]

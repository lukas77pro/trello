FROM openjdk:8-jdk-alpine
EXPOSE 8098
ADD build/libs/trello-server-1.0-SNAPSHOT.jar trello-server-1.0-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "trello-server-1.0-SNAPSHOT.jar"]

FROM amazoncorretto:21-alpine-jdk
LABEL authors="eyal"
COPY target/brewing-system.jar brewing-system.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "brewing-system.jar"]
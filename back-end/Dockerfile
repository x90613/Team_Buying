# Build stage
FROM maven:3.9.6-eclipse-temurin-21 as builder
WORKDIR /app

# Copy only pom.xml initially
COPY pom.xml .
COPY .m2/ /root/.m2/

# Now copy the rest of the source code
COPY src/ src/

# Build the application
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/target/back_end-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "app.jar"]
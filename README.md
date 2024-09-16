
# Brew To The Future 🍺

Brew To The Future is a revolutionary smart home brewing app designed to help you brew your own beer with precision and ease. Equipped with real-time monitoring and control features, it ensures every batch is brewed to perfection. Beyond brewing, Brew To The Future doubles as a vibrant social platform, allowing users to share their favorite recipes, explore new ones, and connect with a global community of passionate home brewers.

[![IMG-2313.jpg](https://i.postimg.cc/dQh9L3y6/IMG-2313.jpg)](https://postimg.cc/QVr7zXSK)

## Features

- **Real-Time Monitoring**: Track temperature, fermentation stages, and other brewing parameters live.
- **Automated Brew Process**: Set up a recipe, and Brew To The Future automates the brewing process from start to finish.
- **Customizable Recipes**: Create, edit, and save your own brewing recipes.
- **Push Notifications**: Get notified about key events in the brewing process (e.g., step complete, heat unit not responding).
- **User-Friendly Interface**: Easy to navigate with a modern and intuitive design.
- **Social Networking**: Share your brewing recipes, discover new ones, and brew and review recipes from all around the world.
- **Brew Statistics:** View detailed statistics for every brew, helping you refine your process and improve future batches.

## Tech Stack

- **Front End**: React Native and Expo-Go for a cross-platform mobile experience.
- **Back End**: Spring Boot with Java for a robust and scalable server.
- **Embedded System**: Raspberry Pi for managing and automating the brewing hardware, with code written in Python to control and monitor the brewing process.
- **Database**: PostgreSQL, ensuring reliable storage of recipes and brew data.
- **OAuth2 Authentication**: Secured user authentication with Google OAuth2.
- **Push Notifications**: Implemented via Expo.


## Setup and Installation

### Prerequisites
- **Java 21** or higher
- **Node.js** and **npm**
- **PostgreSQL** database
- **Expo CLI** for mobile development

### Clone the Repository
```bash
git clone https://github.com/EyalShpater/BrewToTheFuture.git
cd BrewToTheFuture
```

### Backend Setup

**Option 1:**
1. Install Java dependencies:
   ```console
   ./mvnw install
   ```
2. Configure PostgreSQL and OAuth2 in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://<your-db-url>:5432/brewdb
   spring.datasource.username=<your-username>
   spring.datasource.password=<your-password>

   spring.security.oauth2.client.registration.google.client-id=<your-google-client-id>
   spring.security.oauth2.client.registration.google.client-secret=<your-google-client-password>
   ```
3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

**Option 2:**
1. **Pull the Docker Image**

   Open a terminal and pull the Docker image from Docker Hub using the following command:

   ```bash
   docker pull shpater1234/brew-app

2. **Run the Docker Container**

   Start a Docker container from the image, specifying port 8080 to be exposed. Run the following command:

   ```bash
   docker run -d -p 8080:8080 shpater1234/brew-app
   
> [!NOTE]
>   -d: Runs the container in detached mode (in the background).
>
>   -p: 8080:8080: Maps port 8080 of the container to port 8080 on your host machine.


> [!TIP]
> To ensure the server is running correctly, you can check the server's health by navigating to:
> [Health Check Endpoint](http://localhost:8080/health).
> You should receive a random dad joke in response. This endpoint is a fun way to verify that the server is up and operational.

   
### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Expo development server:
   ```bash
   expo start
   ```

### Embedded System Setup

The embedded system is responsible for controlling the brewing hardware through the Raspberry Pi. Follow these steps to set up the embedded system:

1. **Clone the Repository on the Raspberry Pi**:
   - Open a terminal on your Raspberry Pi.
   - Clone the Brew To The Future repository:
     ```bash
     git clone https://github.com/EyalShpater/BrewToTheFuture.git
     ```
   - Navigate to the embedded system directory:
     ```bash
     cd BrewToTheFuture/embedded_system
     ```
     
2. **Configure the GPIO Pins**:
   - Connect the temperature sensors, heating elements, and other hardware components to the Raspberry Pi as specified in the circuit diagram.
   - **[Circuit Image Here]** 

3. **Start the Embedded System**:
   - Execute the `main.py` script to start the embedded system:
     ```bash
     python3 main.py
     ```
   - The script will initialize the sensors, start the PID controller, and manage the brewing process according to the recipe.

4. **Monitor the Brewing Process**:
   - The embedded system will communicate with the Brew To The Future app, providing real-time updates on the brewing process.
   - You can monitor the temperature, control the brewing stages, and receive notifications directly on your mobile device.

> _Ensure that all hardware connections are secure and the circuit is correctly set up before powering on the Raspberry Pi to avoid any mishaps._

## Usage

1. **Create an Account**: Use Google OAuth2 to log in.
2. **Set Up a Recipe**: Create or select a brewing recipe.
3. **Start Brewing**: Monitor the process in real-time and get notifications when your brew reaches key stages.
4. **Review and Rate**: Share your feedback on recipes and rate others' recipes.
5. **Watch Statistics**: View detailed statistics for every brew to refine your process and improve future batches.
6. **Enjoy**: Once your brew is complete, it's time to relax and enjoy your homemade beer!

## Brewing Process Using The App

https://github.com/user-attachments/assets/e673a92b-01fe-43c1-9822-61e081719b5c



## App Promo

https://github.com/user-attachments/assets/650e722f-4142-41eb-a28c-219c980e1428

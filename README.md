
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


### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Expo development server:
   ```bash
   expo start
   ```

## Usage

1. **Create an Account**: Use Google OAuth2 to log in.
2. **Set Up a Recipe**: Create or select a brewing recipe.
3. **Start Brewing**: Monitor the process in real-time and get notifications when your brew reaches key stages.
4. **Review and Rate**: Share your feedback on recipes and rate others' recipes.
5. **Watch Statistics**: View detailed statistics for every brew to refine your process and improve future batches.
6. **Enjoy**: Once your brew is complete, it's time to relax and enjoy your homemade beer!

## Video

[![Video Thumbnail](https://img.youtube.com/vi/1VVzBh5H1ukcRONT7yy5z9QfygVTjguHJ/0.jpg)](https://drive.google.com/file/d/1VVzBh5H1ukcRONT7yy5z9QfygVTjguHJ/preview)



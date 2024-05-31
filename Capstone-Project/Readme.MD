# WELCOME TO THE QUIZ GAME!

This is a Spring boot based quiz game application that allows users to play the game according to their choices of category and difficulty level. The application provides APIs for adding, retrieving, and deleting categories and questions.

## TABLE OF CONTENTS

- Getting Started
- Configuration
- Database Schema

### Getting Started

#### Prerequisites

- Java 17 or higher
- Maven 3.6.0 or higher
- A running instance of MySql database

#### Running the Application

1. **Clone the repository:**

   ```bash
   git clone (https://github.com/your_username/Assignments-Frontend/tree/main/Capstone-Project)
   cd quizgame
   ```

2. **Build the project:**

   ```bash
    mvn clean install
   ```

3. **Run the application:**

   ```bash
   mvn spring-boot:run
   ```

   The application will start on http://localhost:8081.

#### Accessing the APIs

You can use tools like Postman to test the APIs.

#### Get all categories:

```bash
GET http://localhost:8081/categories
```

#### Add a new category:

```bash
POST http://localhost:8081/category/add
```

#### Get questions by Category ID and Difficulty Level:

```bash
GET http://localhost:8081/questions/${categoryId}/${difficulty}
```

#### Add a new question:

```bash
POST http://localhost:8081/questions/add
```

#### Delete a question by question id:

```bash
DELETE http://localhost:8081/questions/{questionId}
```

### Configuration

#### Database Configuration

The application uses a MySQL database. The configuration can be found in `src/main/resources/application.properties`.

```properties
server.port=8081

spring.application.name=quizgame

# Spring datasource configuration
spring.datasource.url=jdbc:mysql://localhost:3306/quiz
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.username=your_username
spring.datasource.password=password

# Hibernate specific properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Database Schema

The Quiz Game has the following tables-

- A **Category Table** having CategoryID and Name.
- A **Question Table** having QuestionID , QuestionText and options along with the CategoryID.

## THANKYOU!

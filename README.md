# CodeSync - A Real-Time Code Mentoring Platform
<img src="public/img/code-icon.png"  width="250"  />

CodeSync is an interactive platform designed for code mentors to observe their students' coding work in real-time, with options for live updates, questions, and answers. It provides a seamless environment where mentors and students can collaborate on coding challenges, ask questions, and get feedback during coding sessions.

## Features

- **Live Code Editing**: Mentors can observe their students' code and interact in real-time.
- **Question & Answer System**: Students can ask questions while coding, and mentors can provide answers.
- **Dynamic Code Blocks**: The platform supports multiple coding challenges, allowing mentors to guide students through various programming problems.
- **Responsive Layout**: The platform adapts to different screen sizes, ensuring a smooth experience on both mobile and desktop devices.
- **Mentor and Student Roles**: The system distinguishes between mentors and students, providing tailored experiences based on the user role.

## Frontend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/YiftachSamocha/codesync-frontend.git
    ```

2. **Install dependencies**:
    ```bash
    npm i
    ```

3. **Start the development server**:
    ```bash
    npm run dev
    ```

4. **Visit the platform**: Open your browser and navigate to the following URL to access the app:
    [CodeSync - Live Platform](https://codesync-71hs.onrender.com)

## How It Works

The platform consists of multiple components to ensure efficient interaction between mentors and students. Here are some of the core components:

- **Root Component (`RootCmp`)**: This component initializes the application and manages routing, including pages for the lobby and coding challenges.
- **Code Blocks (`CodeBlock`)**: Each coding challenge is displayed in a code editor, where students can write and modify code in real-time. Mentors can view these changes as they happen.
- **Lobby (`Lobby`)**: Students can choose a coding challenge block from the lobby. Each block represents a different challenge (e.g., Async Programming, DOM Manipulation, etc.).

## Technologies Used

- **React**: For building the user interface with components like `CodeBlock`, `Lobby`, and `AppHeader`.
- **Redux**: For state management, including managing user data and code block content.
- **Socket.io**: For real-time communication between the client and server, allowing for live code updates, question/answer messaging, and mentor interactions.
- **Ace Editor**: For embedding a powerful code editor that supports syntax highlighting for various languages.

## Available Routes

- `/` or `/lobby`: The lobby page where students can select coding challenges.
- `/code/:type`: A page for a specific coding challenge, where students can write and modify code.



## Conclusion

CodeSync is a platform that brings real-time coding mentorship to life, allowing mentors and students to interact seamlessly and learn from each other. The real-time feedback system makes it ideal for collaborative learning in programming.
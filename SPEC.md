# SPEC-001: CodePen Clone with React & bknd

## Background

CodePen is a popular online code editor that allows developers to write and test HTML, CSS, and JavaScript in real time. This project aims to build a similar application using React for the frontend and bknd.io for backend functionalities such as data storage and API handling. By leveraging bknd, we can reduce backend development efforts while maintaining flexibility and scalability.

## Requirements

1. HTML, CSS, and TypeScript code editing functionality using Monaco Editor

2. Real-time preview of the code execution inside an iframe

3. Code storage and retrieval via bknd.io

4. User authentication using bknd.io

5. React-based UI with modular components

6. Sharing functionality via a generated URL

## Method

### Architecture Overview

[plantuml]

@startuml

actor User

User -> ReactApp: Open Code Editor
ReactApp -> MonacoEditor: Load Editor
User -> MonacoEditor: Type HTML, CSS, TypeScript
MonacoEditor -> iframe: Update Preview in Real-time
ReactApp -> bknd.io: Save Code Snippet
ReactApp <- bknd.io: Retrieve Code Snippet

@enduml

### Technology Stack

Frontend: React (with TypeScript), Monaco Editor

Backend: bknd.io (GraphQL & REST APIs)

Storage: bknd.io Database (NoSQL)

### Data Model (bknd.io)

Snippet Collection:

id (UUID, Primary Key)

title (String)

html (Text)

css (Text)

typescript (Text)

created_at (Timestamp)

updated_at (Timestamp)

user_id (Foreign Key to User)

User Collection (Handled by bknd.io Authentication)

## Implementation

- Setup Frontend

- Initialize a React project with Vite

- Install dependencies: Monaco Editor, React Query, Styled-Components

- Integrate bknd.io

- Configure authentication for users

- Define API endpoints for saving/loading code snippets

- Develop Code Editor

- Implement Monaco Editor component

- Create state management for HTML, CSS, and TypeScript

- Implement Live Preview

- Render iframe and update content dynamically

- Connect to bknd.io

- Store and retrieve snippets via REST API

## Milestones

Week 1: Setup project, install dependencies, configure bknd.io

Week 2: Implement Monaco Editor and real-time preview

Week 3: Develop API connections for saving/loading code

Week 4: UI improvements, dark mode, and final testing

## Gathering Results

Test whether real-time preview is responsive and fast

Ensure code storage and retrieval functions work as expected

Gather user feedback on UI/UX and improve based on responses

# SPEC-001: CodePen Clone with React & Supabase

## Background

CodePen is a popular online code editor that allows developers to write and test HTML, CSS, and JavaScript in real time. This project aims to build a similar application using React for the frontend and Supabase for backend functionalities such as data storage and API handling. By leveraging Supabase, we can reduce backend development efforts while maintaining flexibility and scalability.

## Requirements

1. HTML, CSS, and JavaScript code editing functionality using Monaco Editor

2. Real-time preview of the code execution inside an iframe

3. Code storage and retrieval via Supabase

4. User authentication using Supabase Auth

5. React-based UI with modular components

6. Sharing functionality via a generated URL

## Method

### Architecture Overview

[plantuml]

@startuml

actor User

User -> ReactApp: Open Code Editor
ReactApp -> MonacoEditor: Load Editor
User -> MonacoEditor: Type HTML, CSS, JavaScript
MonacoEditor -> iframe: Update Preview in Real-time
ReactApp -> Supabase: Save Ken(Code Snippet)
ReactApp <- Supabase: Retrieve Ken

@enduml

### Technology Stack

Frontend: React (with TypeScript), Monaco Editor

Backend: Supabase (PostgreSQL & REST APIs)

Storage: Supabase Database (PostgreSQL)

### Data Model (Supabase)

Kens Table:

id (UUID, Primary Key)

title (String)

html (Text)

css (Text)

javascript (Text)

created_at (Timestamp)

updated_at (Timestamp)

User Management (Handled by Supabase Auth)

## Implementation

- Setup Frontend

- Initialize a React project with Vite

- Install dependencies: Monaco Editor, React Query, Styled-Components

- Integrate Supabase Client

- Configure authentication for users

- Define API endpoints for saving/loading kens

- Develop Code Editor

- Implement Monaco Editor component

- Create state management for HTML, CSS, and JavaScript

- Implement Live Preview

- Render iframe and update content dynamically

- Connect to Supabase

- Store and retrieve kens via Supabase Client

## Milestones

Week 1: Setup project, install dependencies, configure Supabase

Week 2: Implement Monaco Editor and real-time preview

Week 3: Develop API connections for saving/loading code

Week 4: UI improvements, dark mode, and final testing

## Gathering Results

Test whether real-time preview is responsive and fast

Ensure code storage and retrieval functions work as expected

Gather user feedback on UI/UX and improve based on responses

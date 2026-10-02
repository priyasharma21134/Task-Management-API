# Task Management API

A simple Task Management web application built using Flask, MongoDB, HTML, CSS, and JavaScript.

## Features

- Add new tasks
- View all tasks
- Update existing tasks
- Delete tasks
- Store task data in MongoDB
- REST API using Flask
- Simple frontend interface

## Technologies Used

- Python
- Flask
- MongoDB
- PyMongo
- HTML
- CSS
- JavaScript

## Project Structure

Task-Management-API/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── app.py
├── database.py
├── requirements.txt
└── README.md

## API Endpoints

### GET /tasks
Fetch all tasks.

### POST /tasks
Add a new task.

### PUT /tasks/<task_id>
Update an existing task.

### DELETE /tasks/<task_id>
Delete a task.

## How to Run

### 1. Install dependencies

```bash
pip install -r requirements.txt
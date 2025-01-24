# Task Tracker CLI

Task Tracker is a simple command-line interface (CLI) application that helps you track and manage your tasks. With this tool, you can add, update, delete, and mark tasks as "in-progress" or "done." Tasks are stored in a JSON file for persistence.

---

## Features
- Add tasks with a description
- Update task descriptions
- Delete tasks
- Mark tasks as "in-progress" or "done"
- List all tasks or filter tasks by status ("todo," "in-progress," or "done")

---

## Installation

### Prerequisites:
- [Node.js](https://nodejs.org/) must be installed on your system.

### Steps:
1. Clone or download this repository.
2. Navigate to the project directory:
   ```bash
   cd task-tracker
   ```
3. Link the CLI globally:
   ```bash
   npm install -g
   ```

Now, you can use `task-cli` globally from any terminal.

---

## Usage

### Adding a Task:
```bash
task-cli add "Buy groceries"
```
Output:
```plaintext
Task added successfully (ID: 1)
```

### Updating a Task:
```bash
task-cli update 1 "Buy groceries and cook dinner"
```

### Deleting a Task:
```bash
task-cli delete 1
```

### Marking a Task:
- **In Progress:**
  ```bash
  task-cli mark-in-progress 1
  ```
- **Done:**
  ```bash
  task-cli mark-done 1
  ```

### Listing Tasks:
- **All Tasks:**
  ```bash
  task-cli list
  ```
- **Filtered by Status:**
  ```bash
  task-cli list done
  task-cli list todo
  task-cli list in-progress
  ```

---

## Task Properties
Each task has the following properties:
- `id`: A unique identifier for the task
- `description`: A short description of the task
- `status`: The task's status ("todo," "in-progress," or "done")
- `createdAt`: The date and time the task was created
- `updatedAt`: The date and time the task was last updated

---

## JSON File
The tasks are stored in a `tasks.json` file in the current directory. The file is automatically created if it does not exist.

Example `tasks.json` structure:
```json
[
  {
    "id": 1,
    "description": "Buy groceries",
    "status": "done",
    "createdAt": "2025-01-24T10:00:00.000Z",
    "updatedAt": "2025-01-24T11:00:00.000Z"
  }
]
```

---

## Error Handling
- If the task ID does not exist, the CLI will display an appropriate error message.
- If required arguments are missing, the CLI will prompt you with usage instructions.

---

## Project Source
This project is done by following the project instructions in this website: [Task Tracker Project](https://roadmap.sh/projects/task-tracker)

---

## License
This project is licensed under the MIT License. Feel free to use and modify it as you like!


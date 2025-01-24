#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to the JSON file
const tasksFilePath = path.join(__dirname, 'tasks.json');

// Ensure the tasks file exists
if (!fs.existsSync(tasksFilePath)) {
  fs.writeFileSync(tasksFilePath, JSON.stringify([]));
}

// Helper to read tasks
const readTasks = () => JSON.parse(fs.readFileSync(tasksFilePath, 'utf8'));

// Helper to write tasks
const writeTasks = (tasks) => fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));

// Generate unique ID
const generateId = (tasks) => (tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1);

// CLI commands
const [action, ...args] = process.argv.slice(2);

switch (action) {
  case 'add': {
    const description = args.join(' ');
    if (!description) {
      console.log('Error: Task description is required.');
      break;
    }
    const tasks = readTasks();
    const newTask = {
      id: generateId(tasks),
      description,
      status: 'todo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
    break;
  }

  case 'update': {
    const [id, ...newDescriptionParts] = args;
    const newDescription = newDescriptionParts.join(' ');
    if (!id || !newDescription) {
      console.log('Error: Task ID and new description are required.');
      break;
    }
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === parseInt(id, 10));
    if (!task) {
      console.log('Error: Task not found.');
      break;
    }
    task.description = newDescription;
    task.updatedAt = new Date().toISOString();
    writeTasks(tasks);
    console.log('Task updated successfully.');
    break;
  }

  case 'delete': {
    const id = parseInt(args[0], 10);
    if (!id) {
      console.log('Error: Task ID is required.');
      break;
    }
    const tasks = readTasks();
    const newTasks = tasks.filter((t) => t.id !== id);
    if (tasks.length === newTasks.length) {
      console.log('Error: Task not found.');
      break;
    }
    writeTasks(newTasks);
    console.log('Task deleted successfully.');
    break;
  }

  case 'mark-in-progress': {
    const id = parseInt(args[0], 10);
    if (!id) {
      console.log('Error: Task ID is required.');
      break;
    }
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) {
      console.log('Error: Task not found.');
      break;
    }
    task.status = 'in-progress';
    task.updatedAt = new Date().toISOString();
    writeTasks(tasks);
    console.log('Task marked as in-progress.');
    break;
  }

  case 'mark-done': {
    const id = parseInt(args[0], 10);
    if (!id) {
      console.log('Error: Task ID is required.');
      break;
    }
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) {
      console.log('Error: Task not found.');
      break;
    }
    task.status = 'done';
    task.updatedAt = new Date().toISOString();
    writeTasks(tasks);
    console.log('Task marked as done.');
    break;
  }

  case 'list': {
    const filter = args[0]; // Optional filter (done, todo, in-progress)
    const tasks = readTasks();
    const filteredTasks = filter
      ? tasks.filter((t) => t.status === filter)
      : tasks;
    if (!filteredTasks.length) {
      console.log('No tasks found.');
      break;
    }
    filteredTasks.forEach((task) =>
      console.log(`[${task.status}] ID: ${task.id} - ${task.description}`)
    );
    break;
  }

  default:
    console.log('Usage:');
    console.log('  task-cli add <description>');
    console.log('  task-cli update <id> <new description>');
    console.log('  task-cli delete <id>');
    console.log('  task-cli mark-in-progress <id>');
    console.log('  task-cli mark-done <id>');
    console.log('  task-cli list [done|todo|in-progress]');
    break;
}

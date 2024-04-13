#! /usr/bin/env node

// Import necessary modules
import inquirer from "inquirer"; 
import chalk from "chalk";
import Table from "cli-table"

// Define Todo interface
interface Todo {
  title: string;
  completed: boolean;
}

// Initialize todos array
let todos: Todo[] = []; // Array to store todo items as strings

// Display welcome message
console.log(chalk.yellow("\n\n\t\t\t\tWELCOME TO TODO LIST APPLICATION \t\t\t"));

// making functions

// function for add task
async function addTask(){
  
     const title = await inquirer. prompt({
          type: "input",
          name: "title",
          message: chalk.cyan("\n\n\t\t\t\t\tEnter the todo title:\t\t\t\n\n"),
        });
     console.log(chalk.yellow(`\n\t\t\t\tTitle entered: ${title.title}\n`));

     todos.push({title: title.title ,completed: false} );
     console.log(chalk.green("\n\n\t\t\t\t\tTodo added successfully!\t\t\t\t\n\n"));    
  
};

// function for todoList
function todoList(){
  if (todos.length === 0) {
      console.log(chalk.yellow("\n\t\t\t\tThere are no todos in the list.\t\t\t\t\n"));
    } else {
      const table = new Table({
        head: [
          chalk.yellowBright('Index'),   // Gray color for the column headers
          chalk.yellowBright('Todo'),    // Gray color for the column headers
          chalk.yellowBright('Status')   // Gray color for the column headers
        ],
        colWidths: [10, 40, 20],
      });
  
      todos.forEach((todo, index) => {
        const status = todo.completed ? chalk.green("Completed") : chalk.red("Pending");
        const coloredIndex = chalk.blueBright(index + 1); // Change color of index
        table.push([String(index + 1), todo.title, status]);
      });

      console.log(table.toString());
    }
  
};

// function for task completed 
async function markTaskCompleted(){
  if (todos.length === 0) {
            console.log(chalk.redBright("\n\t\t\t\tThere are no task to mark complete."));
          } else {
            const completeIndex = await inquirer.prompt({
              type: "number",
              name: "index",
              message: (chalk.cyan("\n\t\t\tEnter the index of the todo to mark complete:\t\t\t\n")),
            });
            if (completeIndex.index < 1 || completeIndex.index > todos.length){
              console.log(chalk.red("\n\t\t\t\tINVALID INDEX!!\t\t\t\t\n"));
              return;

            }else {
              todos[completeIndex.index - 1].completed=true;
              console.log(chalk.green("\n\t\t\t\tTodo marked as complete.\t\t\t\t\n"));
             } 
          }
      
};

// function for Update task
async function updateTask(){
  let updateTodo = await inquirer.prompt(
            [
              {
                name: "index",
                type: "number",
                message:(chalk.cyan("\n\t\t\t\tEnter the `index no` of the task you want to update:\t\t\t\t\n"))
              },
              {
                name: "newTask",
                type:"input",
                message:(chalk.cyanBright("\n\t\t\t\tNow enter new task name:\t\t\t\t\n")),
              }
            ]
          );
          const { index, newTask } = updateTodo;

          if (index < 1 || index > todos.length) {
            console.log(chalk.red("\n\t\t\t\tInvalid index. Please enter a valid index.\t\t\t\t\n"));
            return;
          }
        
          todos[index - 1].title = newTask;
          console.log(chalk.blue(`\n\t\t\t\tTask at index no ${index} updated successfully\t\t\t\t\n`));
          todoList();
         
};

// function for Delete task
async function deleteTask(){
  if (todos.length === 0) {
            console.log(chalk.red("\n\t\t\t\tThere are no todos to delete.\t\t\t\t\n"));
            return;
          } else {
            const deleteIndex = await inquirer.prompt({
              type: "number",
              name: "index",
              message:chalk.cyan("\n\t\t\t\tEnter the index of the todo to delete:\t\t\t\t\n"),        
            });
            if (deleteIndex.index < 1 || deleteIndex.index > todos.length){
              console.log(chalk.red("\n\t\t\t\tInvalid index. Please enter a valid index.\t\t\t\t\n"));
              return;
            }else{
              const deletedTodo = todos.splice(deleteIndex.index - 1, 1)[0]; // Remove and store deleted item
              console.log(chalk.green(`\n\t\t\t\tTodo "${deletedTodo.title}" deleted successfully.\t\t\t\t\n`));

            }
          }  
                  
};

// function for exiting
function exit (){
  console.log(chalk.blue("\n\t\t\t\tExiting the application.\t\t\t\t\n"));
  process.exit();
}


async function main() {
  let running = true;

  while (running) {
    let options = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do:",
        choices: [
          "Add Task",
          "Task List",
          "Mark Completed Task",
          "Update Task",
          "Delete Task",
          "Exit"
        ]
      }
    ]);

    const selectedAction = options.action.trim(); // Remove extra spaces

    if (selectedAction === "Add Task") {
      await addTask();
    } else if (selectedAction === "Task List") {
      todoList();
    } else if (selectedAction === "Mark Completed Task") {
      await markTaskCompleted();
    } else if (selectedAction === "Update Task") {
      await updateTask();
    } else if (selectedAction === "Delete Task") {
      await deleteTask();
    } else if (selectedAction === "Exit") {
      running = false; // Exit the loop
      exit();
    }
  }
}
main();
//  1. DOM Element Selectors 
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// //  2. Initial Setup (Remove the placeholder item)
// // We remove the static example item from the HTML so the list starts clean.
// // This is done by selecting all 'li' items and removing the first one found.
// const placeholderItem = document.querySelector(".todo-item");
// if (placeholderItem) {
//   placeholderItem.remove();
// }

/**
 * Creates and returns a new list item (li) element for a given task text.
 * @param {string} taskText - The text content for the task.
 * @returns {HTMLLIElement} The created list item element.
 */
function createListItem(taskText) {
  // Create the main <li> element
  const listItem = document.createElement("li");
  listItem.classList.add("todo-item");

  // Create the <span> for the task text
  const taskSpan = document.createElement("span");
  taskSpan.classList.add("task-text");
  taskSpan.textContent = taskText;

  // Create the <button> for deleting the task
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "🗑️"; // Trash can emoji

  // Append the span and button to the list item
  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteButton);

  return listItem;
}

/**
 * Handles the form submission event to add a new task.
 * @param {Event} event - The form submission event.
 */

  function addTask(event) {
    // 1. Prevent the default form submission (which reloads the page)
    event.preventDefault();

    const taskText = todoInput.value.trim();

    // 2. Check if the input is empty
    if (taskText === "") {
      alert("Please enter a task.");
      return; // Stop the function if empty
    }

    // --- NEW LOGIC: Remove the initial instruction message ---
    const initialMessage = document.getElementById("initial-message");
    if (initialMessage) {
      initialMessage.remove();
    }
    // --------------------------------------------------------

    // 3. Create the new list item element
    const newItem = createListItem(taskText);

    // 4. Append the new item to the <ul> element
    todoList.appendChild(newItem);

    // 5. Clear the input field for the next task
    todoInput.value = "";
  }  

// --- 4. Event Listeners ---
// Add the addTask function as the handler for the form's submit event.
todoForm.addEventListener("submit", addTask);


/**
 * Handles clicks on the list container for delete and complete actions.
 * @param {Event} event - The click event.
 */
function handleListClick(event) {
    const clickedElement = event.target;
    
    // 1. Handle Deletion
    if (clickedElement.classList.contains('delete-btn')) {
        // Find the parent <li> element (the entire task item)
        const listItem = clickedElement.closest('.todo-item');
        
        // Add a class to enable a smooth CSS fade-out animation before removal
        listItem.style.opacity = '0';
        
        // Wait for the fade-out transition to finish (or just a short delay)
        setTimeout(() => {
            if (listItem) {
                listItem.remove();
            }
        }, 300); // Wait 300ms (matches a common CSS transition time)
    } 
    
    // 2. Handle Task Completion Toggle
    else if (clickedElement.classList.contains('task-text')) {
        // Find the parent <li> element
        const listItem = clickedElement.closest('.todo-item');
        
        // Toggle the 'completed' class (which triggers the strike-through in CSS)
        if (listItem) {
            listItem.classList.toggle('completed');
        }
    }
}


// --- 5. New Event Listener (Event Delegation) ---
// We attach ONE listener to the parent <ul>
todoList.addEventListener('click', handleListClick);


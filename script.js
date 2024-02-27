

const addButton = document.querySelector('.add-button').addEventListener('click', async () => {
  const getValue = document.querySelector('#input-text').value;

  try {
    const response = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: getValue,
        completed: false,
        userId: 5,
      })
    })

    if (response.status !== 200) {
      throw new Error(`HTTP error! ${response.status}`)
    }

    const tasks = document.querySelector('.tasks');
    const taskLine = document.createElement('div');
    taskLine.classList.add('task-line');
    tasks.appendChild(taskLine)

    const spanTask = document.createElement('span');
    spanTask.classList.add('span-task');
    spanTask.innerHTML = getValue;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerText = 'Delete'


    taskLine.appendChild(spanTask);
    taskLine.appendChild(deleteButton);

    const ObjectToSave = {
      todo: getValue,
      userId: 5
    }

    localStorage.setItem('task', JSON.stringify(ObjectToSave))


    deleteButton.addEventListener('click', async () => {
      spanTask.remove()
      deleteButton.remove()


      try {
        const deleteTodo = await fetch('https://dummyjson.com/todos/1', {
          method: 'DELETE',
        })

        if (deleteTodo.status !== 200) {
          throw new Error(`HTTP error! ${deleteTodo.status}`)
        }

      } catch (error) {
        alert(error.message)
        console.log.error(error)
      }
    })



  } catch (error) {
    alert(error.message)
    console.log.error(error)
  }

})
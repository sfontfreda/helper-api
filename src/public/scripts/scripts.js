const getTasks = function() {
    fetch("/api/task")
      .then(data => data.json())
      .then(data => {
        let tableData = ""
        data.tasks.map((values) => {
          tableData += `
          <tr>
            <td> <button onclick=getTaskData("${values._id}")> CHANGE STATUS </button> </td>
            <td>${values._id}</td>
            <td>${values.status}</td>
            <td>${values.MTId}</td>
            <td>${values.filename}</td>
            <td> <button onclick=removeTask("${values._id}")> DELETE </button> </td>
            `
        });
        document.getElementById("task-table-body").innerHTML=tableData;
      })
  }

  const getOptions = (currentState) => {
    let options = ["ready", "reserved", "delayed"]
    return options.filter(op => op !== currentState);

  }

  const getTaskData = (id) => {
    document.getElementById("modify-form").style.display="inline"
    fetch(`/api/task/id/${id}`)
      .then(res => {
        return res.json()
      })
      .then (res => {
        const currentStatus = res.task.status
        document.getElementById("current-state").innerHTML = `<p class= ${currentStatus}> ${currentStatus}  </p>` 
        document.getElementById("button").innerHTML = `<button type="button" onClick=modifyTask("${id}")> APPLY </button>`
        
        options = getOptions(currentStatus)
  
        while (select.options.length > 0) {
          document.getElementById("select").remove(0);
        }
        options.forEach(option => {
          let newOption = document.createElement("option")
          newOption.value = option
          newOption.text = option
          document.getElementById("select").add(newOption);
       });
      })
    }
  

  const removeTask = (id) => {
    fetch(`/api/task/id/${id}`, { method: "DELETE"})
      .then(res => {
        document.getElementById("message").innerHTML = `<p> <strong> LAST ACTION: </strong> Task ${id} deleted </p>`
      })
  }

  const modifyTask = (id) => {
    let newStatus = document.getElementById("select").value
    fetch(`/api/task/update/${id}/${newStatus}`, {method: "PUT"})
      .then(res => {
        document.getElementById("modify-form").style.display="none"
        document.getElementById("message").innerHTML = `<p> <strong> LAST ACTION: </strong> Task ${id} updated to ${newStatus} </p>`

      })
  }
  
  getTasks();
  setInterval(getTasks, 1000)
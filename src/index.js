document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.getElementById("table-body")
    const editForm = document.getElementById("dog-form")


    function getDogs() {
        fetch("http://localhost:3000/dogs")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                createDom(element)
            });
        })
    }
    getDogs()
    
    function createDom(data) {
        let row = document.createElement("tr")
        row.setAttribute("id", `${data.id}`)
        let rowData = `
            <td>${data.name}</td>
            <td>${data.breed}</td>
            <td>${data.sex}</td>
            <td><button id=${data.id}>Edit</button></td>    
        `
        row.innerHTML = rowData
        row.querySelector("button").addEventListener("click", (e) => {
            let parent = e.target.parentNode.parentNode
            let elemId = parent.id
            if(data.id === parseInt(elemId)) {
                editForm.setAttribute("id", `${data.id}`)
                editForm["name"].value = data.name
                editForm["breed"].value = data.breed
                editForm["sex"].value = data.sex
            }
        })
        dogTable.append(row)
    }

    

    editForm.addEventListener("submit", (event) => {
        event.preventDefault()
        let itemId = parseInt(editForm.id)

        let dataObj = {
            name: event.target["name"].value,
            breed: event.target["breed"].value,
            sex: event.target["sex"].value
        }

        fetch(`http://localhost:3000/dogs/${itemId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataObj)
        })
        .then(response => response.json())
        .then(data => {
            dogTable.innerHTML = ''
            console.log(data)
            getDogs()
        })

        editForm.reset()
        
    })
})
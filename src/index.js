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
    
    function createDom(data) {
        let row = document.createElement("tr")
        let rowData = `
            <td>${data.name}</td>
            <td>${data.breed}</td>
            <td>${data.sex}</td>
            <td><button id=${data.id}>Edit</button></td>    
        `
        row.innerHTML = rowData
        row.querySelector("button").addEventListener("click", (e) => editDogData(e.target.id))
        dogTable.append(row)
    }
    
    function editDogData(id) {
        fetch(`http://localhost:3000/dogs/${id}`)
        .then(response => response.json())
        .then(data => console.log(data))
    }

    getDogs()
})
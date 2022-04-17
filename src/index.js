document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.getElementById("table-body")

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
            <td><button>Edit</button></td>    
        `
        row.innerHTML = rowData
        dogTable.append(row)
    }

    getDogs()
})
import { HostelServices } from "../service/hostelService.js";
let editingResidentId = null;
const s = new HostelServices();
const addBtn = document.getElementById("addResidentBtn");
const formContainer = document.getElementById("residentFormContainer");
const submitBtn = document.getElementById("submitResident");
// showing form
addBtn.addEventListener("click", () => {
    formContainer.style.display = "block";
});
// submit form
submitBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const age = Number(document.getElementById("age").value);
    const phone = document.getElementById("phone").value;
    const roomNumber = Number(document.getElementById("roomNumber").value);
    const checkInDate = document.getElementById("checkInDate").value;
    // to finally add resident and showing success msg
    try {
        if (editingResidentId) {
            // UPDATE
            s.updateResident(editingResidentId, name, age, phone, roomNumber, checkInDate);
            editingResidentId = null;
        }
        else {
            s.addResident(name, age, phone, roomNumber, checkInDate);
        }
        alert("Resident added successfully");
        formContainer.style.display = "none";
        adding_res();
    }
    catch (error) {
        alert(error.message);
    }
});
// adding data in table
const tablebody = document.getElementById("residentTableBody");
function adding_res() {
    tablebody.innerHTML = "";
    const residents = s.getResidents;
    residents.forEach((r) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${r.name}</td>
        <td>${r.age}</td>
        <td>${r.phone}</td>
        <td>${r.roomNumber}</td>
        <td>${r.checkIndate}</td>
        <td> 
           <button data-id="${r.id}" class="editBtn">Edit</button>
           <button data-id="${r.id}" class="delbtn">DELETE</button>
        </td>`;
        tablebody.appendChild(row);
    });
    // adding event listener for delete button
    const delbtn = document.querySelectorAll(".delbtn");
    delbtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const residentId = btn.dataset.id;
            if (!residentId)
                return;
            try {
                s.deleteResident(residentId);
                adding_res(); // refreshing table
            }
            catch (e) {
                alert(e.message);
            }
        });
    });
    // editing btn 
    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const residentId = btn.dataset.id;
            if (!residentId)
                return;
            const resident = s.getResidents.find(r => r.id === residentId);
            if (!resident)
                return;
            // editing mode
            editingResidentId = residentId;
            // Filling form again
            document.getElementById("name").value = resident.name;
            document.getElementById("age").value = resident.age.toString();
            document.getElementById("phone").value = resident.phone;
            document.getElementById("roomNumber").value = resident.roomNumber.toString();
            document.getElementById("checkInDate").value = resident.checkIndate;
            formContainer.style.display = "block";
        });
    });
    // search bar logic 
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
        var _a;
        const searchValue = searchInput.value.toLowerCase();
        const allRows = tablebody.getElementsByTagName("tr");
        for (let i = 0; i < allRows.length; i++) {
            const row = allRows[i];
            const nameCell = row.getElementsByTagName("td")[0]; // first column (name)
            if (nameCell) {
                const nameText = (_a = nameCell.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                if (nameText && nameText.includes(searchValue)) {
                    row.style.display = "";
                }
                else {
                    row.style.display = "none";
                }
            }
        }
    });
}
adding_res();

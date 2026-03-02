import { HostelServices } from "../service/hostelService.js";
let editingResidentId: string | null = null;


const s= new HostelServices();

const addBtn = document.getElementById("addResidentBtn") as HTMLButtonElement;
const formContainer = document.getElementById("residentFormContainer") as HTMLDivElement;
const submitBtn = document.getElementById("submitResident") as HTMLButtonElement;

// showing form
addBtn.addEventListener("click",()=>{
    formContainer.style.display="block";
});

// submit form
submitBtn.addEventListener("click",()=>{
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const age = Number((document.getElementById("age")as HTMLInputElement).value);
    const phone = (document.getElementById("phone")as HTMLInputElement).value;
    const roomNumber = Number((document.getElementById("roomNumber")as HTMLInputElement).value);
    const checkInDate = (document.getElementById("checkInDate") as HTMLInputElement).value;

    // to finally add resident and showing success msg
     try {

         if (editingResidentId) {

            // UPDATE
            s.updateResident(
                editingResidentId,
                name,
                age,
                phone,
                roomNumber,
                checkInDate
            );

            editingResidentId = null;

        } else{
           s.addResident(name, age, phone, roomNumber, checkInDate);
        } 

           alert("Resident added successfully");
           formContainer.style.display = "none";
           adding_res();
    }
    catch (error) {
        alert((error as Error).message);
    }
})


// adding data in table
const tablebody = document.getElementById("residentTableBody")as HTMLTableSectionElement;

function adding_res(){
    tablebody.innerHTML = "";
    const residents = s.getResidents;
    residents.forEach((r)=>{
        const row = document.createElement("tr");

        row.innerHTML=`<td>${r.name}</td>
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

    delbtn.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            const residentId = (btn as HTMLButtonElement).dataset.id;

            if(!residentId)return;

            try{
                s.deleteResident(residentId);
                adding_res(); // refreshing table
            }
            catch(e){
                alert((e as Error).message);
            }
        })
    })



    // editing btn 
    const editButtons = document.querySelectorAll(".editBtn");

    editButtons.forEach((btn) => {

    btn.addEventListener("click", () => {
    const residentId = (btn as HTMLButtonElement).dataset.id;
        if (!residentId) return;

        const resident = s.getResidents.find(r => r.id === residentId);
        if (!resident) return;

        // editing mode
        editingResidentId = residentId;

        // Filling form again
        (document.getElementById("name") as HTMLInputElement).value = resident.name;
        (document.getElementById("age") as HTMLInputElement).value = resident.age.toString();
        (document.getElementById("phone") as HTMLInputElement).value = resident.phone;
        (document.getElementById("roomNumber") as HTMLInputElement).value = resident.roomNumber.toString();
        (document.getElementById("checkInDate") as HTMLInputElement).value = resident.checkIndate;

        formContainer.style.display = "block";
    });

    });



    // search bar logic 
    const searchInput = document.getElementById("searchInput") as HTMLInputElement;

searchInput.addEventListener("input", () => {

    const searchValue = searchInput.value.toLowerCase();

    const allRows = tablebody.getElementsByTagName("tr");

    for (let i = 0; i < allRows.length; i++) {

        const row = allRows[i];
        const nameCell = row.getElementsByTagName("td")[0]; // first column (name)

        if (nameCell) {

            const nameText = nameCell.textContent?.toLowerCase();

            if (nameText && nameText.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    }
});
}

adding_res();

import { Rooms } from "../model/rooms";
import { Resident } from "../model/residents";
import { roomsAvailability } from "../data/roomsData";

export class HostelServices {

    private rooms: Rooms[] = [];
    private residents: Resident[] = [];

    constructor() {
        this.loadData();
    }

    private loadData(): void {

        const storedRooms = localStorage.getItem("rooms");
        const storedResidents = localStorage.getItem("residents");

        this.rooms = storedRooms ? JSON.parse(storedRooms) : roomsAvailability;
        this.residents = storedResidents ? JSON.parse(storedResidents) : [];
    }

    private saveData(): void {
        localStorage.setItem("rooms", JSON.stringify(this.rooms));
        localStorage.setItem("residents", JSON.stringify(this.residents));
    }

    get getRooms() {
        return this.rooms;
    }

    get getResidents() {
        return this.residents;
    }

    addResident(
        name: string,
        age: number,
        phone: string,
        roomNumber: number,
        checkInDate: string
    ): void {

        const room = this.rooms.find(r => r.roomNumber === roomNumber);

        if (!room) throw new Error("Room does not exist");
        if (room.isOccupied) throw new Error("Room is already occupied");

        const newResident: Resident = {
            id: Date.now().toString(),
            name,
            age,
            phone,
            roomNumber,
            checkIndate: checkInDate
        };

        this.residents.push(newResident);
        room.isOccupied = true;

        this.saveData();
    }

    deleteResident(id: string): void {

        const index = this.residents.findIndex(r => r.id === id);

        if (index === -1) throw new Error("Resident not found");

        const resident = this.residents[index];

        const room = this.rooms.find(r => r.roomNumber === resident.roomNumber);
        if (room) room.isOccupied = false;

        this.residents.splice(index, 1);

        this.saveData();
    }

    updateResident(
        id: string,
        name: string,
        age: number,
        phone: string,
        roomNumber: number,
        checkInDate: string
    ): void {

        const resident = this.residents.find(r => r.id === id);
        if (!resident) throw new Error("Resident not found");

        if (resident.roomNumber !== roomNumber) {

            const newRoom = this.rooms.find(r => r.roomNumber === roomNumber);
            if (!newRoom) throw new Error("Room not found");
            if (newRoom.isOccupied) throw new Error("Room already occupied");

            const oldRoom = this.rooms.find(r => r.roomNumber === resident.roomNumber);
            if (oldRoom) oldRoom.isOccupied = false;

            newRoom.isOccupied = true;
            resident.roomNumber = roomNumber;
        }

        resident.name = name;
        resident.age = age;
        resident.phone = phone;
        resident.checkIndate = checkInDate;

        this.saveData();
    }

    getVacantRooms() {
        return this.rooms.filter(r => !r.isOccupied);
    }

    getOccupiedRooms() {
        return this.rooms.filter(r => r.isOccupied);
    }
}
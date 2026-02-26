type UserRole = "admin" | "editor" | "viewer";

function assignRole(role: UserRole): string {
  return `Assigned role: ${role}`;
}

console.log(assignRole("admin"));



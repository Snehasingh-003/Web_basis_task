async function fetchUsers() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    console.log("Fetch attempt completed");
  }
}

fetchUsers();
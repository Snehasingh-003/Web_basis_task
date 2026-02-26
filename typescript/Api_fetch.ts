function fetchProducts(): Promise<string[]> {

  return new Promise((resolve, reject) => {
    const success = true;

    if (success) {
      resolve(["Laptop", "Phone", "Tablet"]);
    } else {
      reject("Failed to fetch products");
    }
  });
}

fetchProducts()
  .then(products => console.log(products))
  .catch(error => console.log(error))
//   .finally(() => console.log("Request finished"));
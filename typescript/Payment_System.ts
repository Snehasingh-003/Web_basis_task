interface CardPayment {
  type: "card";
  cardNumber: string;
}

interface UPIPayment {
  type: "upi";
  email: string;
}

type Payment = CardPayment | UPIPayment;

function processPayment(p: Payment) {
  if (p.type === "card") {
    console.log(`Processing card: ${p.cardNumber}`);
  } else {
    console.log(`Processing UPI: ${p.email}`);
  }
}


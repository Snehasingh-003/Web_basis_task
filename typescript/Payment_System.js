"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function processPayment(p) {
    if (p.type === "card") {
        console.log(`Processing card: ${p.cardNumber}`);
    }
    else {
        console.log(`Processing UPI: ${p.email}`);
    }
}
//# sourceMappingURL=Payment_System.js.map
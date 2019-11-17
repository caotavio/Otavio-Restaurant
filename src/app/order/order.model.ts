class Order {
    constructor(
        public street: string,
        public number: number,
        public complement: string,
        public city: string,
        public county: string,
        public postCode: string,
        public paymentOption: string,
        public orderItems: OrderItem[] = []

    ) {}
}

class OrderItem {
    constructor(public quantity: number, public menuId: string) {}
}

export {Order, OrderItem}
export class Order {

    constructor(
        public orderId: string,
        public userId: string,
        public productId: string,
        public date: string,
        public amount: number,
    ) {}

}
import { Order } from "../../model/order";
import { Build } from "../../model/build";
import { Part } from "../../model/part";
import { User } from "../../model/user";

const part1 = new Part({ name: 'Ryzen 5600X', brand: 'AMD', type: 'CPU', price: 150});
const part2 = new Part({ name: 'RTX 3060', brand: 'NVIDIA', type: 'GPU', price: 200});
const parts = [part1, part2];

const name = "test build";

const build1 = new Build({ name, parts, price: 500, preBuild: false });
const build2 = new Build({ name, parts, price: 600, preBuild: true });

const builds = [build1, build2];
const price = 1100;
const orderStatus = 'preparing';
const orderDate = new Date();

const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password', address: 'John Doe Avenue 76' });

test('given: valid values for order, when: order is created, then: order is created with those values', () => {
    // given

    // when
    const order = new Order({ builds, price, orderStatus, orderDate, user });

    // then
    expect(order.getBuilds()).toEqual(builds);
    expect(order.getPrice()).toEqual(price);
    expect(order.getOrderStatus()).toEqual(orderStatus);
    expect(order.getOrderDate()).toEqual(orderDate);
});

test('given: order with empty orderStatus, when: order is created, then: an error is thrown', () => {
    // given
    const emptyOrderStatus = '';

    // when
    const order = () => new Order({ builds, price, orderStatus: emptyOrderStatus, orderDate, user });

    // then
    expect(order).toThrow('OrderStatus cannot be empty');
});

test('given: order with negative price, when: order is created, then: an error is thrown', () => {
    // given
    const negativePrice = -1100;

    // when
    const order = () => new Order({ builds, price: negativePrice, orderStatus, orderDate, user });

    // then
    expect(order).toThrow('Order must have positive and non zero price');
});

test('given: order with price of zero, when: order is created, then: an error is thrown', () => {
    // given
    const zeroPrice = 0;

    // when
    const order = () => new Order({ builds, price: zeroPrice, orderStatus, orderDate, user });

    // then
    expect(order).toThrow('Order must have positive and non zero price');
});

test('given: order with future date, when: order is created, then: an error is thrown', () => {
    // given
    const futureDate = new Date();
    futureDate.setDate(orderDate.getDate() + 50);

    // when
    const order = () => new Order({ builds, price, orderStatus, orderDate: futureDate, user });

    // then
    expect(order).toThrow('Order date cannot be in the future');
});
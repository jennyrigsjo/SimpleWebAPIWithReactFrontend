import React, { Component } from 'react';

class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { orders: [], orderDetails: {}, loading: true };
    }

    componentDidMount() {
        this.getOrders();
    }

    async getOrders() {
        const response = await fetch('orders');
        const data = await response.json();
        this.setState({ orders: data, loading: false });
    }

    async getOrderDetails(orderNumber) {
        console.log(orderNumber);
        const response = await fetch(`orders/${orderNumber}`);
        const data = await response.json();
        this.setState({ orderDetails: data, loading: false });
        console.log(this.state.orderDetails);
    }

    static renderOrdersTable(orders) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Order Date</th>
                        <th>Customer Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order =>
                        <tr key={order.orderNumber}>
                            <td>{order.orderNumber}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.customer.customerNumber}</td>
                            <td><button>Details</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
            : App.renderOrdersTable(this.state.orders);

        return (
            <div>
                <h1 id="tabelLabel" >Orders</h1>
                {contents}
            </div>
        );
    }
}

export default App;

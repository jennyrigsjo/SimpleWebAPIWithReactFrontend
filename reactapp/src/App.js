import { useEffect, useState } from "react"

function App() {

    const [orders, setOrders] = useState([])

    const [orderDetails, setOrderDetails] = useState(null)

    const [loadingOrders, setLoadingOrders] = useState(false)

    const fetchOrders = () => {
        fetch('orders')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setOrders(data)
            })
            .finally(() => {
                setLoadingOrders(false)
            })
    }

    const fetchOrderDetails = (orderNumber) => {
        fetch(`orders/${orderNumber}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setOrderDetails(data)
            })
    }

    const renderOrdersTable = () => {

        if (loadingOrders) {
            return (<>
                <h1>Orders</h1>
                <p>Loading, please wait...</p>
            </>)
        } else {
            return (
                <>
                    <div className="orders">
                        <h1>Orders</h1>
                        <table>
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
                                        <td>
                                            <button onClick={() => fetchOrderDetails(order.orderNumber)}>View</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )
        }
    }

    const renderOrderDetails = () => {

        if (orderDetails) {
            return (
                <>
                    <div className="order-details">
                        <h2>Order Details</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Order Number</th>
                                    <th>Order Date</th>
                                    <th>Customer Number</th>
                                    <th>Customer Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={orderDetails.orderNumber}>
                                    <td>{orderDetails.orderNumber}</td>
                                    <td>{orderDetails.orderDate}</td>
                                    <td>{orderDetails.customer.customerNumber}</td>
                                    <td>{orderDetails.customer.customerName}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>Items in order:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>OrderLine Number</th>
                                    <th>Product Number</th>
                                    <th>Quantity</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Product Group</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.orderLines.map(orderLine =>
                                    <tr key={orderLine.orderLineNumber}>
                                        <td>{orderLine.orderLineNumber}</td>
                                        <td>{orderLine.productNumber}</td>
                                        <td>{orderLine.quantity}</td>
                                        <td>{orderLine.name}</td>
                                        <td>{orderLine.description}</td>
                                        <td>{orderLine.price}</td>
                                        <td>{orderLine.productGroup}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )
        } else {
            return null;
        }
    }

    useEffect(() => {
        setLoadingOrders(true)
        fetchOrders()
    }, [])

    return (
        <div className="App">
            {renderOrdersTable()}
            {renderOrderDetails()}
        </div>
    );
}

export default App;

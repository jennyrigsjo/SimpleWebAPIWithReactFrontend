import { useEffect, useState } from "react"

function App() {
    const [users, setUsers] = useState([])

    const [loadingUsers, setLoadingUsers] = useState(false)

    const [userDetails, setUserDetails] = useState(null)

    const fetchUsers = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUsers(data)
            })
            .finally(() => {
                setLoadingUsers(false)
            })
    }

    const fetchUserById = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                setUserDetails(data)
            })
    }

    useEffect(() => {
        setLoadingUsers(true)
        fetchUsers()
    }, [])

    const renderUserDetails = () => {

        if (userDetails) {
            console.log(userDetails)
            return (
                <>
                    <h2>User Details</h2>
                    <p>Website: {userDetails.website}</p>
                </>
            )
        } else {
            return null;
        }
    }

    const renderUsersTable = () => {

        if (loadingUsers) {
            return (<>
                        <h2>Users</h2>
                        <p>Loading, please wait...</p>
                    </>)
        } else {
            return (
                <>
                    <h2>Users</h2>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <button onClick={() => fetchUserById(user.id)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )
        }
    }

    return (
        <div className="App">
            {renderUsersTable()}
            {renderUserDetails()}
        </div>
    );
}

export default App;

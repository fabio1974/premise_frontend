import React, {useEffect, useState} from 'react';
import axios from "axios";

function Hooks(props) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log("User Feffect")
        async function getUsers() {
            const result = await axios.get('https://jsonplaceholder.typicode.com/users')
            setUsers(result.data)
        }
        getUsers()
    });
    return (
        <div>
            <ul>
            {users.map((user,index)=>(
                <li key={user.id}>{user.name}</li>
            ))}
            </ul>
        </div>
    );
}

export default Hooks;

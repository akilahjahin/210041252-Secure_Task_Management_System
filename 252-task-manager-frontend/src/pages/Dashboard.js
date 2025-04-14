import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/tasks", { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => setTasks(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2>Welcome {user?.name}</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>{task.title} - {task.priority}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;

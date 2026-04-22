import { useEffect, useState } from "react";
import { request } from "../utils/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [user, setUser] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const data = await request("/auth/profile");
      setUser(data.user);
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchUser();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await request("/tasks");
      setTasks(data);
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await request("/tasks", "POST", form);
      setForm({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleEditClick = (task) => {
    setEditId(task._id);
    setEditData({
      title: task.title,
      description: task.description,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      await request(`/tasks/${id}`, "PUT", editData);
      setEditId(null);
      fetchTasks();
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await request(`/tasks/${id}`, "DELETE");
      fetchTasks();
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          {user && (
            <p className="text-sm text-gray-600">
              Welcome, {user.name}{" "} 
              <span
                className={`font-semibold ${
                  user.role === "admin" ? "text-red-500" : "text-blue-500"
                }`}
              >
                ({user.role})
              </span>
            </p>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {msg && <p className="text-red-500 mb-4">{msg}</p>}

      <form
        onSubmit={handleCreate}
        className="bg-white p-4 rounded shadow mb-6 space-y-3"
      >
        <h3 className="font-semibold">Create Task</h3>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          className="w-full p-2 border rounded"
        />

        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Task description"
          className="w-full p-2 border rounded"
        />

        <button
          disabled={!form.title}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Create Task
        </button>
      </form>

      <div className="grid gap-4">
        {tasks.length === 0 && <p className="text-gray-500">No tasks yet</p>}
          <p className="underline bg-yellow-400 max-w-fit">Tasks can only be deleted by admin.</p>
        {tasks.map((task) => (
          <div key={task._id} className="p-4 border rounded shadow space-y-2">
            {editId === task._id ? (
              <>
                <input
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />

                <input
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />

                <button
                  onClick={() => handleUpdate(task._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="font-semibold">{task.title}</h3>
                <p>{task.description}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

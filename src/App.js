import { useState } from "react";
import "./App.css";
import { UserRow } from "./components/UserRow";

const initialState = {
  name: "",
  gender: "Male",
  role: "FrontEnd Developer",
  maritalStatus: false,
};

function App() {
  const [formData, setFormData] = useState(initialState);
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setUsers([...users, formData]);
    setFormData(initialState);
  };

  return (
    <div className="App">
      <div>
        <h1>User Form</h1>
        <div className="form-wrapper" data-testid="form-wrapper">
          <form onSubmit={submitHandler} data-testid="form-element">
            <div className="name-wrapper" data-testid="name-wrapper">
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Name"
                value={formData.name}
              />
            </div>
            <div className="gender-wrapper" data-testid="gender-wrapper">
              <label>Gender</label>
              <select
                onChange={handleChange}
                name="gender"
                placeholder="Gender"
                value={formData.gender}
                data-testid="gender-select"
              >
                <option key="Male">Male</option>
                <option key="Female">Female</option>
                <option key="Prefer Not to Say">Prefer Not to Say</option>
              </select>
            </div>
            <div className="role-wrapper" data-testid="role-wrapper">
              <label>Role</label>
              <select
                onChange={handleChange}
                name="role"
                placeholder="Role"
                value={formData.role}
                data-testid="role-select"
              >
                <option key="FrontEnd Developer">FrontEnd Developer</option>
                <option key="BackEnd Developer">BackEnd Developer</option>
                <option key="FullStack Developer">FullStack Developer</option>
              </select>
            </div>
            <div
              className="marital-status-wrapper"
              data-testid="marital-status-wrapper"
            >
              <legend>Martial Status</legend>
              <div>
                <input
                  name="maritalStatus"
                  onChange={handleChange}
                  checked={formData.maritalStatus}
                  type="checkbox"
                />
                <label>Married</label>
              </div>
            </div>
            <div>
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>

      {users.length > 0 ? (
        <table data-testid="user-container">
          <thead>
            <tr>
              <th>S.no</th>
              <th>User</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Marital Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <UserRow {...user} id={index + 1} />;
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h2 data-testid="no-user-container">no users found</h2>
      )}
    </div>
  );
}

export default App;

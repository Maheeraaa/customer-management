import { useState } from "react";
import "../styles/Grid.css";

const CustomerGrid = ({
  customers,
  fetchCustomers,
  selectedCustomer,
  setSelectedCustomer,
  setEditingCustomer,
  setView
}) => {

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchCustomers(value);
  };

  const handleEdit = (e, customer) => {
    e.stopPropagation();
    setEditingCustomer(customer);
    setView("edit");
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    if (!window.confirm("Delete this customer?")) return;

    await fetch(`http://localhost:5000/api/customers/${id}`, {
      method: "DELETE"
    });

    fetchCustomers();
  };

  return (
    <div>

      <input
        className="search-box"
        placeholder="Search customers..."
        value={search}
        onChange={handleSearch}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="8">
                <div className="empty-state">
                  No customers found
                </div>
              </td>
            </tr>
          ) : (
            customers.map(c => (
              <tr
                key={c.customer_id}
                onClick={() => setSelectedCustomer(c)}
                className={`table-row ${selectedCustomer?.customer_id === c.customer_id
                    ? "selected"
                    : ""
                  }`}
              >
                <td>{c.customer_id}</td>
                <td>{c.fname}</td>
                <td>{c.lname}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.city}</td>
                <td>{c.state}</td>

                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => handleEdit(e, c)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={(e) => handleDelete(e, c.customer_id)}
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
};

export default CustomerGrid;
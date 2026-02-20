import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CustomerGrid from "../components/CustomerGrid";
import CustomerForm from "../components/CustomerForm";
import CustomerDetails from "../components/CustomerDetails";
import "../styles/Layout.css";

const CustomerPage = () => {

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [view, setView] = useState("list");

  const fetchCustomers = async (search = "") => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/customers?search=${search}`
      );
      const data = await res.json();
      setCustomers(data);

      if (selectedCustomer) {
        const updated = data.find(
          c => c.customer_id === selectedCustomer.customer_id
        );
        setSelectedCustomer(updated || null);
      }

    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="layout">

      <Sidebar
        view={view}
        setView={setView}
        setSelectedCustomer={setSelectedCustomer}
        setEditingCustomer={setEditingCustomer}
      />

      <div className="main">
        {(view === "add" || view === "edit") ? (
          <CustomerForm
            fetchCustomers={fetchCustomers}
            editingCustomer={editingCustomer}
            setEditingCustomer={setEditingCustomer}
            setView={setView}
          />
        ) : (
          <CustomerGrid
            customers={customers}
            fetchCustomers={fetchCustomers}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            setEditingCustomer={setEditingCustomer}
            setView={setView}
          />
        )}
      </div>

      {view === "list" && (
        <CustomerDetails customer={selectedCustomer} />
      )}

    </div>
  );
};

export default CustomerPage;
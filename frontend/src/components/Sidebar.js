const Sidebar = ({
  view,
  setView,
  setSelectedCustomer,
  setEditingCustomer
}) => {

  return (
    <div className="sidebar">

      <h3>Customers</h3>

      <button
        className={view === "list" ? "active" : ""}
        onClick={() => {
          setEditingCustomer(null);
          setSelectedCustomer(null);
          setView("list");
        }}
      >
        View Customers
      </button>

      <button
        className={view === "add" ? "active" : ""}
        onClick={() => {
          setSelectedCustomer(null);
          setEditingCustomer(null);
          setView("add");
        }}
      >
        Add Customer
      </button>
    </div>
  );
};

export default Sidebar;
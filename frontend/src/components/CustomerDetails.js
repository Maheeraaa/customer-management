import "../styles/Details.css";

const CustomerDetails = ({ customer }) => {

  if (!customer) {
    return (
      <div className="details">
        <div className="empty-state">
          Select a customer to view details
        </div>
      </div>
    );
  }

  return (
    <div className="details">

      <div className="profile-header">
        <div className="avatar">
          {customer.fname[0]}
          {customer.lname[0]}
        </div>
        <h3>{customer.fname} {customer.lname}</h3>
      </div>

      <div className="detail-item">
        <div className="detail-label">Email</div>
        <div className="detail-value">{customer.email}</div>
      </div>

      <div className="detail-item">
        <div className="detail-label">Phone</div>
        <div className="detail-value">{customer.phone}</div>
      </div>

      <div className="detail-item">
        <div className="detail-label">City</div>
        <div className="detail-value">{customer.city}</div>
      </div>

      <div className="detail-item">
        <div className="detail-label">Pincode</div>
        <div className="detail-value">{customer.pincode}</div>
      </div>

      <div className="detail-item">
        <div className="detail-label">State</div>
        <div className="detail-value">{customer.state}</div>
      </div>

      <div className="detail-item">
        <div className="detail-label">Country</div>
        <div className="detail-value">{customer.country}</div>
      </div>

      <div className="detail-item">
        <div className="detail-label">DOB</div>
        <div className="detail-value">
          {customer.dob
            ? new Date(customer.dob).toLocaleDateString("en-GB")
            : ""}
        </div>
      </div>

    </div>
  );
};

export default CustomerDetails;
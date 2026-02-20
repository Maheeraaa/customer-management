import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/Form.css";

const CustomerForm = ({
  fetchCustomers,
  editingCustomer,
  setEditingCustomer,
  setView
}) => {

  const [countryCodes, setCountryCodes] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    countryCode: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    dob: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/customers/country-codes")
      .then(res => res.json())
      .then(res => {
        if (!Array.isArray(res.data)) return;

        setCountryCodes(
          res.data.map(c => ({
            name: c.name,
            code: c.callingCode
          }))
        );
      });
  }, []);

  useEffect(() => {
    if (!editingCustomer) {
      setFormData({
        fname: "",
        lname: "",
        email: "",
        countryCode: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        dob: ""
      });
    }
  }, [editingCustomer]);

  useEffect(() => {
    if (editingCustomer && countryCodes.length) {

      let phoneNumber = editingCustomer.phone || "";
      let matchedCode = "";
      let remainingPhone = phoneNumber;

      for (let c of countryCodes) {
        if (phoneNumber.startsWith(c.code)) {
          matchedCode = c.code;
          remainingPhone = phoneNumber.slice(c.code.length);
          break;
        }
      }

      setFormData({
        ...editingCustomer,
        countryCode: matchedCode,
        phone: remainingPhone,
        dob: editingCustomer.dob
          ? editingCustomer.dob.split("T")[0]
          : ""
      });
    }
  }, [editingCustomer, countryCodes]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "countryCode") {
      const selected = countryCodes.find(c => c.code === value);
      setFormData({
        ...formData,
        countryCode: value,
        country: selected?.name || ""
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let err = {};

    if (!formData.fname) err.fname = "Required";
    if (!formData.lname) err.lname = "Required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      err.email = "Invalid email";
    if (!formData.countryCode) err.phone = "Select code";
    if (formData.phone.length !== 10)
      err.phone = "10 digit phone required";
    if (!formData.city) err.city = "Required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      phone: `${formData.countryCode}${formData.phone}`
    };

    let url = "http://localhost:5000/api/customers";
    let method = "POST";

    if (editingCustomer) {
      url = `${url}/${editingCustomer.customer_id}`;
      method = "PUT";
    }

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    await fetchCustomers();

    toast.success(
      editingCustomer
        ? "Customer updated successfully"
        : "Customer added successfully"
    );

    setEditingCustomer(null);
    setView("list");
  };

  return (
    <div className="form-card">
      <h2>{editingCustomer ? "Edit Customer" : "Add Customer"}</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>First Name <span className="required">*</span> </label>
          <input name="fname" value={formData.fname} onChange={handleChange} />
          {errors.fname && <span className="error">{errors.fname}</span>}
        </div>

        <div className="form-group">
          <label>Last Name<span className="required">*</span></label>
          <input name="lname" value={formData.lname} onChange={handleChange} />
          {errors.lname && <span className="error">{errors.lname}</span>}
        </div>

        <div className="form-group">
          <label>Email<span className="required">*</span></label>
          <input name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone<span className="required">*</span></label>
          <div className="phone-group">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
            >
              <option value="">Code</option>
              {countryCodes.map(c => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>

            <input
              value={formData.phone}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (value.length <= 10) {
                  setFormData({
                    ...formData,
                    phone: value
                  });
                }
              }}
            />
          </div>
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>City<span className="required">*</span></label>
          <input name="city" value={formData.city} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>State</label>
          <input name="state" value={formData.state} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input name="country" value={formData.country} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input name="pincode" value={formData.pincode} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>DOB</label>
          <input
            type="date"
            name="dob"
            value={formData.dob || ""}
            max={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </div>

        <button className="submit-btn">
          {editingCustomer ? "Update Customer" : "Add Customer"}
        </button>

      </form>
    </div>
  );
};

export default CustomerForm;
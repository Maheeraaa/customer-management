const db = require("../config/db");

exports.createCustomer = async (req, res) => {
    try {
        const {
            fname,
            lname,
            email,
            phone,
            city,
            state,
            country,
            pincode,
            dob
        } = req.body;

        if (!fname || !lname || !email || !phone || !city) {
            return res.status(400).json({
                message: "Required fields missing"
            });
        }

        const query = `
            INSERT INTO customers
            (fname, lname, email, phone, city, state, country, pincode, dob)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await db.query(query, [
            fname,
            lname,
            email,
            phone,
            city,
            state,
            country,
            pincode,
            dob
        ]);

        res.status(201).json({
            message: "Customer created successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const search = req.query.search || "";

        const query = `
            SELECT * FROM customers
            WHERE
                fname LIKE ? OR
                lname LIKE ? OR
                email LIKE ? OR
                phone LIKE ? OR
                city LIKE ?
            ORDER BY created_at DESC
        `;

        const searchValue = `%${search}%`;

        const [rows] = await db.query(query, [
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            searchValue
        ]);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            fname,
            lname,
            email,
            phone,
            city,
            state,
            country,
            pincode,
            dob
        } = req.body;

        if (!fname || !lname || !email || !phone || !city) {
            return res.status(400).json({
                message: "Required fields missing"
            });
        }

        const query = `
            UPDATE customers
            SET
                fname = ?,
                lname = ?,
                email = ?,
                phone = ?,
                city = ?,
                state = ?,
                country = ?,
                pincode = ?,
                dob = ?
            WHERE customer_id = ?
        `;

        const [result] = await db.query(query, [
            fname,
            lname,
            email,
            phone,
            city,
            state,
            country,
            pincode,
            dob,
            id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.json({
            message: "Customer updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            DELETE FROM customers
            WHERE customer_id = ?
        `;

        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.json({
            message: "Customer deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const axios = require("axios");

exports.getCountryCodes = async (req, res) => {
  try {
    const response = await axios.get(
      "https://apihut.in/api/country/phone-codes",
      {
        headers: {
          "X-Avatar-Key": "avatarhubadmin"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch country codes"
    });
  }
};

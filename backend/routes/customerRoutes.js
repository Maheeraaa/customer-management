const express = require("express");
const router = express.Router();

const {
    createCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    getCountryCodes
} = require("../controllers/customerController");

router.post("/", createCustomer);
router.get("/", getCustomers);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.get("/country-codes", getCountryCodes);

module.exports = router;
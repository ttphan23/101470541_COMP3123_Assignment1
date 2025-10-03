const express = require('express');
const Employee = require('./employeeModel');

const router = express.Router();

// GET
router.get('/employees', async (req,res) => {
  const list = await Employee.find();
  res.json(list.map(e => ({ ...e._doc, employee_id: e._id })));
});

// CREATE
router.post('/employees', async (req,res) => {
  const emp = await Employee.create(req.body);
  res.status(201).json({ message: "Employee created successfully.", employee_id: emp._id });
});

// GET by id
router.get('/employees/:eid', async (req,res) => {
  const emp = await Employee.findById(req.params.eid);
  if (!emp) return res.status(404).json({ status:false, message:"Employee not found" });
  res.json({ ...emp._doc, employee_id: emp._id });
});

// UPDATE
router.put('/employees/:eid', async (req,res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.eid, req.body);
  if (!emp) return res.status(404).json({ status:false, message:"Employee not found" });
  res.json({ message:"Employee details updated successfully." });
});

// DELETE
router.delete('/employees', async (req,res) => {
  const emp = await Employee.findByIdAndDelete(req.query.eid);
  if (!emp) return res.status(404).json({ status:false, message:"Employee not found" });
  res.status(204).send();
});

module.exports = router;

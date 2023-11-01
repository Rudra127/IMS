import registerUsers from "../Schema/register.js";

const UpdateEmployees = async (req, res) => {
  try {
    const employeeData = req.body;
    console.log({ empId: employeeData.empId });
    console.log(employeeData);
    const UpdatedEmployee = await registerUsers.updateOne(
      { empId: employeeData.empId },
      employeeData
    );
    console.log(UpdatedEmployee);
    if (UpdatedEmployee) {
      res.json({ message: "Category updated successfully", UpdatedEmployee });
    } else {
      res.json({ message: "No Category were created" });
    }
  } catch (error) {
    console.error("Error updating Category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default UpdateEmployees;

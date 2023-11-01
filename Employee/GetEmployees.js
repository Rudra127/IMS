import categories from "../Schema/Category.js";

const GetEmployees = async (req, res) => {
  try {
    const { empId } = await req.query;
    const query = {};

    if (empId) {
      query.empId = empId;
    }

    const findEmployees = await categories.find(query);
    res.status(200).json({ findEmployees });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
export default GetEmployees;

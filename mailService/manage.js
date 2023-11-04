import RegisterUsers from "../Schema/register.js";

const manage = async (req, res) => {
const { email, decision} = req.body;

  // Update the user's status in the database based on the decision
  const userStatus = decision === 'approve' ? 'approved' : 'declined';
  await RegisterUsers.findOneAndUpdate(
    { email }, // Update based on your user identification criteria
    { isConfirmed: userStatus }
  );

  if (userStatus === 'approved') {
    try {
      await sendApprovalNotificationEmail(managerEmail, email);
    } catch (error) {
      console.error("Error sending approval email", error);
    }
  } else if (userStatus === 'declined') {
    try {
      await sendDeclineNotificationEmail(managerEmail, email);
    } catch (error) {
      console.error("Error sending decline email", error);
    }
  }

  res.json({ message: 'Registration status updated and email sent.' });
};
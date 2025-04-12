const nodemailer = require('nodemailer');
// contact 
const ContactSchema = require("../model/contactSchema");

// contact
module.exports.contact = async (req, res) => {
  try {
    // Save contact data to the database
    console.log(req.body);
    let data = await ContactSchema.create(req.body);

    const { name, email,number, message } = req.body; // Use name/message if available

    const transporter = nodemailer.createTransport({
      host: 'rocket.vivawebhost.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@trinityengitech.com',
        pass: 'D5t$!o0VAAha',
      },
    });

    // Mail to customer
    const mailOptions = {
      from: 'info@trinityengitech.com',
      to: email,
      subject: "Your Recent Inquiry with TRINITY ENGITECH",
      html: `<h2>Dear Customer</h2>
             <p>Thank you for reaching out to us through our contact form. We have received your message and will be happy to assist you.</p>
             <p>Our team is currently reviewing your inquiry and will get back to you. 
             If you need immediate assistance, please feel free to reach out to us via:</p>
             <ul>
               <li>Phone Call: +91 9714299399</li>
               <li>WhatsApp: +91 8866299399</li>
             </ul>
             <p>We appreciate your patience and look forward to helping you!</p>
             <h4>Best regards,</h4>
             <h5>TRINITY ENGITECH</h5>`,
    };

    // Mail to your team member
    const teamMailOptions = {
      from: 'info@trinityengitech.com',
      to: 'info@trinityengitech.com', // Replace with actual team email
      subject: `New Inquiry from ${name}`,
      html: `<h2>New Inquiry Received from TRINITYENGITECH</h2>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Email:</strong> ${number}</p>
             <p><strong>Message:</strong> ${message}</p>
             <p>Check the admin panel or reach out to the customer if needed.</p>`,
    };

    // Send customer confirmation
    await transporter.sendMail(mailOptions);

    // Send internal team notification
    await transporter.sendMail(teamMailOptions);

    res.status(201).json({ status: 201, message: "Emails sent and data saved", data });
    
  } catch (error) {
    console.error("Error processing contact:", error);
    res.status(400).json({ msg: "Data not submitted", error });
  }
};


// contact Inquiry
module.exports.adminDashboard = async (req, res) => {
  try {
    const contacts = await ContactSchema.find({});
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
};


// New method to delete a single contact by ID
module.exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await ContactSchema.findByIdAndDelete(id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: 'Error deleting contact' });
  }
};

// New method to delete multiple contacts
module.exports.deleteContacts = async (req, res) => {
  const { ids } = req.body; // Expecting an array of IDs in the request body
  try {
    await ContactSchema.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: 'Contacts deleted successfully' });
  } catch (error) {
    console.error("Error deleting contacts:", error);
    res.status(500).json({ message: 'Error deleting contacts' });
  }
};

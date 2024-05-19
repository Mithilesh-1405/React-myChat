//NOTE : For this emailController to work, it is necessary to follow the steps given in prerequisites.txt

const nodemailer = require('nodemailer');

//We get the user model and list model in order to access the users from a given list
const User = require('../models/user');
const List = require('../models/list');
require('dotenv').config();

exports.sendEmails = async (req, res) => {

    //1) Get the listID from database
    const listId = req.params.listId;
    const { subject, body } = req.body;
    
    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ status: 'error', message: 'List not found' });
        }

    //2) Get the users from the provided listID from step 1
        const users = await User.find({ listId, unsubscribed: { $ne: true } });
    
    //3) Send emails to all the users from the retrieved users using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL, // Your email address
                pass: process.env.TEMP_PASSWORD, // Your email password
            },
        });

    //For each email, we replace the email body with the respective properties of the current user, like name, email, city etc
        
        //Iterating the users object one by one and replacing the properties
        for (const user of users) {
            let personalizedBody = body;

            //replacing the [name] in the email body with the current users name
            personalizedBody = personalizedBody.replace('[name]', user.name);
            personalizedBody = personalizedBody.replace('[email]', user.email);
        

            //Iterating each customProperty of the current user
            list.customProperties.forEach((value, key) => {
                const propValue = user.properties.get(key) || value; 
                console.log(`Replacing [${key}] with`, propValue);
                personalizedBody = personalizedBody.replace(`[${key}]`, propValue);
              });
        
            //sending the mail
            const mailOptions = {
              from: process.env.EMAIL,
              to: user.email,
              subject,
              text: personalizedBody,
              html: `<p>${personalizedBody}</p><p><a href="http://yourdomain.com/unsubscribe/${listId}/${user._id}">Unsubscribe</a></p>`,
            };
        
            await transporter.sendMail(mailOptions);
          }
        
        //Send a success message if success
        res.json({ status: 'success', message: 'Emails sent successfully to all the users in the list.' });
    } catch (error) {
        //send the error message
        res.status(500).json({ status: 'error', message: error.message });
    }
};

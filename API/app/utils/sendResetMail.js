const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        const info = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("reset email sent ---> Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;
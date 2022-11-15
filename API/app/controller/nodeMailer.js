const nodemailer = require("nodemailer");
const userDataMapper = require('../datamapper/user');

const sendMailController = {
    main: async (req, res) => {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
        try {
            if (req.auth.humanId) {
                const senderMail = await userDataMapper.humanMail(req.auth.humanId);
                const getHuman = senderMail[0];
                console.log('getHuman------------>', getHuman);
                const receiverMail = await userDataMapper.catMail(req.body.receiver_profile_id);
                const getCat = receiverMail[0];
                console.log('getCat-------------->', getCat);
                // send human to cat mail 
                let info = await transporter.sendMail({
                    from: getHuman.email, // sender address
                    to: getCat.email, // receiver
                    subject: "message from another user!", // Subject line
                    text: req.body.content, // plain text body
                    html: req.body.content // html body
                });
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                const info1 = nodemailer.getTestMessageUrl(info);
                res.status(200).send(info1);
            } else if (req.auth.catId) {
                const senderMail = await userDataMapper.catMail(req.auth.catId);
                const getCat = senderMail[0];
                console.log('getCat---------------->', getCat);
                const receiverMail = await userDataMapper.catMail(req.body.receiver_profile_id);
                const getHuman = receiverMail[0];
                console.log('getHuman-------------->', getHuman);
                // send cat to human mail 
                let info = await transporter.sendMail({
                    from: getHuman.email, // sender address
                    to: getCat.email, // receiver
                    subject: "message from another user!", // Subject line
                    text: req.body.content, // plain text body
                    html: req.body.content // html body
                });
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                const info1 = nodemailer.getTestMessageUrl(info);
                res.status(200).send(info1);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    }
}

module.exports = sendMailController;
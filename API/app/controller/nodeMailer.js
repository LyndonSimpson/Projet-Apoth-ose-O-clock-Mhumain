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
       // if (req.auth.humanId) {
            const senderMail = await userDataMapper.humanMail(req.auth.humanId);
            const getHuman = senderMail[0];
            console.log('getHuman------------>', getHuman);
            const receiverMail = await userDataMapper.catMail(req.body.receiver_profile_id);
            const getCat = receiverMail[0];
            console.log('getCat-------------->', getCat);
            
            // send mail 
            let info = await transporter.sendMail({
                from: getHuman.email, // sender address
                to: getCat.email, // receiver
                subject: "message from another user!", // Subject line
                text: req.body.content, // plain text body
                html: req.body.content //ex :"<b>Hello world?</b>", // html body
            });

            //console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            const info1 = nodemailer.getTestMessageUrl(info);
            res.status(200).send(info1);
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou... 
        //} else if (req.auth.catId) {
            //const senderMail = await
            //const receiverMail = await
            // send mail with defined transport object
           // let info = await transporter.sendMail({
            //    from: '"Fred Foo 👻" <foo@example.com>', // sender address
            //    to: "bar@example.com, baz@example.com", // receiver
            //    subject: "Hello ✔", // Subject line
               // text: "Hello world?", // plain text body
            //    html: "<b>Hello world?</b>", // html body
          //  });

            //console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
          //  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou... 
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
          }
        }
    }


module.exports = sendMailController;
//main().catch(console.error);

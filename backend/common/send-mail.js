import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

const sendEmail = async (res, email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    console.log("send mail - source", source);

    const compiledTemplate = handlebars.compile(source);
    console.log("send mail - compiledTemplate", compiledTemplate);

    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };
    console.log("send mail - options", options);

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log("send mail - error", error);
        return error;
      } else {
        console.log("send mail - success", info);
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

export default sendEmail;

import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

const sendEmail = async (res, email, subject, payload, template) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME || "dilekcihamdi@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "wuhfswuhdcfjhzuo",
      },
    });

    // const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    // console.log("send mail - source", source);
    // const compiledTemplate = handlebars.compile(source);

    const compiledTemplate = handlebars.compile(
      `
      <html>
        <head>
          <style></style>
        </head>
        <body>
          <p>Hi {{name}},</p>
          <p>You requested to reset your password.</p>
          <p> Please, click the link below to reset your password</p>
          <a href="https://{{link}}">Reset Password</a>
        </body>
      </html>`
    );

    const html = compiledTemplate(payload);

    // console.log("send mail - compiledTemplate", compiledTemplate);

    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        // html: compiledTemplate(payload),
        html: html,
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
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

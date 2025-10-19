import Mailgen from "mailgen";
import nodemailer from 'nodemailer'

export type emailParams = {
    mailgenContent: any,
    email: string,
    subject: string
}

const sendEmail = async function (options: emailParams) {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'TaskMananger',
            link: 'https://sadanandlinkcollegetaskmanagerlink.com'
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_ID,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.NODEMAILER_ID,
            to: options.email,
            subject: options.subject,
            text: emailTextual,
            html: emailHtml
        });
    } catch (error) {
        console.log("there is an issue with sending the email via nodemailer check the credentials please!", error)
    }
}




const emailVerificationEmailMailGen = (username: string, verificationUrl: string): object => {
    return {
        body: {
            name: username,
            intro: 'Welcome to our App! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Meow, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: verificationUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
};

const forgotPasswordEmailMailGen = (username: string, passwordResetUrl: string): object => {
    return {
        body: {
            name: username,
            intro: 'We got a request to reset the password of your account!',
            action: {
                instructions: 'To reset your password, click on the following button or link',
                button: {
                    color: '#22bc66', // Optional action button color
                    text: 'Reset of Password!',
                    link: passwordResetUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
};

export default sendEmail
export { forgotPasswordEmailMailGen, emailVerificationEmailMailGen }
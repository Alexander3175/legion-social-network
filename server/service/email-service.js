import nodemailer from "nodemailer";
class EmailService{
    /*
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            post: process.env.SMTP_PORT,
            secure: false,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }
async sendActivationEmail(to, link){
     await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Activated Acc' + process.env.API_SITE,
        text: '',
        html:`
            <div>
                <h1>Hi</h1>
                <p>LOL</p>
                <a href="${link}">${link}</a>
            </div>
        `

     })
}
     */
}

export default new EmailService();
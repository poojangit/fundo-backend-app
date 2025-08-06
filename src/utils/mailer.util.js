import { transporter } from "../config/email";

export const sendMail = async(to, subject , text) => {
    console.log("From util, ...." , process.env.EMAIL_USER);
    
    try {
        const info = await transporter.sendMail({
            from : process.env.EMAIL_USER,
            to,
            subject,
            text
        })
        console.log("Email sent: ", info.response);
        return true
    } catch(error) {
        console.error("Error sending email: ", error)
        return false
    }
}
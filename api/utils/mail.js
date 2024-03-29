import nodemailer from 'nodemailer'

export const sendMail = async (reciever,subject,text) =>{

    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
         auth: {
            user: "arshagangadharan13@gmail.com",
            pass: " rfng uffd cntj agjx",
         },
    });

    const options ={
        from:"arshagangadharan13@gmail.com",
        to: reciever,
        subject : subject,
        text: text,
    }
    console.log("transporter")

    const info = await transporter.sendMail(options)
    .then((data)=>true)
    .catch((err)=>false)
    
    return info
}

export const  generatePass = (length) =>{
	let pass = '';
	let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
		'abcdefghijklmnopqrstuvwxyz0123456789@#$';

	for (let i = 1; i <= length; i++) {
		let char = Math.floor(Math.random()
			* str.length + 1);

		pass += str.charAt(char)
	}

	return pass;
}
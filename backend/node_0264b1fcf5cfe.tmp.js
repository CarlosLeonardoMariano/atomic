const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors()); // permite requisições do front-end
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// rota para enviar email
app.post('/enviar-email', async (req, res) => {
    const { nome, email, mensagem } = req.body;

    // configurar o transportador (ex: Gmail)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'carloslmariano2000@gmail.com',       // seu email
            pass: 'dlty hglr cvdp lsxq',          // senha de app do Gmail
        }
    });

    const mailOptions = {
        from: email,
        to: 'carloslmariano2000@gmail.com',            // email que vai receber
        subject: `Nova mensagem de ${nome}`,
        text: mensagem,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email enviado com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao enviar email.');
    }
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));

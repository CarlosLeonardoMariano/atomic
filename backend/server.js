const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // <- importa o .env

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/enviar-email', async (req, res) => {
    console.log('📩 Requisição recebida no backend!');
    console.log(req.body);

    const { nome, email, mensagem } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Nova mensagem de ${nome}`,
        text: mensagem,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email enviado com sucesso!');
        res.status(200).send('Email enviado com sucesso!');
    } catch (error) {
        console.error('❌ ERRO AO ENVIAR EMAIL:');
        console.error(error);
        res.status(500).json({
            message: 'Erro ao enviar email. Tente novamente.',
            error: error.message
        });
    }
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));

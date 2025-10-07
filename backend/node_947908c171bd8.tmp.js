const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*' // permite qualquer site acessar a API
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// rota para enviar email
app.post('/enviar-email', async (req, res) => {
     console.log('📩 Requisição recebida no backend!');
    console.log(req.body); // mostra os dados enviados pelo front
    const { nome, email, mensagem } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'atomicgames855@gmail.com',
            pass: 'zjyjkfypyzfhiipo'
        }
    });

    const mailOptions = {
        from: 'atomicgames855@gmail.com',
        to: 'atomicgames855@gmail.com',
        subject: `Nova mensagem de ${nome}`,
        text: mensagem,
        replyTo: email
    };

   try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado com sucesso!');
    res.status(200).send('Email enviado com sucesso!');
} catch (error) {
    console.error('❌ ERRO AO ENVIAR EMAIL TENTE NOVAMENTE:');
    console.error(error); // mostra o erro completo
    res.status(500).json({
        message: 'Erro ao enviar email tente novamente.',
        error: error.message,
        stack: error.stack
    });
}

});


app.listen(5000, () => console.log('Servidor rodando na porta 5000'));

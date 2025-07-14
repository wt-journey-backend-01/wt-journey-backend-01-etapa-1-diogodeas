const express = require('express')
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const lanches = [
    {
        "id": 1,
        "nome": "DevBurger Clássico",
        "ingredientes": "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial"
    },
    {
        "id": 2,
        "nome": "Burger de Bacon",
        "ingredientes": "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue"
    },
    {
        "id": 3,
        "nome": "Commit Veggie",
        "ingredientes": "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas"
    }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query; 

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sugestão Recebida</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <h1>Obrigado pela sua sugestão!</h1>
            <p><strong>Nome do Lanche:</strong> ${nome || ''}</p>
            <p><strong>Ingredientes:</strong> ${ingredientes || ''}</p>
            <p>Em breve entraremos em contato se sua sugestão for selecionada.</p>
            <a href="/">Voltar à Página Inicial</a>
        </body>
        </html>
    `);
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body; 


    console.log('Dados de Contato Recebidos:', { nome, email, assunto, mensagem });

    res.redirect(`/contato-recebido?nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&assunto=${encodeURIComponent(assunto)}&mensagem=${encodeURIComponent(mensagem)}`);
});

app.get('/contato-recebido', (req, res) => {
    const { nome, email, assunto, mensagem } = req.query;
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contato Recebido</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <h1>Mensagem de Contato Recebida!</h1>
            <p>Agradecemos seu contato, ${nome || 'cliente'}!</p>
            <p><strong>Email:</strong> ${email || 'Não informado'}</p>
            <p><strong>Assunto:</strong> ${assunto || 'Não informado'}</p>
            <p><strong>Mensagem:</strong> ${mensagem || 'Não informado'}</p>
            <a href="/">Voltar à Página Inicial</a>
        </body>
        </html>
    `);
});

app.get('/api/lanches', (req, res) => {
    res.json(lanches); 
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
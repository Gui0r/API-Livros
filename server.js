const express = require('express');
const server = express();
const dados = require('./data/dados.json');
const fs = require('fs');

server.use(express.json());

function salvarDados() {
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2));
}

server.listen(3000, () => {
    console.log("Servidor está funcionando!");
});

// Get
server.get('/livro', (req, res) => {
    return res.json(dados.Livro);
});

// Post
server.post('/livro', (req, res) => {
    const novoLivro = req.body;

    if (!novoLivro.id || !novoLivro.titulo || !novoLivro.autor || !novoLivro.ano_de_publicacao || !novoLivro.genero) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente." });
    } else {
        dados.Livro.push(novoLivro);
        salvarDados();
        return res.status(201).json({ mensagem: "Novo livro cadastrado!" });
    }
});

// Put
server.put('/livro/:id', (req, res) => {
    const livroId = parseInt(req.params.id);
    const atualizarLivro = req.body;

    const idLivro = dados.Livro.findIndex((livro) => livro.id === livroId);

    if (idLivro === -1) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
    } else {
        dados.Livro[idLivro].titulo = atualizarLivro.titulo || dados.Livro[idLivro].titulo;
        dados.Livro[idLivro].autor = atualizarLivro.autor || dados.Livro[idLivro].autor;
        dados.Livro[idLivro].ano_de_publicacao = atualizarLivro.ano_de_publicacao || dados.Livro[idLivro].ano_de_publicacao;
        dados.Livro[idLivro].genero = atualizarLivro.genero || dados.Livro[idLivro].genero;

        salvarDados();

        return res.json({ mensagem: "Livro atualizado com sucesso", Livro: dados.Livro[idLivro] });
    }
});

// Delete
server.delete('/livro/:id', (req, res) => {
    const livroId = parseInt(req.params.id);

    dados.Livro = dados.Livro.filter((livro) => livro.id !== livroId);

    salvarDados();

    return res.status(200).json({ mensagem: "Livro deletado com sucesso" });
});

// Consulta de livro por titulo
server.get('/livro/pesquisa/:titulo', (req, res) => {
    const pesquisaTitulo = req.params.titulo.toLowerCase();
    const livroEncontrado = dados.Livro.find(livro => livro.titulo.toLowerCase() === pesquisaTitulo);

    if (!livroEncontrado) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
    } else {
        return res.json(dados.titulo);
    }
});

const express = require('express');
const server = express();
const dados = require('./data/dados.json');
const fs = require('fs');

server.use(express.json());

function salvarDados() {
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2));
}

server.listen(3000, () => {
    console.log("Bombo!");
});



// Get
server.get('/livro', (req, res) => {
    return res.json(dados.Livro);
});

// Post
server.post('/livro', (req, res) => {
    const novoLivro = req.body;

    if (!novoLivro.id || !novoLivro.Titulo || !novoLivro.autor || !novoLivro.ano_de_publicacao || !novoLivro.genero) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente." });
    } else {
        dados.Livro.push(novoLivro);
        salvarDados();
        return res.status(201).json({ mensagem: "Novo livro cadastrado!" });
    }
});

// Put
server.put('/livro/novo', (req, res) => {
    const dadosLivro = req.body;
  
    // Verifica se o id do livro está presente no body
    if (!dadosLivro.id) {
      return res.status(400).json({
        mensagem: 'O id do livro deve ser informado no body da requisição.',
      });
    }
  
    // Cria um novo objeto livro com os dados recebidos
    const novoLivro = {
      id: dadosLivro.id,
      Titulo: dadosLivro.Titulo,
      autor: dadosLivro.autor,
      ano_de_publicação: dadosLivro.ano_de_publicação,
      gênero: dadosLivro.gênero,
    };
  
    // Adiciona o novo livro ao array de livros
    dados.Livro.push(novoLivro);
  
    // Salva os dados no arquivo json
    salvarDados();
  
    // Retorna uma resposta com o novo livro
    return res.json({
      mensagem: 'Livro inserido com sucesso',
      livro: novoLivro,
    });
  });

// Delete
server.delete('/livro/:id', (req, res) => {
    const livroId = parseInt(req.params.id);

    dados.Livro = dados.Livro.filter((Livro) => Livro.id !== livroId);

    salvarDados();

    return res.status(200).json({ mensagem: "Livro deletado com sucesso" });
});

// Consulta de livro por titulo
server.get('/livro/pesquisa/:titulo', (req, res) => {
    const pesquisaTitulo = req.params.titulo.toLowerCase();
    let livroEncontrado = null;

    for (const livro of dados.Livro) {
        if (livro && livro.titulo && livro.titulo.toLowerCase() === pesquisaTitulo) {
            livroEncontrado = livro;
            break;
        }
    }

    if (!livroEncontrado) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
    } else {
        return res.json(livroEncontrado);
    }
});



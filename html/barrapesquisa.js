function pesquisarLivro() {
    // Obtém o valor da barra de pesquisa
    const termoPesquisa = document.getElementById('barraPesquisa').value.toLowerCase();

    // Recupera os dados de livros do localStorage
    const livros = JSON.parse(localStorage.getItem('dados.json')) || [];

    // Verifica se o termo de pesquisa corresponde a algum livro
    const livroEncontrado = livros.find(livro => livro.titulo.toLowerCase().includes(termoPesquisa));

    if (livroEncontrado) {
        document.getElementById('resultado').innerHTML = `Livro encontrado: ${livroEncontrado.Titulo}`;
    } else {
        document.getElementById('resultado').innerHTML = 'Livro não encontrado';
    }
}

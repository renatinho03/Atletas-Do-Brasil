
const resultadosPesquisa = document.getElementById('resultados-pesquisa');
const campoPesquisa = document.getElementById('campo-pesquisa');

campoPesquisa.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    pesquisar();
  }
});

campoPesquisa.addEventListener('input', () => {
  pesquisar();
});

function pesquisar() {  
  const resultadosFiltrados = dados.filter(item => {
    const termoMinusculo = campoPesquisa.value.toLowerCase();

    return item.titulo.toLowerCase().includes(termoMinusculo) ||
           item.descricao.toLowerCase().includes(termoMinusculo) ||
           item.categoria.toLowerCase().includes(termoMinusculo);
  });  
  
  resultadosPesquisa.innerHTML = "";

  resultadosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));

  exibirItens(resultadosFiltrados);
}

function exibirItens(itens) {
  itens.forEach(item => {
    const itemResultado = document.createElement('div');
  
    itemResultado.innerHTML = `
      <div class="item-resultado">
        <img src="img/${item.foto}" class="foto" alt="Foto de ${item.titulo}" />
        <div class="info">
          <div class="info-meta">
            <div class="info-meta-titulo">
              <h2>
                ${item.titulo}
              </h2>
              <h3>${item.categoria}</h3>
            </div>
            <button class="button-curtir" title="curtir">
              <h4>${item.curtidas}</h4>
              <i class="fa-solid fa-thumbs-up icon-button"></i>
            </button>
          </div>
          <p class="descricao-meta">${item.descricao}</p>
          <div class="links">
            <a href="${item.link}" target="_blank">
              <i class="fa-solid fa-book icon-link"></i>
            </a>` +
            (item.facebook ? `<a href="${item.facebook}" target="_blank">
              <i class="fa-brands fa-facebook icon-link"></i>
            </a>` : '') +
            `<a href="${item.instagram}" target="_blank">
              <i class="fa-brands fa-instagram icon-link"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  
    resultadosPesquisa.appendChild(itemResultado);
  });

  const botoesCurtir = document.querySelectorAll('.button-curtir');

  botoesCurtir.forEach(botao => {
    botao.addEventListener('click', () => {
      const nomeAtleta = botao.parentElement.querySelector('h2').textContent.trim();
  
      console.log(`Você curtiu o perfil de: ${nomeAtleta}`);

      dados.forEach(item => {
        if (item.titulo === nomeAtleta) {
          item.curtidas++;
        }
      });

      pesquisar()
    });
  });
}

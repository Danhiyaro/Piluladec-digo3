const campoProduto = document.querySelector('#campoProduto');
const btnAdicionar = document.querySelector('#btnAdicionar');
const listaElementos = document.querySelector('#listaElementos');
const resumoCarrinho = document.querySelector('#resumoCarrinho');
const btnLimpar = document.querySelector('#btnLimpar');

function carregarLista(){

    listaElementos.innerHTML = '';

    const dados = localStorage.getItem('listaCompras');

    if (dados == null || dados == '') {
        resumoCarrinho.innerHTML = 'Lista vazia';
        return;
    }

    const itens = dados.split('|');

    let concluidos = 0;

    for (let i = 0; i < itens.length; i++) {

        const produto = itens[i].split(':');

        const nome = produto[0];
        const status = produto[1];

        let marcado = '';
        let classe = '';

        if (status == '1') {
            marcado = 'checked';
            classe = 'comprado';
            concluidos++;
        }

        listaElementos.innerHTML += `
            <li>
                <input type="checkbox" class="checkProduto" ${marcado}>
                <span class="${classe}">${nome}</span>
                <button class="btnExcluir">Excluir</button>
            </li>
        `;
    }

    const porcentagem = (concluidos / itens.length) * 100;

    resumoCarrinho.innerHTML =
        `${concluidos} de ${itens.length} itens concluídos - ${porcentagem.toFixed(0)}%`;

    const checkProdutos = document.querySelectorAll('.checkProduto');

    for (let i = 0; i < checkProdutos.length; i++) {

        checkProdutos[i].addEventListener('change', function(){

            const dadosAtualizados = localStorage.getItem('listaCompras');
            const itensAtualizados = dadosAtualizados.split('|');

            const produto = itensAtualizados[i].split(':');

            itensAtualizados.splice(i, 1);

            if (this.checked) {

                produto[1] = '1';

                itensAtualizados.push(
                    produto[0] + ':' + produto[1]
                );

            } else {

                produto[1] = '0';

                itensAtualizados.unshift(
                    produto[0] + ':' + produto[1]
                );
            }

            localStorage.setItem(
                'listaCompras',
                itensAtualizados.join('|')
            );

            carregarLista();
        });
    }

    const botoesExcluir = document.querySelectorAll('.btnExcluir');

    for (let i = 0; i < botoesExcluir.length; i++) {

        botoesExcluir[i].addEventListener('click', function(){

            const dadosAtualizados = localStorage.getItem('listaCompras');
            const itensAtualizados = dadosAtualizados.split('|');

            itensAtualizados.splice(i, 1);

            localStorage.setItem(
                'listaCompras',
                itensAtualizados.join('|')
            );

            carregarLista();
        });
    }
}

btnAdicionar.addEventListener('click', function(){

    const nomeProduto = campoProduto.value;

    if (nomeProduto == '') {
        return;
    }

    let dados = localStorage.getItem('listaCompras');

    if (dados == null || dados == '') {

        dados = nomeProduto + ':0';

    } else {

        dados += '|' + nomeProduto + ':0';
    }

    localStorage.setItem('listaCompras', dados);

    campoProduto.value = '';

    carregarLista();
});

btnLimpar.addEventListener('click', function(){

    localStorage.removeItem('listaCompras');

    carregarLista();
});

carregarLista();
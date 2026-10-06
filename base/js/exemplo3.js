const textoPost = document.querySelector('#textoPost');
const barraProgresso = document.querySelector('#barraProgresso');
const infoCarateres= document.querySelector('#infoCarateres');
const infoPalavras = document.querySelector('#infoPalavras');
const btnPublicar = document.querySelector('#btnPublicar');
const feedPreview = document.querySelector('#feedPreview');

const LIMITE = 140;

textoPost.addEventListener('input', ()=>{
     const conteudo = textoPost.value;
     const totalC = conteudo.length;
     const palavras = conteudo.split(' ');
     const totalP = palavras.length;

     infoCarateres.innerHTML = `${totalC} / ${LIMITE} caracteres`;
     infoPalavras.innerHTML = `${totalP} palavras`;
     const porcentagem = (totalC / LIMITE) * 100;

barraProgresso.style.width = `${porcentagem}%`
     if (totalC > LIMITE){
        barraProgresso.style.backgroundColor = '#ff0000';
        infoCarateres.style.color = '#ff0000';
        btnPublicar.disabled = true;
     } else if (totalC > 100){
        barraProgresso.style.backgroundColor = '#fad104';
        infoCarateres.style.color = '#fad104';
        btnPublicar.disabled = false;
     } else{
        barraProgresso.style.backgroundColor = '#0cfb1c';
        infoCarateres.style.color = '#0cfb1c';
        btnPublicar.disabled = false;
     }
});

btnPublicar.addEventListener('click', () =>{
    feedPreview.style.display = 'block';
    feedPreview.innerHTML = textoPost.value;
});
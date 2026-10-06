const visorSenha = document.querySelector('#visorSenha');
const compSenha = document.querySelector('#compSenha');
const chkMaiusculas = document.querySelector('#chkMaiusculas');
const chkNumeros = document.querySelector('#chkNumeros');
const chkSimbolos = document.querySelector('#chkSimbolos');
const btnGerar = document.querySelector('#btnGerar');
const indicadorForca = document.querySelector('#indicadorForca');

const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numeros = '0123456789';
const simbolos = '!@#$%*&+<>?';

btnGerar.addEventListener('click', function(){
    let permitidos = letrasMinusculas;
    let variedades = 1;
    if (chkMaiusculas.checked){
        permitidos += letrasMaiusculas;
        variedades++;
    }
    if(chkNumeros.checked){
        permitidos += numeros;
        variedades++;
    }
    if(chkSimbolos.checked){
        permitidos += simbolos;
        variedades++;
    }
    let tamanho = Number(compSenha.value);
    let senhaFinal = '';
    for (let i = 0; i < tamanho; i++){
        let indice = Math.round(Math.random()*permitidos.length);
        senhaFinal += permitidos[indice];
    }
    visorSenha.innerHTML = senhaFinal;
    if (tamanho >= 12 && variedades >= 3){
        indicadorForca.innerHTML = 'Senha forte';
        indicadorForca.style.color = '#16a34a';
    } else if(tamanho >= 8 && variedades == 2){
        indicadorForca.innerHTML = 'Senha média';
        indicadorForca.style.color = '#ca8a04';
    } else{
        indicadorForca.innerHTML = 'Senha fraca';
        indicadorForca.style.color = '#dc2626';
    }
});
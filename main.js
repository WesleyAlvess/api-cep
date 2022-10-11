'use strict';

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('estado').value = endereco.uf;
}
const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('estado').value = '';
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);


const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.querySelector('#cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if(cepValido(cep)) {
        // Outra forma de fazer
        // fetch(url).then(Response => Response.json).then(console.log)
    
        // Por Atribuição
        // Pegando todos os dados da promessa e armazenando em variavel
        // Aqui ele está mandando pro FETCH 
        const dados = await fetch(url)
        // Depois pego esses dados e aplico o json, e ele filtra somente as informações que eu quero
        const endereco = await dados.json()
        // Aplica no metódo que eu quiser

        if(endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = "Endereço inexistente: CEP invalido!";
        } else{
            preencherFormulario(endereco);
        }

    } else{
        document.getElementById('endereco').value = "CEP incorreto! ";
    }
}

document.querySelector('#cep').addEventListener('focusout', pesquisarCep);
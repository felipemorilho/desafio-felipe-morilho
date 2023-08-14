class CaixaDaLanchonete {
    // Construtor da classe, sendo a propridade o cardápio da lanchonete
    constructor() {
        this.cardapio = {
        cafe: 3.00,
        chantily: 1.50,
        suco: 6.20,
        sanduiche: 6.50,
        queijo: 2.00,
        salgado: 7.25,
        combo1: 9.50,
        combo2: 7.50
    }
    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        //Checagem para o carrinho vazio
        if (itens.length == 0) return "Não há itens no carrinho de compra!";

        //Conferindo a validade do método de pagamento
        if (!(metodoDePagamento === 'debito' || metodoDePagamento === 'credito' || metodoDePagamento === 'dinheiro')) {
            return "Forma de pagamento inválida!";
        }

        //inicializando a variável com o valor da conta total
        let valorTotal = 0;

        /*Separando os elementos de itens com uma virgula e colocando em uma nova variável
        que irá conter os elementos da posição 0 de itens. Isso facilita na hora da checagem
        dos itens principais com os extras.*/
        const codigoItem = itens.map(item => item.split(',')[0]);

        for (let item of itens){
            //Atribuindo os valores de item para código e quantidade, para usar posteriormente nas verificações.
            const dividirItem = item.split(',');
            const codigo = dividirItem[0];
            const quantidade = dividirItem[1];
           
            //Transformando a quantidade de string para inteiro
            const qtd = parseInt(quantidade, 10);

            //Checagem para os itens extras
            if (codigo === 'chantily' && !codigoItem.includes('cafe')) return "Item extra não pode ser pedido sem o principal";

            if (codigo === 'queijo' && !codigoItem.includes('sanduiche')) return "Item extra não pode ser pedido sem o principal";

            //Checagem para a quantidade dos itens do carrinho
            if (qtd <= 0) return "Quantidade inválida!";

            //Checagem para o codigo do itens
            if (!this.cardapio[codigo]) return "Item inválido!";

            valorTotal += this.cardapio[codigo] * qtd;
        }


        //Checagem para os descontos e taxas do método de pagamento
       if (metodoDePagamento === "dinheiro") { valorTotal *= 0.95; }
    
       if (metodoDePagamento === "credito") { valorTotal *= 1.03; }
                        
       //Retornando o valor total, com duas casas decimais e trocando o ponto pela vírgula
    return `R$ ${valorTotal.toFixed(2).replace('.',',')}`;
    }

   
}

export { CaixaDaLanchonete };

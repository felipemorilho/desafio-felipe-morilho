class CaixaDaLanchonete {
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

        if (itens.length == 0) return "Não há itens no carrinho de compra!";

        if (!(metodoDePagamento === 'debito' || metodoDePagamento === 'credito' || metodoDePagamento === 'dinheiro')) {
            return "Forma de pagamento inválida!";
        }

        let valorTotal = 0;

        const codigoItem = itens.map(item => item.split(',')[0]);

        for (let item of itens){
            const dividirItem = item.split(',');
            const codigo = dividirItem[0];
            const quantidade = dividirItem[1];
           
            const qtd = parseInt(quantidade, 10);

            if (codigo === 'chantily' && !codigoItem.includes('cafe')) return "Item extra não pode ser pedido sem o principal";

            if (codigo === 'queijo' && !codigoItem.includes('sanduiche')) return "Item extra não pode ser pedido sem o principal";

            if (qtd <= 0) return "Quantidade inválida!";

            if (!this.cardapio[codigo]) return "Item inválido!";

            valorTotal += this.cardapio[codigo] * qtd;
        }


       if (metodoDePagamento === "dinheiro") { valorTotal *= 0.95; }
    
       if (metodoDePagamento === "credito") { valorTotal *= 1.03; }
                        
    return `R$ ${valorTotal.toFixed(2).replace('.',',')}`;
    }

   
}

export { CaixaDaLanchonete };

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

let totalAmount = 0;

function ready() {
    // Início Função retirar itens do carrinho
    const removeProductBtn = document.getElementsByClassName("remove-product-btn");
    for (let i = 0; i < removeProductBtn.length; i++) {
        removeProductBtn[i].addEventListener("click", removeProduct);
    }
    
    // Início modificar quantidade de itens do carrinho
    const quantityInputs = document.getElementsByClassName("product-qtd-input");
    for (let i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", checkIfInputIsNull);
    }
    
    // Adicionar itens ao carrinho
    const addToCartBtn = document.getElementsByClassName("button-hover-background");
    for (let i = 0; i < addToCartBtn.length; i++) {
        addToCartBtn[i].addEventListener("click", addProductToCart);
    }
    
    const purchaseBtn = document.getElementsByClassName("purchase-button")[0];
    purchaseBtn.addEventListener("click", makePurchase);
}

function checkIfInputIsNull(event) {
    const quantityInput = event.target;
    
    if (quantityInput.value < 0) {
        alert("Quantidade não pode ser negativa!");
        quantityInput.value = 0; // Reseta para 0
    }

    if (quantityInput.value == 0) {
        // Remove o produto se a quantidade for 0
        quantityInput.parentElement.parentElement.parentElement.remove();
    }

    updateTotal();
}

function addProductToCart(event) {
    const button = event.target;
    const productInfos = button.parentElement.parentElement;
    const productImage = productInfos.getElementsByClassName("product-image")[0].src;
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText;
    const productPrice = parseFloat(productInfos.getElementsByClassName("product-price")[0].innerText.replace("R$", "").replace(",", ".").trim());

    const productCarName = document.getElementsByClassName("cart-product-title");
    for (let i = 0; i < productCarName.length; i++) {
        if (productCarName[i].innerText === productTitle) {
            const quantityInput = productCarName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0];
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateTotal();
            return;
        }
    }

    let newCartProduct = document.createElement("tr");
    newCartProduct.classList.add("cart-product");

    newCartProduct.innerHTML = `
    <td>
        <div class="product-identificator">
            <img src="${productImage}" alt="${productTitle}" class="product-image">
            <strong class="cart-product-title">${productTitle}</strong>
        </div>
    </td>
    <td>
        <div class="product-prices"><span class="cart-product-price">R$ ${productPrice.toFixed(2).replace(".", ",")}</span></div>
    </td>
    <td>
        <div class="product-quantities">
            <input type="number" value="1" min="0" class="product-qtd-input">
            <button type="button" class="remove-product-btn">Remover</button>
        </div>
    </td>
    `;

    const tableBody = document.querySelector(".cart-table tbody");
    tableBody.append(newCartProduct);

    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull);
    newCartProduct.getElementsByClassName("remove-product-btn")[0].addEventListener("click", removeProduct);
    
    updateTotal();
}

function removeProduct(event) {
    const productRow = event.target.closest("tr"); // Encontra a linha do produto
    if (productRow) {
        productRow.remove(); // Remove a linha inteira
    }
    updateTotal(); // Atualiza o total após a remoção
}


function updateTotal() {
    totalAmount = 0;

    const cartProducts = document.getElementsByClassName("cart-product");
    for (let i = 0; i < cartProducts.length; i++) {
        const productPrice = parseFloat(cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".").trim());
        const productQuantity = parseInt(cartProducts[i].getElementsByClassName("product-qtd-input")[0].value);
        totalAmount += productPrice * productQuantity;
    }

    document.querySelector(".cart-total-container span").innerText = "R$ " + totalAmount.toFixed(2).replace(".", ",");
}

function makePurchase() {
    if (totalAmount === 0) {
        alert("Seu carrinho está vazio!");
    } else {
        alert(
            `
            Obrigado pela sua compra! :)
            Valor do Pedido: R$ ${totalAmount.toFixed(2).replace(".", ",")}
            Volte Sempre!! :D
            `
        );
        document.querySelector(".cart-table tbody").innerHTML = "";
        totalAmount = 0; // Reseta o total após a compra
        updateTotal();
    }
}

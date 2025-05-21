// carousel.js
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const nextBtn = document.querySelector('.carousel-btn.right');
    const prevBtn = document.querySelector('.carousel-btn.left');

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });
});


let cart = [];

function atualizarBadge() {
    document.querySelector('.badge').textContent = cart.length;
}

function abrirCarrinho() {
    document.getElementById('cart-sidebar').style.right = '0';
    renderizarCarrinho();
}

function fecharCarrinho() {
    document.getElementById('cart-sidebar').style.right = '-300px';
}



function adicionarAoCarrinho(nome, preco) {
    const existente = cart.find(item => item.nome === nome);
    if (existente) {
        existente.qtd++;
    } else {
        cart.push({ nome, preco: parseFloat(preco), qtd: 1 });
    }
    atualizarBadge();
    renderizarCarrinho();
}

function removerDoCarrinho(index) {
    cart.splice(index, 1);
    renderizarCarrinho();
    atualizarBadge();
}

function renderizarCarrinho() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        total += item.preco * item.qtd;

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item d-flex justify-content-between align-items-center mb-2">
                <span>${item.nome}</span>
                <div class="quantity-controls d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="alterarQuantidade(${index}, -1)">−</button>
                    <span>${item.qtd}</span>
                    <button class="btn btn-sm btn-outline-secondary ms-2" onclick="alterarQuantidade(${index}, 1)">+</button>
                </div>
                <span>R$${(item.preco * item.qtd).toFixed(2)}</span>
                <button class="btn btn-sm btn-danger ms-2" onclick="removerDoCarrinho(${index})">🗑</button>
            </div>
        `;
        cartList.appendChild(li);
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function alterarQuantidade(index, delta) {
    cart[index].qtd += delta;
    if (cart[index].qtd <= 0) {
        cart.splice(index, 1);
    }
    renderizarCarrinho();
    atualizarBadge();
}


// Vincular aos botões
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const nome = this.dataset.name;
        const preco = this.dataset.price;
        adicionarAoCarrinho(nome, preco);
    });
});

import { atualizarStatus, filtrarPedidos } from './pedidos.mjs';

const pedidosIniciais = [
  { numero: 9520, plataforma: 'Keeta', itens: '2 itens', valor: 'R$ 35,39', horario: '20:45', status: 'novo' },
  { numero: 7295, plataforma: 'Keeta', itens: '2 itens', valor: 'R$ 34,99', horario: '20:31', status: 'pronto' },
  { numero: 135008, plataforma: '99Food', itens: '3 itens', valor: 'R$ 42,95', horario: '20:47', status: 'novo' },
  { numero: 135007, plataforma: '99Food', itens: '2 itens', valor: 'R$ 36,04', horario: '20:32', status: 'em produção' },
  { numero: 3401, plataforma: 'iFood', itens: '1 item', valor: 'R$ 24,90', horario: '20:28', status: 'novo' },
  { numero: 3400, plataforma: 'iFood', itens: '2 itens', valor: 'R$ 39,80', horario: '20:16', status: 'entregue' },
];

let pedidos = [...pedidosIniciais];
const lista = document.querySelector('#pedidos');
const mensagem = document.querySelector('#mensagem');

function proximoStatus(status) {
  const fluxo = ['novo', 'em produção', 'pronto', 'entregue'];
  return fluxo[Math.min(fluxo.indexOf(status) + 1, fluxo.length - 1)];
}

function renderizar(plataforma = 'Todos') {
  const filtrados = filtrarPedidos(pedidos, plataforma);
  lista.innerHTML = filtrados.map((pedido) => `
    <article data-plataforma="${pedido.plataforma}">
      <div class="topo-pedido"><strong>Pedido #${pedido.numero}</strong><span class="plataforma">${pedido.plataforma}</span></div>
      <p>${pedido.itens} · <span class="valor">${pedido.valor}</span></p>
      <p>Recebido às ${pedido.horario}</p>
      <p class="status">Status: ${pedido.status}</p>
      <button type="button" data-avancar="${pedido.numero}" ${pedido.status === 'entregue' ? 'disabled' : ''}>Avançar status</button>
    </article>`).join('');
  mensagem.textContent = plataforma === 'Todos' ? 'Exibindo todos os pedidos.' : `Filtro ${plataforma}: ${filtrados.length} pedidos encontrados.`;
}

document.querySelectorAll('.filtro').forEach((botao) => botao.addEventListener('click', () => {
  document.querySelectorAll('.filtro').forEach((item) => item.classList.remove('ativo'));
  botao.classList.add('ativo');
  renderizar(botao.dataset.plataforma);
}));

lista.addEventListener('click', (evento) => {
  const numero = Number(evento.target.dataset.avancar);
  if (!numero) return;
  pedidos = pedidos.map((pedido) => pedido.numero === numero ? atualizarStatus(pedido, proximoStatus(pedido.status)) : pedido);
  renderizar(document.querySelector('.filtro.ativo').dataset.plataforma);
  mensagem.textContent = `Pedido #${numero} atualizado com sucesso.`;
});

document.querySelector('#fonte').addEventListener('click', (evento) => {
  const ativo = document.body.classList.toggle('fonte-grande');
  evento.currentTarget.setAttribute('aria-pressed', String(ativo));
});
document.querySelector('#contraste').addEventListener('click', (evento) => {
  const ativo = document.body.classList.toggle('alto-contraste');
  evento.currentTarget.setAttribute('aria-pressed', String(ativo));
});

const params = new URLSearchParams(location.search);
if (params.get('contraste') === 'alto') document.body.classList.add('alto-contraste');
if (params.get('fonte') === 'grande') document.body.classList.add('fonte-grande');
const plataformaInicial = params.get('plataforma') || 'Todos';
document.querySelectorAll('.filtro').forEach((botao) => botao.classList.toggle('ativo', botao.dataset.plataforma === plataformaInicial));
renderizar(plataformaInicial);

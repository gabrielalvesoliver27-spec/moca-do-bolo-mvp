export const statusPermitidos = ['novo', 'em produção', 'pronto', 'entregue'];

export function filtrarPedidos(pedidos, plataforma = 'Todos') {
  if (plataforma === 'Todos') return [...pedidos];
  return pedidos.filter((pedido) => pedido.plataforma === plataforma);
}

export function atualizarStatus(pedido, novoStatus) {
  if (!statusPermitidos.includes(novoStatus)) {
    throw new Error('Status de pedido inválido');
  }

  return { ...pedido, status: novoStatus };
}

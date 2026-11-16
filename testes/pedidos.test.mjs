import assert from 'node:assert/strict';
import test from 'node:test';

import { atualizarStatus, filtrarPedidos, statusPermitidos } from '../prototipo/pedidos.mjs';

const pedidos = [
  { numero: 9520, plataforma: 'Keeta', status: 'novo' },
  { numero: 135008, plataforma: '99Food', status: 'pronto' },
  { numero: 3401, plataforma: 'iFood', status: 'entregue' },
];

test('retorna todos os pedidos quando o filtro é Todos', () => {
  assert.deepEqual(filtrarPedidos(pedidos), pedidos);
  assert.notEqual(filtrarPedidos(pedidos), pedidos);
});

test('filtra pedidos pela plataforma selecionada', () => {
  assert.deepEqual(filtrarPedidos(pedidos, 'Keeta'), [pedidos[0]]);
  assert.deepEqual(filtrarPedidos(pedidos, 'iFood'), [pedidos[2]]);
});

test('atualiza o status sem alterar o pedido original', () => {
  const atualizado = atualizarStatus(pedidos[0], 'em produção');
  assert.equal(atualizado.status, 'em produção');
  assert.equal(pedidos[0].status, 'novo');
});

test('rejeita um status que não existe no fluxo', () => {
  assert.throws(() => atualizarStatus(pedidos[0], 'cancelamento desconhecido'), /inválido/);
});

test('mantém os quatro estados previstos para o fluxo', () => {
  assert.deepEqual(statusPermitidos, ['novo', 'em produção', 'pronto', 'entregue']);
});

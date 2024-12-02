import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function SalesPage() {
  const { products, sales, addSale, updateStock } = useStore();
  const [selectedProducts, setSelectedProducts] = useState<{
    productId: string;
    quantity: number;
    priceAtSale: number;
  }[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Dinheiro' | 'Cartão' | 'Pix'>('Dinheiro');

  const handleAddProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.quantity > 0) {
      setSelectedProducts([
        ...selectedProducts,
        {
          productId,
          quantity: 1,
          priceAtSale: product.price,
        },
      ]);
    }
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[index].quantity = quantity;
    setSelectedProducts(newSelectedProducts);
  };

  const handleRemoveProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const total = selectedProducts.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId);
    return acc + (product?.price || 0) * item.quantity;
  }, 0);

  const handleFinalizeSale = () => {
    const sale = {
      id: Date.now().toString(),
      products: selectedProducts,
      total,
      date: new Date().toISOString(),
      paymentMethod,
      customerName: customerName || undefined,
    };

    addSale(sale);
    selectedProducts.forEach((item) => {
      updateStock(item.productId, item.quantity);
    });

    setSelectedProducts([]);
    setCustomerName('');
    setPaymentMethod('Dinheiro');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Vendas</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Nova Venda</h3>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Adicionar Produto
                </label>
                <select
                  onChange={(e) => handleAddProduct(e.target.value)}
                  value=""
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md" <boltAction type="file" filePath="src/pages/SalesPage.tsx">                >
                  <option value="">Selecione um produto...</option>
                  {products
                    .filter((p) => p.quantity > 0)
                    .map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {product.size} - R$ {product.price.toFixed(2)}
                      </option>
                    ))}
                </select>
              </div>

              {selectedProducts.length > 0 && (
                <div className="space-y-4">
                  {selectedProducts.map((item, index) => {
                    const product = products.find((p) => p.id === item.productId);
                    return (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {product?.name} - {product?.size}
                          </p>
                          <p className="text-sm text-gray-500">
                            R$ {product?.price.toFixed(2)}
                          </p>
                        </div>
                        <input
                          type="number"
                          min="1"
                          max={product?.quantity}
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(index, parseInt(e.target.value, 10))
                          }
                          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                        />
                        <button
                          onClick={() => handleRemoveProduct(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remover
                        </button>
                      </div>
                    );
                  })}

                  <div className="border-t border-gray-200 pt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nome do Cliente (opcional)
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Forma de Pagamento
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value as 'Dinheiro' | 'Cartão' | 'Pix')
                        }
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                      >
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Cartão">Cartão</option>
                        <option value="Pix">Pix</option>
                      </select>
                    </div>

                    <div className="mt-4">
                      <p className="text-lg font-medium text-gray-900">
                        Total: R$ {total.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={handleFinalizeSale}
                      className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Finalizar Venda
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Histórico de Vendas
            </h3>
            <div className="mt-6">
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Data
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cliente
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Pagamento
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sales.map((sale) => (
                            <tr key={sale.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {format(new Date(sale.date), "dd/MM/yyyy 'às' HH:mm", {
                                  locale: ptBR,
                                })}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {sale.customerName || 'Cliente não identificado'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                R$ {sale.total.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {sale.paymentMethod}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { HomeIcon, ShoppingBagIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-purple-600">Bazar Feminino</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-purple-600"
                >
                  <HomeIcon className="h-5 w-5 mr-1" />
                  Início
                </Link>
                <Link
                  to="/estoque"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-purple-600"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-1" />
                  Estoque
                </Link>
                <Link
                  to="/vendas"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-purple-600"
                >
                  <ChartBarIcon className="h-5 w-5 mr-1" />
                  Vendas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
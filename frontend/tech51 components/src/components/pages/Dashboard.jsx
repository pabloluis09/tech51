import { useState } from "react";
import { Users, Package, ShoppingCart, UserPlus } from "lucide-react";
import UserManagement from "../admin/UserManagement";
import ProductManagement from "../admin/ProductManagement";
import OrdersManagement from "../admin/OrdersManagement";
import SubscriptionManagement from "../admin/SubscriptionManagement";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

      <div className="flex mb-6">
        <button
          className={`mr-4 flex items-center ${activeTab === "users" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("users")}
        >
          <Users className="mr-2" />
          Usuarios
        </button>
        <button
          className={`mr-4 flex items-center ${activeTab === "products" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("products")}
        >
          <Package className="mr-2" />
          Productos
        </button>
        <button
          className={`mr-4 flex items-center ${activeTab === "orders" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("orders")}
        >
          <ShoppingCart className="mr-2" />
          Órdenes
        </button>
        <button
          className={`flex items-center ${activeTab === "subscriptions" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("subscriptions")}
        >
          <UserPlus className="mr-2" />
          Suscripciones
        </button>
      </div>

      {activeTab === "users" && <UserManagement />}
      {activeTab === "products" && <ProductManagement />}
      {activeTab === "orders" && <OrdersManagement />}
      {activeTab === "subscriptions" && <SubscriptionManagement />}
    </div>
  );
};

export default Dashboard;

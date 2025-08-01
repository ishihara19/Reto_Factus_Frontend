import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  Activity,
  DollarSign,
  ShoppingCart,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  ArrowUp,
  ArrowDown,
  Eye,
  MessageCircle,
  Bell,
  Download
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // Datos simulados para las métricas
  const stats = [
    {
      title: 'Total Usuarios',
      value: '2,543',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      description: 'vs mes anterior'
    },
    {
      title: 'Usuarios Activos',
      value: '1,892',
      change: '+8%',
      trend: 'up',
      icon: Activity,
      color: 'green',
      description: 'últimos 30 días'
    },
    {
      title: 'Nuevos Registros',
      value: '156',
      change: '-3%',
      trend: 'down',
      icon: UserPlus,
      color: 'purple',
      description: 'esta semana'
    },
    {
      title: 'Tasa de Conversión',
      value: '3.24%',
      change: '+2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'orange',
      description: 'promedio mensual'
    }
  ];

  // Datos para actividad reciente
  const recentActivity = [
    {
      id: 1,
      type: 'user_register',
      message: 'Nuevo usuario registrado: Ana López',
      time: 'Hace 5 minutos',
      icon: UserPlus,
      color: 'green'
    },
    {
      id: 2,
      type: 'login',
      message: 'Juan Carlos González inició sesión',
      time: 'Hace 12 minutos',
      icon: Activity,
      color: 'blue'
    },
    {
      id: 3,
      type: 'alert',
      message: 'Intento de acceso fallido detectado',
      time: 'Hace 25 minutos',
      icon: AlertCircle,
      color: 'red'
    },
    {
      id: 4,
      type: 'update',
      message: 'María Rodríguez actualizó su perfil',
      time: 'Hace 1 hora',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 5,
      type: 'system',
      message: 'Backup automático completado',
      time: 'Hace 2 horas',
      icon: Clock,
      color: 'blue'
    }
  ];

  // Datos para usuarios por departamento
  const departmentData = [
    { name: 'Tecnología', users: 45, percentage: 35, color: 'bg-blue-500' },
    { name: 'Marketing', users: 32, percentage: 25, color: 'bg-green-500' },
    { name: 'Ventas', users: 28, percentage: 22, color: 'bg-purple-500' },
    { name: 'RRHH', users: 15, percentage: 12, color: 'bg-orange-500' },
    { name: 'Finanzas', users: 8, percentage: 6, color: 'bg-red-500' }
  ];

  // Datos para gráfico de usuarios en el tiempo
  const userGrowthData = [
    { month: 'Ene', users: 1200 },
    { month: 'Feb', users: 1350 },
    { month: 'Mar', users: 1580 },
    { month: 'Abr', users: 1720 },
    { month: 'May', users: 1950 },
    { month: 'Jun', users: 2100 },
    { month: 'Jul', users: 2543 }
  ];

  // Tareas pendientes
  const pendingTasks = [
    { id: 1, task: 'Revisar reportes mensuales', priority: 'high', dueDate: 'Hoy' },
    { id: 2, task: 'Actualizar políticas de seguridad', priority: 'medium', dueDate: 'Mañana' },
    { id: 3, task: 'Responder comentarios usuarios', priority: 'low', dueDate: '3 días' },
    { id: 4, task: 'Configurar backup semanal', priority: 'medium', dueDate: '5 días' }
  ];

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header con saludo y acciones rápidas */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            ¡Buen día, Administrador! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Aquí tienes un resumen de la actividad de tu sistema
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
          </select>
          
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={18} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getStatColor(stat.color)} bg-opacity-10`}>
                  <stat.icon size={24} className={`text-${stat.color}-600`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )}
                  <span>{stat.change}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid principal con gráficos y actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crecimiento de usuarios */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Crecimiento de Usuarios</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <BarChart3 size={16} />
              <span>Mensual</span>
            </div>
          </div>
          
          {/* Gráfico simple simulado */}
          <div className="space-y-4">
            {userGrowthData.map((data, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 w-8">{data.month}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(data.users / 2543) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-16">{data.users.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Ver todo
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-1.5 rounded-full ${
                  activity.color === 'green' ? 'bg-green-100' :
                  activity.color === 'blue' ? 'bg-blue-100' :
                  activity.color === 'red' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <activity.icon size={14} className={`${
                    activity.color === 'green' ? 'text-green-600' :
                    activity.color === 'blue' ? 'text-blue-600' :
                    activity.color === 'red' ? 'text-red-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Segunda fila de información */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución por departamentos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Usuarios por Departamento</h3>
            <PieChart size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                  <span className="text-sm text-gray-700">{dept.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{dept.users}</span>
                  <span className="text-xs text-gray-500">({dept.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tareas pendientes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Tareas Pendientes</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Ver todas
            </button>
          </div>
          
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{task.task}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                    <span className="text-xs text-gray-500">{task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
            <UserPlus size={24} className="text-gray-400 group-hover:text-blue-600 mb-2" />
            <span className="text-sm text-gray-600 group-hover:text-blue-600">Nuevo Usuario</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
            <BarChart3 size={24} className="text-gray-400 group-hover:text-green-600 mb-2" />
            <span className="text-sm text-gray-600 group-hover:text-green-600">Ver Reportes</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
            <Bell size={24} className="text-gray-400 group-hover:text-purple-600 mb-2" />
            <span className="text-sm text-gray-600 group-hover:text-purple-600">Notificaciones</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group">
            <MessageCircle size={24} className="text-gray-400 group-hover:text-orange-600 mb-2" />
            <span className="text-sm text-gray-600 group-hover:text-orange-600">Mensajes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
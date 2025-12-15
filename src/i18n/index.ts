import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const translations = {
  en: {
    "tasks": {
      "title": "Tasks",
      "addTask": "Add Task",
      "editTask": "Edit Task",
      "deleteTask": "Delete Task",
      "markComplete": "Mark Complete",
      "markIncomplete": "Mark Incomplete",
      "noTasks": "No tasks found",
      "completed": "Completed",
      "pending": "Pending",
      "taskTitle": "Task Title",
      "taskDescription": "Task Description",
      "description": "Description",
      "created": "Created",
      "lastUpdated": "Last Updated",
      "taskId": "Task ID",
      "deleteConfirm": "Are you sure you want to delete this task?",
      "updateSuccess": "Task updated successfully",
      "updateError": "Failed to update task",
      "deleteError": "Failed to delete task",
      "addError": "Failed to add task",
      "statusUpdateError": "Failed to update task status",
      "taskNotFound": "Task not found",
      "searchPlaceholder": "Search tasks..."
    },
    "common": {
      "loading": "Loading...",
      "submit": "Submit",
      "save": "Save",
      "error": "Error",
      "success": "Success",
      "cancel": "Cancel",
      "delete": "Delete",
      "back": "Back",
      "goBack": "Go Back",
      "page": "Page",
      "of": "of",
      "deleteConfirm": "Are you sure you want to delete this item?",
      "enabled": "Enabled",
      "disabled": "Disabled",
    },
    "auth": {
      "signIn": "Sign In",
      "signOut": "Sign Out",
      "email": "Email",
      "password": "Password",
      "invalidCredentials": "Invalid credentials",
      "appName": "Task Manager",
      "fillAllFields": "Please fill in all fields",
      "demoCredentials": "Demo Credentials:",
      "useAdminAccount": "Use Admin Account",
      "useMemberAccount": "Use Member Account"
    },
    "errors": {
      "title": "Errors",
      "noErrors": "No errors logged",
      "clearErrors": "Clear Errors",
      "clearAll": "Clear All Errors",
      "clear": "Clear",
      "clearConfirmation": "Are you sure you want to clear all error logs?",
      "clearedSuccess": "All error logs have been cleared",
      "clearError": "Failed to clear error logs",
      "accessDenied": "Access Denied",
      "adminOnly": "This screen is only available to administrators.",
      "goToTasks": "Go to Tasks",
      "totalErrors": "Error Logs ({{count}} total)",
      "serverError": "Server Error",
      "clientError": "Client Error",
      "info": "Info",
      "route": "Route",
      "userId": "User ID",
      "noErrorsDescription": "No errors have been logged yet."
    },
    "profile": {
      "title": "Profile",
      "preferences": "Preferences",
      "language": "Language",
      "appearance": "Appearance",
      "darkMode": "Dark Mode",
      "adminFeatures": "Admin Features",
      "featureFlags": "Feature Flags",
      "appInfo": "App Information",
      "version": "Version",
      "build": "Build",
      "environment": "Environment",
      "roleAdmin": "Administrator",
      "roleMember": "Member",
      "errorLogs": "Error Logs",
      "userManagement": "User Management",
      "errorLogsDescription": "View and manage application error logs from all users",
      "userManagementDescription": "Manage user accounts and permissions (Coming Soon)",
      "viewErrorLogs": "View Error Logs",
      "development": "Development",
      "logoutError": "Failed to sign out",
      "languageChangeError": "Failed to change language",
      "darkModeNotImplemented": "Dark mode feature is enabled but not implemented in this demo",
      "copyright": "Task Manager App © 2025"
    }
  },
  es: {
    "tasks": {
      "title": "Tareas",
      "addTask": "Agregar Tarea",
      "editTask": "Editar Tarea",
      "deleteTask": "Eliminar Tarea",
      "markComplete": "Marcar como Completada",
      "markIncomplete": "Marcar como Incompleta",
      "noTasks": "No se encontraron tareas",
      "completed": "Completada",
      "pending": "Pendiente",
      "taskTitle": "Título de la Tarea",
      "taskDescription": "Descripción de la Tarea",
      "description": "Descripción",
      "created": "Creada",
      "lastUpdated": "Última Actualización",
      "taskId": "ID de Tarea",
      "deleteConfirm": "¿Estás seguro de que quieres eliminar esta tarea?",
      "updateSuccess": "Tarea actualizada exitosamente",
      "updateError": "Error al actualizar la tarea",
      "deleteError": "Error al eliminar la tarea",
      "addError": "Error al agregar la tarea",
      "statusUpdateError": "Error al actualizar el estado de la tarea",
      "taskNotFound": "Tarea no encontrada",
      "searchPlaceholder": "Buscar tareas..."
    },
    "common": {
      "loading": "Cargando...",
      "submit": "Enviar",
      "save": "Guardar",
      "error": "Error",
      "success": "Éxito",
      "cancel": "Cancelar",
      "delete": "Eliminar",
      "back": "Atrás",
      "goBack": "Volver",
      "page": "Página",
      "of": "de",
      "deleteConfirm": "¿Estás seguro de que quieres eliminar este elemento?",
      "enabled": 'Habilitado',
      "disabled": 'Deshabilitado',
    },
    "auth": {
      "signIn": "Iniciar Sesión",
      "signOut": "Cerrar Sesión",
      "email": "Correo Electrónico",
      "password": "Contraseña",
      "invalidCredentials": "Credenciales inválidas",
      "appName": "Gestor de Tareas",
      "fillAllFields": "Por favor, complete todos los campos",
      "demoCredentials": "Credenciales de Demo:",
      "useAdminAccount": "Usar Cuenta de Administrador",
      "useMemberAccount": "Usar Cuenta de Miembro"
    },
    "errors": {
      "title": "Errores",
      "noErrors": "No hay errores registrados",
      "clearErrors": "Limpiar Errores",
      "clearAll": "Limpiar Todos los Errores",
      "clear": "Limpiar",
      "clearConfirmation": "¿Estás seguro de que quieres limpiar todos los registros de errores?",
      "clearedSuccess": "Todos los registros de errores han sido limpiados",
      "clearError": "Error al limpiar los registros de errores",
      "accessDenied": "Acceso Denegado",
      "adminOnly": "Esta pantalla solo está disponible para administradores.",
      "goToTasks": "Ir a Tareas",
      "totalErrors": "Registros de Error ({{count}} total)",
      "serverError": "Error del Servidor",
      "clientError": "Error del Cliente",
      "info": "Información",
      "route": "Ruta",
      "userId": "ID de Usuario",
      "noErrorsDescription": "No se han registrado errores aún."
    },
    "profile": {
      "title": "Perfil",
      "preferences": "Preferencias",
      "language": "Idioma",
      "appearance": "Apariencia",
      "darkMode": "Modo Oscuro",
      "adminFeatures": "Funciones de Administrador",
      "featureFlags": "Banderas de Función",
      "appInfo": "Información de la App",
      "version": "Versión",
      "build": "Compilación",
      "environment": "Entorno",
      "roleAdmin": "Administrador",
      "roleMember": "Miembro",
      "errorLogs": "Registros de Error",
      "userManagement": "Gestión de Usuarios",
      "errorLogsDescription": "Ver y gestionar registros de errores de la aplicación de todos los usuarios",
      "userManagementDescription": "Gestionar cuentas de usuario y permisos (Próximamente)",
      "viewErrorLogs": "Ver Registros de Error",
      "development": "Desarrollo",
      "logoutError": "Error al cerrar sesión",
      "languageChangeError": "Error al cambiar el idioma",
      "darkModeNotImplemented": "La función de modo oscuro está habilitada pero no implementada en esta demo",
      "copyright": "Task Manager App © 2025"
    }
  },
};

export const i18n = new I18n(translations);

// Set the locale from storage or default to 'en'
export const initI18n = async () => {
  try {
    const savedLocale = await AsyncStorage.getItem('user_locale');
    i18n.locale = savedLocale || 'en';
  } catch (error) {
    console.error('Failed to load locale:', error);
    i18n.locale = 'en';
  }
};

export const setLocale = async (locale: string) => {
  try {
    i18n.locale = locale;
    await AsyncStorage.setItem('user_locale', locale);
  } catch (error) {
    console.error('Failed to save locale:', error);
  }
};
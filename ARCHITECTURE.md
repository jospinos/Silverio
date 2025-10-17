# Arquitectura Limpia - Silverio Social Network App

## 📁 Estructura del Proyecto

Este proyecto sigue los principios de **Clean Architecture** de Robert C. Martin, organizando el código en capas claramente definidas que promueven la separación de responsabilidades, testabilidad y mantenibilidad.

```
src/
├── core/                           # Lógica de negocio central
│   ├── domain/                     # Entidades y reglas de negocio
│   │   ├── entities/              # Entidades del dominio
│   │   ├── repositories/          # Interfaces de repositorios
│   │   └── usecases/             # Casos de uso
│   └── application/               # Servicios de aplicación
│       ├── services/             # Servicios de aplicación
│       └── dto/                  # Data Transfer Objects
│
├── features/                      # Características por módulo
│   ├── auth/                     # Autenticación y autorización
│   │   ├── domain/              
│   │   ├── infrastructure/      
│   │   └── presentation/        
│   ├── posts/                   # Publicaciones
│   ├── profile/                 # Perfiles de usuario
│   ├── chat/                    # Sistema de chat
│   ├── reels/                   # Videos cortos
│   ├── stories/                 # Historias temporales
│   ├── notifications/           # Notificaciones
│   ├── search/                  # Búsqueda
│   ├── music/                   # Reproductor de música
│   └── settings/                # Configuraciones
│
├── infrastructure/              # Implementaciones externas
│   ├── api/                    # Cliente API y servicios HTTP
│   ├── storage/                # Almacenamiento local
│   └── repositories/           # Implementaciones de repositorios
│
├── presentation/               # Capa de presentación
│   ├── screens/               # Pantallas principales
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/               # Componentes UI básicos
│   │   └── common/           # Componentes comunes
│   ├── navigation/           # Configuración de navegación
│   ├── hooks/               # Custom hooks
│   └── context/             # React Context providers
│
├── shared/                     # Recursos compartidos
│   ├── constants/             # Constantes globales
│   ├── types/                # Tipos TypeScript
│   ├── utils/               # Utilidades y helpers
│   └── theme/               # Tema y estilos globales
│
└── assets/                    # Recursos estáticos
    ├── fonts/                # Fuentes
    ├── images/              # Imágenes
    ├── audio/               # Archivos de audio
    └── video/               # Archivos de video
```

## 🎯 Principios de Arquitectura Limpia

### 1. **Independencia de Frameworks**
- La lógica de negocio no depende de React Native
- Se puede cambiar el framework sin afectar las reglas de negocio

### 2. **Testabilidad**
- Cada capa puede ser testeada independientemente
- Las dependencias apuntan hacia adentro (hacia el dominio)

### 3. **Independencia de UI**
- La UI puede cambiar sin afectar la lógica de negocio
- La lógica no sabe nada sobre botones, pantallas, etc.

### 4. **Independencia de Base de Datos**
- Las reglas de negocio no están atadas a la base de datos
- Se puede cambiar de SQLite a API REST sin afectar el dominio

## 📋 Descripción de Capas

### **Core Domain**
Contiene las **entidades** y **reglas de negocio** más importantes. Es el corazón de la aplicación.

- `entities/`: Objetos de negocio (User, Post, Message, etc.)
- `repositories/`: Interfaces que definen cómo obtener datos
- `usecases/`: Casos de uso específicos (LoginUser, CreatePost, SendMessage)

### **Features**
Cada feature es un módulo independiente que encapsula toda la funcionalidad relacionada:

- `domain/`: Lógica específica del feature
- `infrastructure/`: Implementaciones de APIs y storage
- `presentation/`: Screens, components y hooks específicos

### **Infrastructure**
Implementaciones concretas de las interfaces definidas en el dominio:

- `api/`: Cliente HTTP, endpoints, interceptors
- `storage/`: AsyncStorage, SQLite, cache
- `repositories/`: Implementaciones de los repositorios del dominio

### **Presentation**
Todo lo relacionado con la interfaz de usuario:

- `screens/`: Pantallas principales de la app
- `components/`: Componentes reutilizables
- `navigation/`: Stack, Tab, Drawer navigators
- `hooks/`: Custom hooks para lógica de presentación
- `context/`: Providers de React Context

### **Shared**
Recursos compartidos entre todas las capas:

- `constants/`: URLs, keys, configuraciones
- `types/`: Interfaces y tipos TypeScript
- `utils/`: Funciones de utilidad
- `theme/`: Colores, tipografías, espaciados

## 🚀 Beneficios de esta Estructura

1. **Escalabilidad**: Fácil agregar nuevas features
2. **Mantenibilidad**: Código organizado y fácil de entender
3. **Testabilidad**: Cada parte puede ser testeada independientemente
4. **Reutilización**: Componentes y lógica reutilizable
5. **Separación de responsabilidades**: Cada archivo tiene un propósito claro
6. **Independencia de tecnología**: Fácil migrar o cambiar tecnologías

## 📝 Próximos Pasos

1. Migrar archivos existentes a la nueva estructura
2. Crear interfaces y entidades del dominio
3. Implementar casos de uso
4. Refactorizar componentes de presentación
5. Configurar testing por capas
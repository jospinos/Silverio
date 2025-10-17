# Path Aliases Configuration - Silverio

## ✅ Configuración Completada

Se han configurado path aliases para facilitar los imports en la nueva estructura de Clean Architecture. Ahora puedes usar imports más limpios y organizados.

## 📁 Path Aliases Disponibles

| Alias | Ruta | Descripción |
|-------|------|-------------|
| `@core/*` | `src/core/*` | Lógica de negocio central (entidades, casos de uso) |
| `@features/*` | `src/features/*` | Funcionalidades por módulo |
| `@infrastructure/*` | `src/infrastructure/*` | Implementaciones externas (API, storage) |
| `@presentation/*` | `src/presentation/*` | Componentes, screens, navegación |
| `@shared/*` | `src/shared/*` | Recursos compartidos (tipos, utils, constantes) |
| `@assets/*` | `assets/*` | Recursos estáticos (imágenes, fuentes, etc.) |
| `@app/*` | `app/*` | Código existente (durante la migración) |

## 🔧 Archivos Configurados

### 1. `tsconfig.json`
Configuración de TypeScript para reconocer los path aliases:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@core/*": ["src/core/*"],
      "@features/*": ["src/features/*"],
      "@infrastructure/*": ["src/infrastructure/*"],
      "@presentation/*": ["src/presentation/*"],
      "@shared/*": ["src/shared/*"],
      "@assets/*": ["assets/*"],
      "@app/*": ["app/*"]
    }
  }
}
```

### 2. `metro.config.js`
Configuración de Metro bundler para resolver los aliases:
```javascript
const config = {
  resolver: {
    alias: {
      '@core': path.resolve(__dirname, 'src/core'),
      '@features': path.resolve(__dirname, 'src/features'),
      // ... otros aliases
    },
  },
};
```

### 3. `babel.config.js`
Plugin module-resolver para Babel:
```javascript
plugins: [
  [
    'module-resolver',
    {
      alias: {
        '@core': './src/core',
        '@features': './src/features',
        // ... otros aliases
      },
    },
  ],
],
```

### 4. `.eslintrc.js`
Configuración de ESLint para reconocer y ordenar imports:
```javascript
settings: {
  'import/resolver': {
    'babel-module': {
      alias: {
        '@core': './src/core',
        // ... otros aliases
      },
    },
  },
},
```

## 📝 Ejemplos de Uso

### Antes (imports relativos)
```typescript
import { User } from '../../../shared/types';
import { formatDate } from '../../../shared/utils';
import { API_BASE_URL } from '../../../shared/constants';
```

### Después (path aliases)
```typescript
import { User } from '@shared/types';
import { formatDate } from '@shared/utils';
import { API_BASE_URL } from '@shared/constants';
```

## 🚀 Beneficios

1. **Imports más limpios**: No más `../../../` 
2. **Mejor refactoring**: Los imports no se rompen al mover archivos
3. **Autocomplete mejorado**: IDEs reconocen mejor las rutas
4. **Organización clara**: Fácil identificar el origen de cada import
5. **Menos errores**: Rutas más explícitas y fáciles de validar

## 📋 Próximos Pasos

1. **Empezar a usar** los nuevos path aliases en archivos nuevos
2. **Migrar gradualmente** los imports existentes
3. **Configurar IDE** (VS Code) para mejor soporte:
   - Instalar extensión "TypeScript Importer"
   - Configurar auto-imports para usar aliases

## 🔍 VS Code Configuration

Crear `.vscode/settings.json` (opcional):
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "typescript.suggest.paths": true
}
```

## ⚠️ Notas Importantes

- Los aliases `@app/*` son temporales para la migración
- Una vez completada la migración, remover `@app/*`
- Siempre usar aliases en lugar de imports relativos largos
- Mantener consistencia en el uso de aliases en todo el proyecto
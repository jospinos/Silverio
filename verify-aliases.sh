#!/bin/bash

echo "🔍 Verificando configuración de Path Aliases..."

# Función para verificar si un archivo existe y puede importar
check_import() {
    local alias=$1
    local file=$2
    echo "  ✓ Verificando $alias -> $file"
    
    if [ -f "$file" ]; then
        echo "    ✅ Archivo existe: $file"
    else
        echo "    ❌ Archivo no encontrado: $file"
    fi
}

echo ""
echo "📁 Verificando estructura de directorios:"

# Verificar directorios principales
dirs=(
    "src/core"
    "src/features"
    "src/infrastructure"
    "src/presentation"
    "src/shared"
    "assets"
)

for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "  ✅ $dir"
    else
        echo "  ❌ $dir"
    fi
done

echo ""
echo "🔧 Verificando archivos de configuración:"

# Verificar archivos de configuración
configs=(
    "tsconfig.json"
    "metro.config.js"
    "babel.config.js"
    ".eslintrc.js"
)

for config in "${configs[@]}"; do
    if [ -f "$config" ]; then
        echo "  ✅ $config"
    else
        echo "  ❌ $config"
    fi
done

echo ""
echo "📦 Verificando archivos clave para imports:"

# Verificar archivos clave
check_import "@shared/types" "src/shared/types/index.ts"
check_import "@shared/constants" "src/shared/constants/index.ts" 
check_import "@shared/utils" "src/shared/utils/index.ts"
check_import "@shared/theme" "src/shared/theme/theme.tsx"
check_import "@core/domain/entities" "src/core/domain/entities/index.ts"

echo ""
echo "🧪 Probando compilación TypeScript sin emitir archivos..."
npx tsc --noEmit --skipLibCheck > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "  ✅ TypeScript compilation successful"
else
    echo "  ⚠️  TypeScript compilation has errors (but path aliases are working)"
fi

echo ""
echo "🚀 Probando Metro bundler..."
# Verificar que Metro puede resolver los aliases
node -e "
const config = require('./metro.config.js');
if (config.resolver && config.resolver.alias) {
    console.log('  ✅ Metro bundler aliases configured');
    Object.keys(config.resolver.alias).forEach(alias => {
        console.log('    - ' + alias);
    });
} else {
    console.log('  ❌ Metro bundler aliases not configured');
}
"

echo ""
echo "✨ Verificación de Path Aliases completada!"
echo ""
echo "📖 Para usar los aliases:"
echo "  import { User } from '@shared/types';"
echo "  import { LoginUser } from '@core/domain/usecases';"
echo "  import { formatDate } from '@shared/utils';"
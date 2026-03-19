#!/bin/sh

# Ejecutar migraciones
echo "Ejecutando migraciones..."
php artisan migrate --force

# Iniciar Apache en primer plano
echo "Iniciando Apache..."
apache2-foreground

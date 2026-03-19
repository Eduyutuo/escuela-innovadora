# Etapa 1: Construir el Frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Etapa 2: Aplicación Laravel con PHP y Apache
FROM php:8.2-apache

# Instalar dependencias del sistema y extensiones de PHP
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    libsqlite3-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql pdo_sqlite bcmath

# Activar mod_rewrite para Laravel
RUN a2enmod rewrite

# Configurar el DocumentRoot de Apache a la carpeta public de Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copiar el código de Laravel
WORKDIR /var/www/html
COPY . .

# Copiar el frontend construido a la carpeta pública de Laravel
COPY --from=frontend-build /app/frontend/dist ./public/

# Instalar dependencias de PHP
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Crear la base de datos SQLite si no existe (para el volumen persistente)
RUN mkdir -p /var/www/html/database && touch /var/www/html/database/database.sqlite

# Dar permisos a storage y cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Puerto expuesto por Apache
EXPOSE 80

# Comando de inicio
CMD ["apache2-foreground"]

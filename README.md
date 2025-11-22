# Docker Project Documentation

## 🚀 Быстрый старт

### Предварительные требования

-   Docker установлен на вашей системе
-   Docker Compose установлен

### Запуск в режиме разработки

Чтобы запустить проект с горячей перезагрузкой для frontend и backend:

``` bash
# Собрать и запустить все сервисы
docker-compose -f docker-compose.dev.yml up --build

# Или запустить в фоновом режиме
docker-compose -f docker-compose.dev.yml up --build -d
```

### Запуск в продакшен режиме

``` bash
# Собрать и запустить продакшен сервисы
docker-compose -f docker-compose.yml up --build -d
```

### Остановка сервисов

``` bash
# Остановить development сервисы
docker-compose -f docker-compose.dev.yml down

# Остановить production сервисы
docker-compose -f docker-compose.yml down
```

    project/
    ├── backend/
    │   ├── src/
    │   ├── pom.xml
    │   ├── Dockerfile
    │   └── Dockerfile.dev
    ├── frontend/
    │   ├── src/
    │   ├── package.json
    │   ├── Dockerfile
    │   └── Dockerfile.dev
    ├── nginx/
    │   ├── nginx.conf
    │   └── Dockerfile
    ├── docker-compose.yml
    ├── docker-compose.dev.yml
    └── .env

## Доступ к приложениям

### В режиме разработки

-   Frontend: http://localhost:3000\
-   Backend: http://localhost:8080\
-   Через Nginx: http://localhost\
-   База данных: localhost:3307

### В продакшене

-   Приложение: http://localhost\
-   База данных: только внутренний доступ

## ⚙️ Управление сервисами

### Просмотр логов

``` bash
docker-compose -f docker-compose.dev.yml logs -f
docker-compose -f docker-compose.yml logs -f
docker-compose -f docker-compose.dev.yml logs backend
```

### Перезапуск сервисов

``` bash
docker-compose -f docker-compose.dev.yml restart backend
docker-compose -f docker-compose.dev.yml restart
```

### Проверка статуса

``` bash
docker-compose -f docker-compose.dev.yml ps
docker ps
```

## 🔧 Работа с базой данных

### Подключение

``` bash
mysql -h 127.0.0.1 -P 3307 -u app_user -p app_db
```

### Резервное копирование

``` bash
docker exec -i docker-database-1 mysqldump -u app_user -papp_password app_db > backup.sql
docker exec -i docker-database-1 mysql -u app_user -papp_password app_db < backup.sql
```

## 🛠️ Устранение неполадок

### Порт занят

``` bash
lsof -i :3307
docker stop $(docker ps -q --filter "publish=3307")
```

### Проблемы со сборкой

``` bash
docker-compose -f docker-compose.dev.yml build --no-cache
docker system prune -f
```

### Проблемы с базой данных

``` bash
docker-compose -f docker-compose.dev.yml ps database
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d database
```

## 📝 Переменные окружения (.env)

``` env
DB_NAME=app_db
DB_USERNAME=app_user
DB_PASSWORD=app_password
DB_ROOT_PASSWORD=root_password
SPRING_PROFILES_ACTIVE=dev
NEXT_PUBLIC_API_URL=/api
```

## 🔄 Разработка

``` bash
docker-compose -f docker-compose.dev.yml up --build
docker-compose -f docker-compose.dev.yml down
```

## 🗄️ Описание сервисов

### Backend

Spring Boot, порт 8080, JPA/Hibernate, hot reload.

### Frontend

Next.js 16.0.3, порт 3000, Turbopack, HMR.

### Nginx

Порт 80, reverse proxy.

### Database

MySQL 8.0, порт 3307 в dev, volume mysql_data.

## 🚀 Деплой

``` bash
docker-compose -f docker-compose.yml up --build -d
docker-compose -f docker-compose.yml ps
docker-compose -f docker-compose.yml logs -f
```

### Продакшен .env

    SPRING_PROFILES_ACTIVE=prod
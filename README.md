# Authentication Backend API

A comprehensive NestJS-based authentication backend API built with MongoDB, Redis, JWT authentication, and comprehensive security features.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Installation & Setup](#installation--setup)
5. [Environment Variables](#environment-variables)
6. [API Documentation](#api-documentation)
7. [Security Features](#security-features)
8. [Database Schema](#database-schema)
9. [Middleware & Guards](#middleware--guards)
10. [Error Handling](#error-handling)

## 🔍 Overview

A robust authentication system must balance performance, security, and user experience. By integrating Redis caching, the platform efficiently implements rate limiting, preventing brute-force attacks and abusive requests in real time, while also enabling fast and reliable token revocation—instantly invalidating compromised or outdated tokens across distributed systems. To mitigate XSS (Cross-Site Scripting) attacks, JWT tokens are securely stored and transmitted via HttpOnly cookies, ensuring they are inaccessible to client-side JavaScript and reducing the attack surface. Additionally, the use of CSRF tokens (Cross-Site Request Forgery) adds an extra layer of protection for state-changing operations, verifying that each request originates from a legitimate user session. The refresh token mechanism further enhances security and user experience by allowing seamless session renewal without exposing sensitive credentials, maintaining strong authentication flows across web and mobile platforms.

This is a production-ready authentication system built with NestJS framework featuring:

- **JWT Authentication** with access/refresh token mechanism
- **Email Verification** with OTP
- **Role-based Access Control** (RBAC)
- **Rate Limiting** and **Security Headers**
- **Multi-platform Support** (Web, Mobile)
- **Redis Caching** for performance optimization
- **MongoDB** for data persistence
- **Comprehensive Logging** and error handling

## 🏗️ Architecture

```
┌─────────────────┐
│    Client App   │
└─────────┬───────┘
          │
    ┌─────▼─────┐
    │  Nginx    │  (Load Balancer/Reverse Proxy)
    └─────┬─────┘
          │
    ┌─────▼─────┐
    │ NestJS API │  (Authentication Service)
    └─────┬─────┘
          │
    ┌─────▼─────┐    ┌──────────┐
    │ MongoDB   │    │  Redis   │
    │(Database) │    │ (Cache)  │
    └───────────┘    └──────────┘
```

## ✨ Features

### Core Features

- 🔐 **User Registration** with email verification
- 🔑 **JWT-based Authentication** with CSRF protection
- 🔄 **Token Refresh** mechanism
- 📧 **Email Verification** with OTP
- 👥 **Role-based Authorization** (USER, SELLER, ADMIN, SUPER_ADMIN)
- 🚫 **Rate Limiting** protection
- 🛡️ **Security Headers** (Helmet.js)
- 📱 **Multi-platform Support** (Web, iOS, Android)

### Advanced Features

- ⚡ **Redis Caching** for performance
- 📊 **Comprehensive Logging**
- 🔍 **API Documentation** with Swagger
- 📈 **Health Checks**

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5.0 or higher)
- Redis (v6.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd auth-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

```bash
cp .env
# Edit .env with your configuration
```

4. **Start the services**

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
#Server configuration
SERVER_PORT=80
NODE_ENV=development

#Swagger configuration
SWAGGER_ROUTE=api
SWAGGER_USER=admin
SWAGGER_PASSWORD="easy generator"

#Api documentation
APP_DOCS="docs"

#MongoDB configuration
MONGODB_URI=mongodb+srv://XMoSalahX2:m7d8JPBCanef6qUF@private.hpheqtq.mongodb.net/EasyGenerator

#Redis configuration
REDIS_USERNAME=default
REDIS_PASSWORD=yyMSyXo13pQLYjLFPgyeSRvmD2BR5pdx
REDIS_HOST=redis-13492.c62.us-east-1-4.ec2.redns.redis-cloud.com
REDIS_PORT=13492

#Authentication configuration
SECRET_KEY=fortestcode
BCRYPT_PASSWORD=testajsdalk
SALT_ROUND=10
JWT_SECRET=MohammedSalahEasyGeneratorForEver
JWT_REFRESH_SECRET=MohammedSalahEasyGeneratorForEverRefresh
JWT_CSRF_SECRET=MohammedSalahEasyGeneratorForEverCSRF
JWT_Expiry=1d
JWT_Refresh_Expiry=7d

#Mailer gmail configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USER=clickup.mohammedsalah@gmail.com
MAIL_PASS=ozgbxafddkxdxgwx

#Frontend configuration
FRONTEND_URL=http://localhost:3000

#Application status
APPLICATION_STATUS=2
ANDROID_CRITICAL_UPDATE=1
IOS_CRITICAL_UPDATE=1

```

## 📚 API Documentation

### Base URL

```
http://localhost:80/v1
```

### Authentication Headers

All protected endpoints require:

```http
Authorization: Bearer <access_token>  # For mobile apps
csrf-token: <csrf_token>              # Required for all authenticated requests
app: <app_name>                       # Application identifier
version: <app_version>                # Application version
os: <operating_system>                # Android|iOS|Web|Swagger|Elastic
```

---

## 🔗 API Endpoints

### 1. Server Health Check

#### GET `/`

Check server status and health.

**Request:**

```http
GET / HTTP/1.1
```

**Response:**

```json
{
  "statusCode": 201,
  "message": "OK",
  "flag": null,
  "body": "SERVER WORKING"
}
```

**Sequence Diagram:**

```mermaid
sequenceDiagram
    participant Client
    participant AuthBackend
    participant AppService

    Client->>AuthBackend: GET /
    AuthBackend->>AppService: serverChecking()
    AppService-->>AuthBackend: Server status
    AuthBackend-->>Client: 200 OK (Server healthy)
```

---

### 2. User Registration

#### POST `/v1/auth/signup`

Register a new user with email verification.

**Request:**

```http
POST /v1/auth/signup HTTP/1.1
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "StrongP@ss123",
  "role": "USER"
}
```

**Response:**

```json
{
  "statusCode": 201,
  "message": "OK",
  "flag": null,
  "body": "User already exists, please check your email for verification instructions."
}
```

**Sequence Diagram:**

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthService
    participant UsersService
    participant CacheService
    participant MailerService
    participant MongoDB
    participant Redis

    Client->>AuthController: POST /v1/auth/signup
    AuthController->>AuthService: signUp(createUserDto)

    AuthService->>AuthService: Hash password
    AuthService->>UsersService: findOne(email, role)
    UsersService->>MongoDB: Query user
    MongoDB-->>UsersService: User data (if exists)
    UsersService-->>AuthService: User result

    alt User already exists and active
        AuthService-->>AuthController: Throw EMAIL_EXIST error
    else User doesn't exist or not completed
        AuthService->>AuthService: generateOtp(4)
        AuthService->>CacheService: setCache(otp:email, otp, 300s)
        CacheService->>Redis: Store OTP
        Redis-->>CacheService: Success

        AuthService->>MailerService: sendMail(email, subject, template)
        MailerService-->>AuthService: Email sent

        alt New user
            AuthService->>UsersService: create(userDto)
            UsersService->>MongoDB: Insert user
            MongoDB-->>UsersService: User created
        end

        AuthService-->>AuthController: Success message
    end

    AuthController-->>Client: 201 Created
```

---

### 3. Email Verification

#### PATCH `/v1/auth/verify-email`

Verify user email with OTP.

**Request:**

```http
PATCH /v1/auth/verify-email HTTP/1.1
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "otp": 1234
}
```

**Response:**

```json
{
  "statusCode": 201,
  "message": "OK",
  "flag": null,
  "body": "Email verified successfully"
}
```

**Sequence Diagram:**

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthService
    participant CacheService
    participant UsersService
    participant MongoDB
    participant Redis

    Client->>AuthController: PATCH /v1/auth/verify-email
    AuthController->>AuthService: verifyEmail(email, otp)

    AuthService->>CacheService: getCache(otp:email)
    CacheService->>Redis: Get stored OTP
    Redis-->>CacheService: OTP value
    CacheService-->>AuthService: Cached OTP

    alt OTP not found or expired
        AuthService-->>AuthController: Throw OTP_NOT_EXIST_OR_EXPIRED error
    else OTP doesn't match
        AuthService-->>AuthController: Throw OTP_NOT_MATCH error
    else OTP valid
        AuthService->>UsersService: findOne(email, status=NOT_COMPLETED)
        UsersService->>MongoDB: Query user
        MongoDB-->>UsersService: User data

        AuthService->>UsersService: updateStatus(userId, ACTIVE)
        UsersService->>MongoDB: Update user status
        MongoDB-->>UsersService: Update success

        AuthService-->>AuthController: Success message
    end

    AuthController-->>Client: 200 OK
```

---

### 4. User Sign In

#### POST `/v1/auth/signin`

Authenticate user and receive tokens.

**Request:**

```http
POST /v1/auth/signin HTTP/1.1
Content-Type: application/json
app: MyApp
version: 1.0.0
os: Web

{
  "email": "john.doe@example.com",
  "password": "StrongP@ss123",
  "role": "USER"
}
```

**Response:**

```json
{
  "statusCode": 201,
  "message": "OK",
  "flag": null,
  "body": {
    "user": {
      "_id": "68628fc89ddf64a6fe0f29c7",
      "fullName": "Mohammed Salah",
      "role": "USER",
      "email": "mohammedsalah6055@gmail.com",
      "password": "$2b$10$SMZ7cYt55QR9DMk2mEHW2OC1KVD8M.6hyOp5jzH4ZDMgygHL0.qAu",
      "userStatus": "ACTIVE",
      "createdAt": "2025-06-30T13:23:20.252Z",
      "updatedAt": "2025-06-30T13:26:42.390Z"
    }
  }
}
```

**Response Headers:**

```http
Set-Cookie: access_token=<jwt_token>; HttpOnly; Secure; SameSite=Strict
Set-Cookie: refresh_token=<refresh_token>; HttpOnly; Secure; SameSite=Strict
csrf-token: <csrf_token>
```

**Sequence Diagram:**

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant JWTAuthGuard
    participant AuthService
    participant UsersService
    participant CacheService
    participant MongoDB
    participant Redis

    Client->>AuthController: POST /v1/auth/signin
    AuthController->>JWTAuthGuard: canActivate()

    JWTAuthGuard->>UsersService: findOne(email, role)
    UsersService->>MongoDB: Query user
    MongoDB-->>UsersService: User data

    alt User not found
        JWTAuthGuard-->>AuthController: Throw NOT_FOUND_USER error
    else User deleted/blocked
        JWTAuthGuard-->>AuthController: Throw USER_DELETED/BLOCKED error
    else Valid user
        JWTAuthGuard->>JWTAuthGuard: bcrypt.compare(password, hashedPassword)

        alt Password incorrect
            JWTAuthGuard-->>AuthController: Throw PASSWORD_NOT_VALID error
        else Password correct
            JWTAuthGuard->>JWTAuthGuard: Generate JWT tokens
            Note over JWTAuthGuard: - Access Token (1d)<br/>- Refresh Token (7d)<br/>- CSRF Token (7d)

            JWTAuthGuard->>CacheService: setMultipleCache(refreshToken, 7d)
            CacheService->>Redis: Store refresh token

            JWTAuthGuard->>JWTAuthGuard: Check application status & version
            JWTAuthGuard-->>AuthController: Set user in request
        end
    end

    AuthController->>AuthService: signIn(headers, user, response)

    alt Web/Swagger platform
        AuthService->>AuthService: Set HTTP-only cookies
        AuthService->>AuthService: Set CSRF header
        AuthService->>AuthService: Remove tokens from response
    end

    AuthService-->>AuthController: User data
    AuthController-->>Client: 200 OK + Cookies + Headers
```

---

### 5. Check Authentication

#### GET `/v1/auth/check-auth`

Verify if user is authenticated.

**Request:**

```http
GET /v1/auth/check-auth HTTP/1.1
Authorization: Bearer <access_token>
csrf-token: <csrf_token>
app: MyApp
version: 1.0.0
os: Web
```

**Response:**

```json
{
  "statusCode": 201,
  "message": "OK",
  "flag": null,
  "body": "User Authenticated"
}
```

**Sequence Diagram:**

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant JWTDecodedAuthGuard
    participant JwtService
    participant CacheService
    participant Redis

    Client->>AuthController: GET /v1/auth/check-auth
    AuthController->>JWTDecodedAuthGuard: canActivate()

    JWTDecodedAuthGuard->>JWTDecodedAuthGuard: Extract tokens from request
    Note over JWTDecodedAuthGuard: - Access token from cookies/headers<br/>- CSRF token from headers<br/>- Refresh token from cookies

    JWTDecodedAuthGuard->>JwtService: verify(csrfToken, csrfSecret)
    JwtService-->>JWTDecodedAuthGuard: Decoded CSRF

    JWTDecodedAuthGuard->>JwtService: verify(accessToken, secret)
    JwtService-->>JWTDecodedAuthGuard: Decoded user

    alt Token expired and refresh token exists
        JWTDecodedAuthGuard->>JwtService: verify(refreshToken, refreshSecret)
        JWTDecodedAuthGuard->>CacheService: getCache(refreshToken)
        CacheService->>Redis: Check token validity
        Redis-->>CacheService: Token status

        alt Refresh token valid
            JWTDecodedAuthGuard->>JwtService: sign(newAccessToken)
            JWTDecodedAuthGuard->>JWTDecodedAuthGuard: Set new access token cookie
        else Refresh token invalid
            JWTDecodedAuthGuard-->>AuthController: Throw REFRESH_EXPIRED error
        end
    else Token valid
        JWTDecodedAuthGuard->>JWTDecodedAuthGuard: Validate CSRF token match
        JWTDecodedAuthGuard->>JWTDecodedAuthGuard: Check user status
        JWTDecodedAuthGuard-->>AuthController: Set user in request
    end

    AuthController-->>Client: 200 OK
```

---

### 6. User Logout

#### DELETE `/v1/auth/logout`

Sign out user and invalidate tokens.

**Request:**

```http
DELETE /v1/auth/logout HTTP/1.1
Authorization: Bearer <access_token>
csrf-token: <csrf_token>
app: MyApp
version: 1.0.0
os: Web
```

**Response:**

```json
{
  "statusCode": 201,
  "message": "OK",
  "flag": null,
  "body": "Logout successfully"
}
```

**Sequence Diagram:**

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthService
    participant JwtService
    participant CacheService
    participant Redis

    Client->>AuthController: DELETE /v1/auth/logout
    AuthController->>AuthService: logout(user, response, headers, refreshToken)

    alt Mobile platform without refresh token
        AuthService-->>AuthController: Throw BadRequestException
    else Valid request
        AuthService->>CacheService: deleteCache(refreshToken)
        CacheService->>Redis: Delete refresh token
        Redis-->>CacheService: Deletion success

        alt Web/Swagger platform
            AuthService->>AuthService: Clear HTTP-only cookies
            Note over AuthService: - Clear access_token cookie<br/>- Clear refresh_token cookie
        else Mobile platform
            AuthService->>JwtService: verify(refreshToken, refreshSecret)
            JwtService-->>AuthService: Decoded token

            alt Token user mismatch
                AuthService-->>AuthController: Throw NOT_ALLOWED error
            end
        end

        AuthService-->>AuthController: Logout success
    end

    AuthController-->>Client: 200 OK + Cleared Cookies
```

---

### 7. Garbage Collection (Admin Only)

#### GET `/gc`

Trigger garbage collection (Super Admin only).

**Request:**

```http
GET /gc HTTP/1.1
Authorization: Bearer <access_token>
csrf-token: <csrf_token>
app: MyApp
version: 1.0.0
os: Web
```

**Response:**

```json
{
  "success": true,
  "message": "Garbage collector invoked"
}
```

**Sequence Diagram:**

```mermaid
sequenceDiagram
    participant Client
    participant AppController
    participant RolesGuard
    participant AppService

    Client->>AppController: GET /gc
    AppController->>RolesGuard: Check SUPER_ADMIN role

    alt User not SUPER_ADMIN
        RolesGuard-->>AppController: Throw FORBIDDEN error
    else User is SUPER_ADMIN
        AppController->>AppService: gc()
        AppService->>AppService: global.gc()
        AppService-->>AppController: GC triggered
        AppController-->>Client: 200 OK
    end
```

---

## 🛡️ Security Features

### 1. JWT Authentication

- **Access Token**: Short-lived (1 day) for API access
- **Refresh Token**: Long-lived (7 days) for token renewal
- **CSRF Token**: Prevents cross-site request forgery attacks

### 2. Password Security

- **bcrypt Hashing**: Passwords encrypted with salt rounds
- **Strong Password Policy**: Minimum 8 characters with complexity requirements

### 3. Rate Limiting

- **Global Rate Limit**: 10 requests per minute per IP
- **Endpoint-specific Limits**: 60 requests per minute for auth endpoints

### 4. Security Headers

```javascript
helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", 'https:'],
    imgSrc: ["'self'", 'data:', 'https:'],
    connectSrc: ["'self'"],
    fontSrc: ["'self'", 'https:'],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  },
});
```

### 5. CORS Configuration

- **Environment-based Origins**: Different allowed origins for development/production
- **Credentials Support**: Secure cookie transmission
- **CSRF Token Exposure**: Safe token sharing via headers

---

## 📊 Database Schema

### User Schema

```typescript
{
  _id: ObjectId,
  fullName: String,      // Trimmed and uppercase getter
  email: String,         // Unique with role
  password: String,      // bcrypt hashed
  role: UserRolesEnums,  // USER | SELLER | ADMIN | SUPER_ADMIN
  userStatus: UserStatus, // ACTIVE | INACTIVE | BLOCKED | DELETED | NOT_COMPLETED
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes

```javascript
// Compound unique index
{ email: 1, role: 1 } // unique: true

// Performance indexes
{ role: 1 }
{ userStatus: 1 }
{ email: 1 }
```

---

## 🔐 Middleware & Guards

### 1. Authentication Guards

#### JWTDecodedAuthGuard

- **Purpose**: Validates JWT tokens and CSRF protection
- **Features**:
  - Token extraction from cookies/headers
  - CSRF token validation
  - Automatic token refresh
  - User status validation

#### JWTAuthGuard

- **Purpose**: Sign-in authentication and token generation
- **Features**:
  - Password validation
  - JWT token generation
  - Application status checks
  - Platform-specific validations

#### RolesGuard

- **Purpose**: Role-based access control
- **Features**:
  - Role requirement validation
  - Multiple role support
  - Decorator-based configuration

### 2. Middleware

#### LoggerMiddleware

- **Purpose**: Request/response logging
- **Features**:
  - Winston-based logging
  - Request tracking
  - Error logging

#### SwaggerAuthMiddleware

- **Purpose**: Protect Swagger documentation
- **Features**:
  - Basic authentication
  - Environment-based credentials

#### HeaderValidationGuard

- **Purpose**: Validate required headers
- **Features**:
  - App identifier validation
  - Version checking
  - OS validation

#### RateLimiterGuard

- **Purpose**: Request rate limiting
- **Features**:
  - Redis-based storage
  - IP-based limiting
  - Configurable limits

---

## ⚠️ Error Handling

### Error Types

```typescript
enum ErrorTypes {
  // Authentication Errors
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_REQUIRED = 'TOKEN_REQUIRED',
  REFRESH_EXPIRED = 'REFRESH_EXPIRED',

  // User Errors
  NOT_FOUND_USER = 'NOT_FOUND_USER',
  EMAIL_EXIST = 'EMAIL_EXIST',
  PASSWORD_NOT_VALID = 'PASSWORD_NOT_VALID',

  // OTP Errors
  OTP_NOT_EXIST_OR_EXPIRED = 'OTP_NOT_EXIST_OR_EXPIRED',
  OTP_NOT_MATCH = 'OTP_NOT_MATCH',

  // CSRF Errors
  CSRF_TOKEN_REQUIRED = 'CSRF_TOKEN_REQUIRED',
  CSRF_INVALID_TOKEN = 'CSRF_INVALID_TOKEN',
  WRONG_CSRF_TOKEN = 'WRONG_CSRF_TOKEN',

  // Authorization Errors
  USER_BLOCKED = 'USER_BLOCKED',
  USER_DELETED = 'USER_DELETED',
  ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE',
  NOT_ALLOWED = 'NOT_ALLOWED',

  // Application Status
  APPLICATION_STOPPED = 'APPLICATION_STOPPED',
  APPLICATION_MAINTENANCE = 'APPLICATION_MAINTENANCE',
  ANDROID_CRITICAL_UPDATE = 'ANDROID_CRITICAL_UPDATE',
  IOS_CRITICAL_UPDATE = 'IOS_CRITICAL_UPDATE',
}
```

### Error Response Format

```json
{
  "code": "ERROR_CODE",
  "details": "Additional error information"
}
```

---

## 📈 Monitoring & Logging

### Health Checks

```http
GET /health
```

### Logging Levels

- **Error**: Application errors and exceptions
- **Warn**: Warning messages and potential issues
- **Info**: General application information
- **Debug**: Detailed debugging information

### Metrics

- Request/response times
- Authentication success/failure rates
- Token refresh rates
- Cache hit/miss ratios
- Error rates by endpoint

---

## 📞 Support

For support, email mohammedsalah6055@gmail.com.

---

## 🔗 Links

- [NestJS Documentation](https://docs.nestjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Redis Documentation](https://redis.io/documentation)
- [JWT Documentation](https://jwt.io)

---

**Built with ❤️**

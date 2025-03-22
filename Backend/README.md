# User API Documentation

## 1 User Registration Endpoint

### Endpoint

`POST /api/v1/user/register`

### Description

Registers a new user and sends an OTP for email verification.

### Required Data

- **firstname** (string): Required. Must be at least 3 characters long.
- **lastname** (string): Optional. If provided, must be at least 3 characters long.
- **email** (string): Required. Must be a valid email format.
- **password** (string): Required. Must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%\*?&#).
- **phone** (string): Required. Must be a valid phone number.

### Example Request Body

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "Secure@123",
  "phone": "1234567890"
}
```

### Status Codes

- **201 Created**: User registered successfully.
  ```json
  {
    "status": 201,
    "data": {
      "createdUser": {
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com"
        "........."
      },
      "token": "jwt_token"
    },
    "message": "User Registered Successfully"
  }
  ```
- **400 Bad Request**: Validation errors or user already exists
- **500 Internal Server Error**: Server error during registration

---

## 2 Email Verification Endpoint

### Endpoint

`POST /api/v1/user/verify-email`

### Description

Verifies user's email using OTP sent during registration.

### Required Data

- **otp** (string): Required. OTP received in email.

### Authentication

Requires JWT token in Authorization header or cookie:

```
Authorization: Bearer <jwt_token>
```

---

## 3 User Login Endpoint

### Endpoint

`POST /api/v1/user/login`

### Description

Authenticates user and returns access and refresh tokens.

### Required Data

- **email** (string): Required. Registered email address
- **password** (string): Required. Account password

### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "Secure@123"
}
```

### Status Codes

- **200 OK**: Login successful
  ```json
  {
    "status": 200,
    "data": {
      "loggedInUser": {
        /* user details without sensitive information */
      },
      "accessToken": "jwt_token"
    },
    "message": "Logged in successfully"
  }
  ```

---

## 4 Get User Profile Endpoint

### Endpoint

`GET /api/v1/user/profile`

### Description

Retrieves the authenticated user's profile information.

### Authentication

Requires JWT token in Authorization header or cookie:

```
Authorization: Bearer <jwt_token>
```

### Status Codes

- **200 OK**: Profile retrieved successfully
  ```json
  {
    "status": 200,
    "data": {
      /* current user details */
    },
    "message": "User fetched Successfully"
  }
  ```

---

## 5 User Logout Endpoint

### Endpoint

`POST /api/v1/user/logout`

### Description

Logs out user by blacklisting the current token and clearing cookies.

### Authentication

Requires JWT token either in cookies or Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Status Codes

- **200 OK**: Logout successful
  ```json
  {
    "status": 200,
    "data": {},
    "message": "Logged out successfully"
  }
  ```

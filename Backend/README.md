# User Authentication API Documentation

## 1. User Registration Endpoint

### Endpoint

`POST /api/v1/user/register`

### Description

Registers a new user and sends an OTP for email verification. Creates a new user account with the provided information and sends a verification OTP to the user's email.

### Required Data

- **firstname** (string): Required. Must be at least 3 characters long.
- **lastname** (string): Optional. If provided, must be at least 3 characters long.
- **email** (string): Required. Must be a valid email format. Must be unique.
- **password** (string): Required. Must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%\*?&#).
- **phone** (string): Required. Must be a valid phone number. Must be unique.

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

### Success Response

- **201 Created**

```json
{
  "status": 201,
  "data": {
    "createdUser": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "isVerified": false
    }
  },
  "message": "User Registered Successfully"
}
```

---

## 2. Email Verification Endpoint

### Endpoint

`POST /api/v1/user/verify-email`

### Description

Verifies user's email using OTP sent during registration or resend-OTP request.

### Authentication

Requires JWT token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Required Data

- **otp** (number): Required. OTP received in email.

### Example Request Body

```json
{
  "otp": "123456"
}
```

### Success Response

- **200 OK**

```json
{
  "status": 200,
  "data": {},
  "message": "Your email has been successfully verified"
}
```

---

## 3. Resend OTP Endpoint

### Endpoint

`POST /api/v1/user/resend-otp`

### Description

Resends verification OTP to user's email if not already verified.

### Required Data

- **email** (string): Required. Registered email address.

### Example Request Body

```json
{
  "email": "john.doe@example.com"
}
```

### Success Response

- **200 OK**

```json
{
  "status": 200,
  "data": {},
  "message": "New otp has been sent"
}
```

---

## 4. User Login Endpoint

### Endpoint

`POST /api/v1/user/login`

### Description

Authenticates user and returns access and refresh tokens. Sets tokens in HTTP-only cookies.

### Required Data

- **email** (string): Required. Registered email address.
- **password** (string): Required. Account password.

### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "Secure@123"
}
```

### Success Response

- **200 OK**

```json
{
  "status": 200,
  "data": {
    "loggedInUser": {
      /* user details excluding sensitive information */
    }
  },
  "message": "Logged in successfully"
}
```

---

## 5. Get User Profile Endpoint

### Endpoint

`GET /api/v1/user/profile`

### Description

Retrieves the authenticated user's profile information.

### Authentication

Requires JWT token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Success Response

- **200 OK**

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

## 6. User Logout Endpoint

### Endpoint

`POST /api/v1/user/logout`

### Description

Logs out user by blacklisting the current token and clearing authentication cookies.

### Authentication

Requires JWT token in Authorization header or cookies:

```
Authorization: Bearer <jwt_token>
```

### Success Response

- **200 OK**

```json
{
  "status": 200,
  "data": {},
  "message": "Logged out successfully"
}
```

---

## 7 Forgot Password

**Endpoint:** `POST /api/v1/user/forgot-password`

**Description:**  
Initiates the password reset process by generating a reset token and sending it to the user's registered email address.

**Required Data:**

- **email** (string): Required. Email address associated with the account.

**Example Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Success Response:**

- **200 OK**

```json
{
  "status": 200,
  "message": "Password reset instructions sent to your email",
  "data": {}
}
```

---

## 8 Reset Password

**Endpoint:** `POST client_url/reset-password/:resetToken`

**Description:**  
Allows user to set a new password using the reset token received via email.

**URL Parameters:**

- **resetToken** (string): The token received in the reset password email

**Required Data:**

- **password** (string): Required. New password that meets the following criteria:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (@$!%\*?&#)

**Example Request Body:**

```json
{
  "password": "NewSecure@123"
}
```

**Success Response:**

- **200 OK**

```json
{
  "status": 200,
  "message": "Password has been reset successfully",
  "data": {}
}
```

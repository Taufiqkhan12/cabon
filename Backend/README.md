# 1 User Registration Endpoint

## Endpoint

`POST /api/v1/user/register`

## Description

This endpoint registers a new user. It validates the provided data for required fields and proper format before creating the user in the database. On successful registration, the endpoint returns the created user (without password) and an authentication token.

## Required Data

- **firstname** (string): Required. Must be at least 3 characters long.
- **lastname** (string): Optional. If provided, must be at least 3 characters long.
- **email** (string): Required. Must be a valid email format.
- **password** (string): Required. Must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%\*?&#).

## Example Request Body

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "Secure@123"
}
```

## Status Codes

- **201 Created**: User registered successfully.
- **Response Example:**
  ```json
  {
    "status": 201,
    "data": {
      "createdUser": {
        /* user details without password */
      },
      "token": "jwt_token"
    },
    "message": "User Registered Successfully"
  }
  ```
- **400 Bad Request**: Validation error or when required fields are missing.
- Examples: Missing `firstname`, `email`, or invalid password format.
- Response contains an error message explaining the issue.

- **500 Internal Server Error**: Error during user registration due to server issues.
- Example: Unexpected error creating the user.

## 2 User Login Endpoint

**Endpoint:** `POST /api/v1/user/login`

**Required Data:**

- **email** (string): Required. Must be a valid email format.
- **password** (string): Required.

**Example Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "Secure@123"
}
```

**Status Codes:**

- **200 OK:**  
  Login successful.  
  **Response Example:**
  ```json
  {
    "status": 200,
    "data": {
      "userExist": {
        /* user details */
      },
      "token": "jwt_token"
    },
    "message": "Logged in sucessfully"
  }
  ```
- **400 Bad Request:**  
  When required fields are missing.
- **401 Unauthorized:**  
  When the email or password is incorrect.
- **500 Internal Server Error:**  
  Error during user login due to server issues.

---

# Additional Information

- Email addresses are normalized to lowercase before storing.
- Passwords are securely hashed before being saved in the database.
- The authentication token returned is a JWT and should be used for subsequent requests that require user authentication.

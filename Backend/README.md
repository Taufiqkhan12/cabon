# 1 User Registration Endpoint

## Endpoint

`POST /api/v1/user/register`

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

---

# 2 User Login Endpoint

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

# 3 Get User Profile Endpoint

**Endpoint:** `GET /api/v1/user/profile`

**Authentication:**  
Requires JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

**Status Codes:**

- **200 OK:**  
  Profile fetched successfully.  
  **Response Example:**
  ```json
  {
    "status": 200,
    "data": {
      /* current user details */
    },
    "message": "Current user fetched Successfully"
  }
  ```

---

# 4. User Logout Endpoint

**Endpoint:** `POST /api/v1/user/logout`

**Authentication:**  
Requires JWT token either in cookies or Authorization header:

```
Authorization: Bearer <jwt_token>
```

**Status Codes:**

- **200 OK:**  
  Logout successful.  
  **Response Example:**
  ```json
  {
    "status": 200,
    "data": {},
    "message": "Logged out successfully"
  }
  ```

**Notes:**

- The token is blacklisted to prevent reuse
- Authentication cookie is cleared upon successful logout

# User Authentication API Documentation

## 1. User Registration Endpoint

### Endpoint

`POST /api/v1/user/register`

### Description

Registers a new user and sends an OTP for email verification. Creates a new user account with the provided information and sends a verification OTP to the user's email.

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

## 3. Resend OTP Endpoint

### Endpoint

`POST /api/v1/user/resend-otp`

### Description

Resends verification OTP to user's email if not already verified.

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

## 4. User Login Endpoint

### Endpoint

`POST /api/v1/user/login`

### Description

Authenticates user and returns access and refresh tokens. Sets tokens in HTTP-only cookies.

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

## 7 Forgot Password

**Endpoint:** `POST /api/v1/user/forgot-password`

**Description:**  
Initiates the password reset process by generating a reset token and sending it to the user's registered email address.

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

## 8 Reset Password

**Endpoint:** `POST client_url/reset-password/:resetToken`

**Description:**  
Allows user to set a new password using the reset token received via email.

**URL Parameters:**

- **resetToken** (string): The token received in the reset password email

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

## 9 Refresh Token

**Endpoint:** `POST /user/refresh-token`

**Description:**  
Allows user to refresh token received .

**Success Response:**

- **200 OK**

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Access token refreshed",
  "success": true
}
```

---

# Captain Authentication API Documentation

## 1. Captain Registration Endpoint

### Endpoint

`POST /api/v1/captain/register`

### Description

Registers a new captain with vehicle details and sends an OTP for email verification.

### Example Request Body

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "password": "Secure@123",
  "color": "Black",
  "plate": "ABC-123",
  "capacity": 4,
  "type": "car"
}
```

### Success Response

- **201 Created**

```json
{
  "status": 201,
  "data": {
    "createdCaptain": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "vehicle": {
        "color": "Black",
        "plate": "ABC-123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "status": "inactive",
      "isVerified": false
    }
  },
  "message": "Captain Registered Successfully"
}
```

## 2. Captain Login Endpoint

### Endpoint

`POST /api/v1/captain/login`

### Description

Authenticates a captain and provides access tokens.

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
    "loggedInCaptain": {
      /* captain details excluding sensitive information */
    }
  },
  "message": "Logged in successfully"
}
```

## 3. Captain Profile Endpoint

### Endpoint

`GET /api/v1/captain/profile`

### Description

Retrieves the authenticated captain's profile information.

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
    /* captain profile details */
  },
  "message": "Captain fetched Successfully"
}
```

## 4. Email Verification Endpoint

### Endpoint

`POST /api/v1/captain/verify-email`

### Example Request Body

```json
{
  "otp": "123456"
}
```

### Authentication

Requires JWT token

### Success Response

- **200 OK**

```json
{
  "status": 200,
  "data": {},
  "message": "Your email has been successfully verified"
}
```

## 5. Resend OTP Endpoint

### Endpoint

`POST /api/v1/captain/resend-otp`

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

## 6. Logout Endpoint

### Endpoint

`POST /api/v1/captain/logout`

### Authentication

Requires JWT token

### Success Response

- **200 OK**

```json
{
  "status": 200,
  "data": {},
  "message": "Logged out successfully"
}
```

## 7 Forgot Password

`POST /api/v1/captain/forgot-password`

### Example Request Body

```json
{
  "email": "john.doe@example.com"
}
```

#### Success Response

- **200 OK**

```json
{
  "status": 200,
  "data": {},
  "message": "Password reset request mail sent"
}
```

## 8 Reset Password

`POST /api/v1/captain/reset-password/:resetToken`

#### Required Data

- **password** (string): New password meeting security requirements
- **resetToken** (string): Token received via email (as URL parameter)

#### Success Response

- **200 OK**

```json
{
  "status": 200,
  "data": {},
  "message": "Password reset successful"
}
```

# Maps API Documentation

## 1. Get Coordinates

### Endpoint

`GET /api/v1/maps/get-coordinates?address=<address>`

### Description

Returns the latitude and longitude for a given address.

### Authentication

Requires JWT token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Query Parameters

- **address** (string, required): The address to geocode (minimum 3 characters).

### Success Response

- **200 OK**

```json
{
  "status": 200,
  "data": {
    "coordinates": {
      "lat": 28.6139,
      "lng": 77.209
    }
  },
  "message": "Coordinates fetched successfully"
}
```

---

## 2. Get Distance and Time

### Endpoint

`GET /api/v1/maps/get-distance-time?origin=<origin>&destination=<destination>`

### Description

Returns the distance and estimated travel time between two addresses.

### Authentication

Requires JWT token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Query Parameters

- **origin** (string, required): The starting address (minimum 3 characters).
- **destination** (string, required): The destination address (minimum 3 characters).

### Success Response

- **200 OK**

```json
{
  "status": 200,
  "data": {
    "distance": {
      "text": "12.3 km",
      "value": 12345
    },
    "duration": {
      "text": "25 mins",
      "value": 1500
    }
  },
  "message": "Distance and Time fetched successfully"
}
```

---

## 3. Get Address Suggestions

### Endpoint

`GET /api/v1/maps/get-suggestions?address=<address>`

### Description

Returns autocomplete suggestions for a partial address.

### Authentication

Requires JWT token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Query Parameters

- **address** (string, required): The partial address to get suggestions for (minimum 3 characters).

### Success Response

- **200 OK**

```json
{
  "status": 200,
  "data": {
    "suggestion": [
      {
        "description": "123 Main St, Springfield, USA",
        "place_id": "ChIJN1t_tDeuEmsRUsoyG83frY4"
      },
      ...
    ]
  },
  "message": "Suggestions fetched successfully"
}
```

# Ride API Documentation

## 1. Create Ride

### Endpoint

`POST /api/v1/ride/create`

### Description

Creates a new ride request for a user and notifies nearby captains.

### Authentication

Requires JWT token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Request Body

- **pickup** (string, required): Pickup address.
- **destination** (string, required): Destination address.
- **vehicletype** (string, required): Type of vehicle ("car", "auto", or "bike").

#### Example

```json
{
  "pickup": "123 Main St, City",
  "destination": "456 Park Ave, City",
  "vehicletype": "car"
}
```

### Success Response

- **201 Created**

```json
{
  "status": 201,
  "data": {
    "ride": {
      "_id": "rideId",
      "user": "userId",
      "pickup": "123 Main St, City",
      "destination": "456 Park Ave, City",
      "fare": 340,
      "vehicletype": "car",
      "status": "pending"
    }
  },
  "message": "Ride created sucessfully"
}
```

---

## 2. Get Ride Fare

### Endpoint

`GET /api/v1/ride/get-fare?pickup=<pickup>&destination=<destination>`

### Description

Calculates and returns the fare for a ride between two locations for all vehicle types.

### Authentication

Requires JWT token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Query Parameters

- **pickup** (string, required): Pickup address.
- **destination** (string, required): Destination address.

### Success Response

- **200 OK**

```json
{
  "status": 200,
  "data": {
    "fare": {
      "car": 340,
      "auto": 280,
      "bike": 190
    }
  },
  "message": "Fare fetched successfully"
}
```

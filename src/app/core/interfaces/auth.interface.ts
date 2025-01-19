export interface SignUpRequest {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role?: string;
  mobile?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: {
    jwt: string;
    message: string;
  };
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  mobile: string;
  createdAt: string;
}

export interface UserProfileResponse {
  data: UserProfile;
} 
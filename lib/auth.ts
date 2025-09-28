export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: "customer" | "admin"
  avatar?: string
  createdAt: string
  lastLogin?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock user database - in production this would be a real database
const MOCK_USERS: User[] = [
  {
    id: "admin-1",
    email: "admin@quynhoanh.com",
    name: "Quản trị viên",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "customer-1",
    email: "customer@example.com",
    name: "Nguyễn Văn An",
    phone: "+84 123 456 789",
    role: "customer",
    createdAt: "2024-01-15T00:00:00Z",
    lastLogin: new Date().toISOString(),
  },
]

export class AuthService {
  private static readonly STORAGE_KEY = "quynh-oanh-auth"
  private static readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

  static async login(email: string, password: string): Promise<{ user: User; token: string } | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in production this would validate against a real database
    const user = MOCK_USERS.find((u) => u.email === email)

    if (!user) {
      throw new Error("Email không tồn tại trong hệ thống")
    }

    // Mock password validation (in production, use proper password hashing)
    const validPasswords: Record<string, string> = {
      "admin@quynhoanh.com": "admin123",
      "customer@example.com": "customer123",
    }

    if (validPasswords[email] !== password) {
      throw new Error("Mật khẩu không chính xác")
    }

    const token = this.generateToken(user.id)
    const updatedUser = { ...user, lastLogin: new Date().toISOString() }

    // Store session
    this.setSession(updatedUser, token)

    return { user: updatedUser, token }
  }

  static async register(userData: {
    email: string
    password: string
    name: string
    phone?: string
  }): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    if (MOCK_USERS.find((u) => u.email === userData.email)) {
      throw new Error("Email đã được sử dụng")
    }

    // Create new user
    const newUser: User = {
      id: `customer-${Date.now()}`,
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      role: "customer",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }

    // In production, this would be saved to database
    MOCK_USERS.push(newUser)

    const token = this.generateToken(newUser.id)
    this.setSession(newUser, token)

    return { user: newUser, token }
  }

  static logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.STORAGE_KEY)
    }
  }

  static getCurrentUser(): User | null {
    if (typeof window === "undefined") return null

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return null

      const { user, token, expiresAt } = JSON.parse(stored)

      // Check if session is expired
      if (Date.now() > expiresAt) {
        this.logout()
        return null
      }

      return user
    } catch {
      return null
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  static hasRole(role: "customer" | "admin"): boolean {
    const user = this.getCurrentUser()
    return user?.role === role
  }

  private static generateToken(userId: string): string {
    // In production, use proper JWT or similar
    return btoa(`${userId}:${Date.now()}:${Math.random()}`)
  }

  private static setSession(user: User, token: string): void {
    if (typeof window === "undefined") return

    const session = {
      user,
      token,
      expiresAt: Date.now() + this.SESSION_DURATION,
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session))
  }

  static async updateProfile(updates: Partial<Pick<User, "name" | "phone">>): Promise<User> {
    const currentUser = this.getCurrentUser()
    if (!currentUser) {
      throw new Error("Người dùng chưa đăng nhập")
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedUser = { ...currentUser, ...updates }

    // Update in mock database
    const userIndex = MOCK_USERS.findIndex((u) => u.id === currentUser.id)
    if (userIndex !== -1) {
      MOCK_USERS[userIndex] = updatedUser
    }

    // Update session
    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (stored) {
      const session = JSON.parse(stored)
      session.user = updatedUser
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session))
    }

    return updatedUser
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const currentUser = this.getCurrentUser()
    if (!currentUser) {
      throw new Error("Người dùng chưa đăng nhập")
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In production, validate current password and update with proper hashing
    // For now, just simulate success
    if (currentPassword.length < 6 || newPassword.length < 6) {
      throw new Error("Mật khẩu phải có ít nhất 6 ký tự")
    }
  }
}

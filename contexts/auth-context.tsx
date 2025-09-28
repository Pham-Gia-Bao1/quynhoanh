"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, type AuthState, AuthService } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    email: string
    password: string
    name: string
    phone?: string
  }) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<Pick<User, "name" | "phone">>) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for existing session on mount
    const user = AuthService.getCurrentUser()
    setState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    })
  }, [])

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const result = await AuthService.login(email, password)
      if (result) {
        setState({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
        })
      }
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const register = async (userData: {
    email: string
    password: string
    name: string
    phone?: string
  }) => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const result = await AuthService.register(userData)
      setState({
        user: result.user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const logout = () => {
    AuthService.logout()
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const updateProfile = async (updates: Partial<Pick<User, "name" | "phone">>) => {
    try {
      const updatedUser = await AuthService.updateProfile(updates)
      setState((prev) => ({
        ...prev,
        user: updatedUser,
      }))
    } catch (error) {
      throw error
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await AuthService.changePassword(currentPassword, newPassword)
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

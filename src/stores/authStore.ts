import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebase';

// TypeScript interfaces for type safety
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  clearError: () => void;
  updateUser: (userData: Partial<User>) => void;
  initializeAuth: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Combined type for the store
type AuthStore = AuthState & AuthActions;

// Convert Firebase user to our User interface
const convertFirebaseUser = (firebaseUser: FirebaseUser): User => {
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || 'User',
    email: firebaseUser.email || '',
    role: 'user',
    avatar: firebaseUser.photoURL || undefined,
    createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
  };
};

// Create the Zustand store with persistence
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Initialize auth state listener
      initializeAuth: () => {
        console.log('Initializing auth state listener...');
        onAuthStateChanged(auth, (firebaseUser) => {
          console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'User logged out');
          if (firebaseUser) {
            const user = convertFirebaseUser(firebaseUser);
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            console.log('User authenticated:', user);
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
            console.log('User logged out');
          }
        });
      },

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        console.log('Attempting login...');
        
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log('Login successful:', userCredential.user.email);
          
          // Convert and set user immediately
          const user = convertFirebaseUser(userCredential.user);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          console.log('User state updated after login');
        } catch (error: any) {
          console.error('Login error:', error);
          let errorMessage = 'Login failed';
          
          switch (error.code) {
            case 'auth/user-not-found':
              errorMessage = 'No account found with this email';
              break;
            case 'auth/wrong-password':
              errorMessage = 'Incorrect password';
              break;
            case 'auth/invalid-email':
              errorMessage = 'Invalid email address';
              break;
            case 'auth/too-many-requests':
              errorMessage = 'Too many failed attempts. Please try again later';
              break;
            default:
              errorMessage = error.message || 'Login failed';
          }
          
          set({
            isLoading: false,
            error: errorMessage,
          });
          throw error; // Re-throw to be caught by the component
        }
      },

      logout: async () => {
        set({ isLoading: true });
        console.log('Attempting logout...');
        
        try {
          await signOut(auth);
          console.log('Logout successful');
          // User state will be updated by onAuthStateChanged
        } catch (error: any) {
          console.error('Logout error:', error);
          set({
            isLoading: false,
            error: 'Logout failed',
          });
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });
        console.log('Attempting registration...');
        
        try {
          if (userData.password !== userData.confirmPassword) {
            throw new Error('Passwords do not match');
          }

          // Create user with Firebase
          const userCredential = await createUserWithEmailAndPassword(
            auth, 
            userData.email, 
            userData.password
          );

          // Update profile with display name
          await updateProfile(userCredential.user, {
            displayName: userData.name
          });

          console.log('Registration successful:', userCredential.user.email);
          
          // Convert and set user immediately
          const user = convertFirebaseUser(userCredential.user);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          console.log('User state updated after registration');
        } catch (error: any) {
          console.error('Registration error:', error);
          let errorMessage = 'Registration failed';
          
          switch (error.code) {
            case 'auth/email-already-in-use':
              errorMessage = 'An account with this email already exists';
              break;
            case 'auth/invalid-email':
              errorMessage = 'Invalid email address';
              break;
            case 'auth/weak-password':
              errorMessage = 'Password should be at least 6 characters';
              break;
            default:
              errorMessage = error.message || 'Registration failed';
          }
          
          set({
            isLoading: false,
            error: errorMessage,
          });
          throw error; // Re-throw to be caught by the component
        }
      },

      clearError: () => {
        set({ error: null });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selector hooks for better performance
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error); 
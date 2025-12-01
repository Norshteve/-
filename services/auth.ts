
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from "firebase/auth";
import { auth } from "../firebase";
import { User, UserRole } from '../types';

const STORAGE_KEY = 'current_user';

// HARDCODED ADMIN EMAIL
const ADMIN_EMAIL = 'rimx_1984@hotmail.com';

// Convert Firebase User to App User
const mapFirebaseUser = (fbUser: FirebaseUser): User => {
  const isAdmin = fbUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  return {
    id: fbUser.uid,
    name: fbUser.displayName || fbUser.email?.split('@')[0] || 'مستخدم',
    email: fbUser.email || '',
    role: isAdmin ? UserRole.ADMIN : UserRole.USER
  };
};

export const AuthService = {
  // Login with Firebase (WITH MOCK FALLBACK)
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    
    // --- MOCK LOGIN BYPASS FOR ADMIN ---
    // This allows login even if Firebase keys are invalid
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === 'admin') {
      const mockAdmin: User = {
        id: 'admin_mock_id',
        name: 'Admin',
        email: ADMIN_EMAIL,
        role: UserRole.ADMIN
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAdmin));
      return { success: true, user: mockAdmin };
    }
    // ----------------------------------

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const appUser = mapFirebaseUser(userCredential.user);
      
      // Cache user locally for synchronous access in UI components
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appUser));
      
      return { success: true, user: appUser };
    } catch (error: any) {
      console.error("Firebase Login Error:", error);
      let errorMessage = 'فشل تسجيل الدخول';
      
      if (error.code === 'auth/user-not-found') errorMessage = 'البريد الإلكتروني غير مسجل';
      if (error.code === 'auth/wrong-password') errorMessage = 'كلمة المرور غير صحيحة';
      if (error.code === 'auth/invalid-email') errorMessage = 'صيغة البريد الإلكتروني خاطئة';
      if (error.code === 'auth/too-many-requests') errorMessage = 'تم تعطيل الحساب مؤقتاً بسبب كثرة المحاولات';
      if (error.code === 'auth/api-key-not-valid') errorMessage = 'مفتاح Firebase غير صالح (تم تفعيل الدخول الوهمي للأدمن فقط)';

      return { success: false, error: errorMessage };
    }
  },

  // Logout
  logout: async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Firebase signout failed (likely mock user)", e);
    }
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = '/login';
  },

  // Get Current User (Sync - from LocalStorage cache)
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Sync Auth State Listener (Call this in App.tsx setup)
  initAuthListener: (callback: (user: User | null) => void) => {
    onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const appUser = mapFirebaseUser(fbUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appUser));
        callback(appUser);
      } else {
        // Do not clear if it's a mock session
        // localStorage.removeItem(STORAGE_KEY);
        // callback(null);
      }
    });
  },

  isAdmin: (): boolean => {
    const user = AuthService.getCurrentUser();
    return user?.role === UserRole.ADMIN;
  }
};

import { Injectable, signal } from '@angular/core';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, User, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, TwitterAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth: Auth = getAuth();
  user = signal<User | null>(null);
  error = signal<string | null>(null);
  private db = getFirestore();
  private adminEmails: string[] = ['salma447105@gmail.com', 'norhan.ali2800@gmail.com', 'noraali5800@gmail.com', 'marsy2126@gmail.com', 'nadeenmoubarak671@gmail.com', 'norhan25gamal@gmail.com'];
  private role: string = 'user';

  constructor() {
    // watch auth state
    onAuthStateChanged(this.auth, async user => {
      console.log(user, "onAuthStateChanged");

      if (user) {
        const userRef = doc(this.db, 'users', user.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.data();
          (user as any).role = userData['role'];
          this.user.set(user);
          console.log(user);

        }
        else {
          this.user.set(null);
        }
      }
    });
  }

  getCurrentUser(): Promise<User | null> {
    return new Promise(resolve => onAuthStateChanged(this.auth, user => resolve(user)));
  }

  mapError(errCode: string) : string {
    switch (errCode) {
      case 'auth/email-already-in-use': return 'This email is already registered.';
      case 'auth/invalid-email': return 'Invalid email address.';
      case 'auth/invalid-credential': return 'Invalid email or password.';
      case 'auth/popup-closed-by-user': return 'Sign-in was cancelled. Please try again.';
      default: return 'Authentication error. Please try again.';
    }
  }

  async signUp(email: string, password: string, fullName: string) {
    try {
      const res = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log(res, "service sign-up");

      await updateProfile(res.user, { displayName: fullName });
      this.user.set(res.user);

      if (res.user.email) {
        const isAdmin = this.adminEmails.includes(res.user.email);
        if (isAdmin) this.role = 'admin';
      }

      await setDoc(doc(this.db, 'users', res.user.uid), {
        uid: res.user.uid,
        fullName,
        email: res.user.email,
        role: this.role,
        provider: 'password'
      });

      return res;
    }
    catch (err: any) {
      console.log(err, "service sign-up")
      this.error.set(this.mapError(err.code));
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      const res = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(res, "success login");
      this.user.set(res.user);
      return res;
    }
    catch (err: any) {
      console.log(err, "service login");
      this.error.set(this.mapError(err.code));
      return null;
    }
  }

  async loginOrSignUpGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(this.auth, provider);
      this.user.set(res.user);

      const docRef = doc(this.db, 'users', res.user.uid);
      const snapshot = await getDoc(docRef);
      console.log(docRef);
      console.log(snapshot);

      if (res.user.email) {
        const isAdmin = this.adminEmails.includes(res.user.email);
        if (isAdmin) this.role = 'admin';
      }

      if (!snapshot.exists()) {
        await setDoc(docRef, {
          uid: res.user.uid,
          fullName: res.user.displayName || 'No name',
          email: res.user.email,
          role: this.role,
          provider: 'google'
        });
      }

      return res;
    }
    catch (err: any) {
      console.log(err, "service google login/signup")
      this.error.set(this.mapError(err.code));
      return null;
    }
  }

  async loginOrSignUpFB() {
    try {
      const provider = new FacebookAuthProvider();
      const res = await signInWithPopup(this.auth, provider);
      this.user.set(res.user);

      const docRef = doc(this.db, 'users', res.user.uid);
      const snapshot = await getDoc(docRef);
      console.log(docRef);
      console.log(snapshot);

      if (res.user.email) {
        const isAdmin = this.adminEmails.includes(res.user.email);
        if (isAdmin) this.role = 'admin';
      }


      if (!snapshot.exists()) {
        await setDoc(docRef, {
          uid: res.user.uid,
          fullName: res.user.displayName || 'No name',
          email: res.user.email,
          role: this.role,
          provider: 'facebook'
        });
      }

      return res;
    }
    catch (err: any) {
      console.log(err, "service facebook login/signup")
      this.error.set(this.mapError(err.code));
      return null;
    }
  }

  async loginOrSignUpTwitter() {
    try {
      const provider = new TwitterAuthProvider();
      const res = await signInWithPopup(this.auth, provider);
      this.user.set(res.user);

      const docRef = doc(this.db, 'users', res.user.uid);
      const snapshot = await getDoc(docRef);
      console.log(docRef);
      console.log(snapshot);

      if (res.user.email) {
        const isAdmin = this.adminEmails.includes(res.user.email);
        if (isAdmin) this.role = 'admin';
      }

      if (!snapshot.exists()) {
        await setDoc(docRef, {
          uid: res.user.uid,
          fullName: res.user.displayName || 'No name',
          email: res.user.email || 'No email',
          role: this.role,
          provider: 'facebook'
        });
      }

      return res.user;
    }
    catch (err: any) {
      console.error('Twitter login error', err.code, err.message);
      this.error.set(this.mapError(err.code));
      return null;
    }
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return true;
    }
    catch (err: any) {
      this.error.set(this.mapError(err.code));
      return false;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      return true;
    }
    catch (err: any) {
      console.error('Logout error', err.code, err.message);
      this.error.set(this.mapError(err.code));
      return false;
    }
  }

}

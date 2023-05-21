import * as admin from 'firebase-admin';

interface Config {
  credential: {
    privateKey: string;
    clientEmail: string;
    projectId: string;
  };
}

export default class FirebaseAdmin {
  private static instance: FirebaseAdmin;

  private init = false;

  public static getInstance(): FirebaseAdmin {
    if (FirebaseAdmin.instance === undefined || FirebaseAdmin.instance === null) {
      // 초기화 진행
      FirebaseAdmin.instance = new FirebaseAdmin();
      FirebaseAdmin.instance.start();
    }

    return FirebaseAdmin.instance;
  }

  private start(): void {
    const havaApp = admin.apps.length !== 0;
    if (havaApp) {
      this.init = true;
      return;
    }

    const config: Config = {
      credential: {
        projectId: process.env.projectId || '',
        clientEmail: process.env.clientEmail || '',
        privateKey: (process.env.privateKey || '').replace(/\\n/g, '\n'),
      },
    };

    admin.initializeApp({ credential: admin.credential.cert(config.credential) });
    console.log('start firebase admin');
  }

  /** Firestore 리턴 */
  public get Firestore(): FirebaseFirestore.Firestore {
    if (this.init === false) {
      this.start();
    }

    return admin.firestore();
  }

  /** Auth 리턴 */
  public get Auth(): admin.auth.Auth {
    if (this.init === false) {
      this.start();
    }

    return admin.auth();
  }
}

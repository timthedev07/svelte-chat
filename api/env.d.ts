declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
      DB_CONN_STRING: string;
    }
  }
}

export {}

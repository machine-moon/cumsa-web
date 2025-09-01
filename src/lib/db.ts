export type DbConfig = {
  url: string;
};

export class DB {
  constructor(private config: DbConfig) {}

  async health(): Promise<{ ok: boolean }> {
    return { ok: true };
  }
}

export function getDbConfigFromEnv(): DbConfig | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return { url };
}

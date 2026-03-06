export type AppConfig = {
  canisterId: string;
  host: string;
  ii_derivation_origin?: string;
};

let configCache: AppConfig | null = null;

export async function loadConfig(): Promise<AppConfig> {
  if (configCache) return configCache;
  configCache = {
    canisterId: "",
    host: "https://icp-api.io",
    ii_derivation_origin: undefined,
  };
  return configCache;
}

export async function createActorWithConfig(options?: { agentOptions?: { identity?: unknown } }) {
  return {
    submitInquiry: async (name: string, phone: string, message: string, timestamp: bigint) => {
      console.log("Inquiry submitted:", { name, phone, message, timestamp });
      return Promise.resolve();
    },
  };
}

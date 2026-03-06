export interface backendInterface {
  submitInquiry: (
    name: string,
    phone: string,
    message: string,
    timestamp: bigint,
  ) => Promise<void>;
}

// Stub file - no backend generated for frontend-only mode

export interface backendInterface {
  _initializeAccessControlWithSecret: (token: string) => Promise<void>;
}

export interface CreateActorOptions {
  agentOptions?: Record<string, unknown>;
  agent?: unknown;
  processError?: (e: unknown) => never;
}

export class ExternalBlob {
  url: string;
  contentType: string;
  onProgress?: (progress: number) => void;

  constructor(url: string, contentType = "application/octet-stream") {
    this.url = url;
    this.contentType = contentType;
  }

  async getBytes(): Promise<Uint8Array> {
    const res = await fetch(this.url);
    return new Uint8Array(await res.arrayBuffer());
  }

  static fromURL(url: string): ExternalBlob {
    return new ExternalBlob(url);
  }
}

export async function createActor(
  _canisterId: string,
  _uploadFile?: (file: ExternalBlob) => Promise<Uint8Array>,
  _downloadFile?: (bytes: Uint8Array) => Promise<ExternalBlob>,
  _options?: CreateActorOptions
): Promise<backendInterface> {
  return {
    _initializeAccessControlWithSecret: async () => {},
  };
}

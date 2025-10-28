export interface VersionInfo {
  url: string;
  version: string;
}

export interface PlatformData {
  [platform: string]: VersionInfo;
}

export interface OSData {
  [os: string]: {
    [platform: string]: VersionInfo;
  };
}

export interface VersionHistoryEntry {
  version: string;
  date: string;
  platforms: {
    [platform: string]: string;
  };
}

export interface VersionHistory {
  versions: VersionHistoryEntry[];
}

export type PlatformType =
  | 'darwin-universal'
  | 'darwin-x64'
  | 'darwin-arm64'
  | 'win32-x64-system'
  | 'win32-arm64-system'
  | 'win32-x64-user'
  | 'win32-arm64-user'
  | 'win32-x64'
  | 'win32-arm64'
  | 'linux-x64'
  | 'linux-arm64';

export interface FilterOptions {
  query: string;
  platform: string;
  sortBy: 'version' | 'date';
  sortOrder: 'asc' | 'desc';
}

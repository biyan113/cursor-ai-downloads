import type { VersionHistoryEntry } from '../types';
import { Monitor, Apple, Terminal, Rocket } from 'lucide-react';

interface Props {
  version: VersionHistoryEntry;
  searchQuery?: string;
}

export default function VersionCard({ version, searchQuery = '' }: Props) {
  function getPlatformName(platform: string): string {
    const names: Record<string, string> = {
      'win32-x64-user': 'Windows x64 (User)',
      'win32-arm64-user': 'Windows ARM64 (User)',
      'win32-x64-system': 'Windows x64 (System)',
      'win32-arm64-system': 'Windows ARM64 (System)',
      'win32-x64': 'Windows x64',
      'win32-arm64': 'Windows ARM64',
      'darwin-universal': 'macOS Universal',
      'darwin-x64': 'macOS Intel',
      'darwin-arm64': 'macOS Apple Silicon',
      'linux-x64': 'Linux x64',
      'linux-arm64': 'Linux ARM64'
    };
    return names[platform] || platform;
  }

  function getPlatformIcon(platform: string): React.ReactNode {
    if (platform.includes('win32')) return <Monitor size={16} />;
    if (platform.includes('darwin')) return <Apple size={16} />;
    if (platform.includes('linux')) return <Terminal size={16} />;
    return <Monitor size={16} />;
  }

  function highlightText(text: string, query: string): string {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  return (
    <div className="version-card">
      <div className="version-header">
        <h3 className="version-title">
          <span className="version-icon"><Rocket size={20} /></span>
          <span dangerouslySetInnerHTML={{ __html: highlightText(version.version, searchQuery) }} />
        </h3>
        <div className="version-date">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>{version.date}</span>
        </div>
      </div>

      <div className="platforms-grid">
        {Object.entries(version.platforms).map(([platform, url]) => (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            key={platform}
            className="platform-link"
          >
            <div className="platform-icon">
              {getPlatformIcon(platform)}
            </div>
            <div className="platform-info">
              <div className="platform-name">{getPlatformName(platform)}</div>
              <div className="platform-badge">{platform}</div>
            </div>
            <svg className="download-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </a>
        ))}
      </div>

      <style>{`
        .version-card {
          background: white;
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .version-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transform: translateY(-2px);
        }

        .version-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--color-border);
        }

        .version-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .version-icon {
          font-size: 1.5rem;
        }

        .version-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .platforms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 0.75rem;
        }

        .platform-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
        }

        .platform-link:hover {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .platform-link:hover .platform-badge {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .platform-info {
          flex: 1;
        }

        .platform-name {
          font-weight: 500;
          font-size: 0.875rem;
        }

        .platform-badge {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          margin-top: 0.25rem;
          padding: 0.125rem 0.5rem;
          background-color: #e5e7eb;
          border-radius: 0.25rem;
          display: inline-block;
        }

        .platform-link:hover .platform-badge {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .download-icon {
          color: var(--color-primary);
          transition: color 0.2s;
        }

        .platform-link:hover .download-icon {
          color: white;
        }

        mark {
          background-color: #fef08a;
          padding: 0 0.125rem;
          border-radius: 0.125rem;
        }

        @media (max-width: 768px) {
          .version-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .platforms-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

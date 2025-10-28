import { useState, useEffect, useMemo } from 'react';
import { Search, Loader2, SearchX } from 'lucide-react';
import type { VersionHistory, VersionHistoryEntry, FilterOptions } from '../types';
import VersionCard from './VersionCard';

export default function VersionSearch() {
  const [versions, setVersions] = useState<VersionHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    query: '',
    platform: '',
    sortBy: 'version',
    sortOrder: 'desc'
  });

  useEffect(() => {
    async function loadVersions() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/oslook/cursor-ai-downloads/refs/heads/main/version-history.json');
        if (!response.ok) {
          throw new Error('Failed to load version history');
        }
        const data: VersionHistory = await response.json();
        setVersions(data.versions || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadVersions();
  }, []);

  const filteredAndSortedVersions = useMemo(() => {
    let filtered = versions.filter((version) => {
      const matchesQuery = version.version.toLowerCase().includes(filters.query.toLowerCase());
      const matchesPlatform = !filters.platform || version.platforms[filters.platform];
      return matchesQuery && matchesPlatform;
    });

    filtered.sort((a, b) => {
      if (filters.sortBy === 'version') {
        const compare = a.version.localeCompare(b.version, undefined, { numeric: true });
        return filters.sortOrder === 'asc' ? compare : -compare;
      } else {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        const compare = dateA - dateB;
        return filters.sortOrder === 'asc' ? compare : -compare;
      }
    });

    return filtered;
  }, [versions, filters]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontSize: '1.125rem',
        color: 'var(--color-text-secondary)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid var(--color-border)',
            borderTopColor: 'var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          Loading versions...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '2rem',
        backgroundColor: '#fee2e2',
        border: '1px solid #fca5a5',
        borderRadius: '0.5rem',
        color: '#991b1b',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: '600' }}>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <SearchFilters
        searchQuery={filters.query}
        selectedPlatform={filters.platform}
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
        onFiltersChange={setFilters}
      />

      <div style={{
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '0.5rem',
        border: '1px solid var(--color-border)'
      }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
          Showing <strong style={{ color: 'var(--color-primary)' }}>{filteredAndSortedVersions.length}</strong> of{' '}
          <strong>{versions.length}</strong> versions
          {filters.query && (
            <span> matching "<strong>{filters.query}</strong>"</span>
          )}
          {filters.platform && (
            <span> for <strong>{filters.platform}</strong></span>
          )}
        </p>
      </div>

      {filteredAndSortedVersions.length === 0 ? (
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: '0.75rem',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}><Search /></div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>No versions found</h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Try adjusting your search criteria
          </p>
        </div>
      ) : (
        <div>
          {filteredAndSortedVersions.map((version) => (
            <VersionCard key={version.version} version={version} searchQuery={filters.query} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

interface SearchFiltersProps {
  searchQuery: string;
  selectedPlatform: string;
  sortBy: 'version' | 'date';
  sortOrder: 'asc' | 'desc';
  onFiltersChange: (filters: FilterOptions) => void;
}

function SearchFilters({
  searchQuery,
  selectedPlatform,
  sortBy,
  sortOrder,
  onFiltersChange,
}: SearchFiltersProps) {
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      query: e.target.value,
      platform: selectedPlatform,
      sortBy,
      sortOrder
    });
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      query: searchQuery,
      platform: e.target.value,
      sortBy,
      sortOrder
    });
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      query: searchQuery,
      platform: selectedPlatform,
      sortBy: e.target.value as 'version' | 'date',
      sortOrder
    });
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      query: searchQuery,
      platform: selectedPlatform,
      sortBy,
      sortOrder: e.target.value as 'asc' | 'desc'
    });
  };

  return (
    <div className="filters">
      <div className="search-box">
        <input
          type="text"
          placeholder="搜索版本号..."
          value={searchQuery}
          onChange={handleQueryChange}
          className="search-input"
        />
        <svg className="search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>

      <div className="filter-group">
        <label htmlFor="platform">Platform:</label>
        <select
          id="platform"
          value={selectedPlatform}
          onChange={handlePlatformChange}
          className="select-input"
        >
          <option value="">All Platforms</option>
          <option value="win32-x64">Windows x64</option>
          <option value="win32-arm64">Windows ARM64</option>
          <option value="darwin-universal">macOS Universal</option>
          <option value="darwin-x64">macOS Intel</option>
          <option value="darwin-arm64">macOS Apple Silicon</option>
          <option value="linux-x64">Linux x64</option>
          <option value="linux-arm64">Linux ARM64</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-by">Sort by:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={handleSortByChange}
          className="select-input"
        >
          <option value="version">Version</option>
          <option value="date">Date</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-order">Order:</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="select-input"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      <style>{`
        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          padding: 1.5rem;
          background-color: var(--color-bg-secondary);
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          align-items: flex-end;
        }

        .search-box {
          position: relative;
          flex: 0 1 auto;
          min-width: 200px;
          max-width: 300px;
          display: flex;
          align-items: flex-end;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 2.5rem 0.75rem 1rem;
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: border-color 0.2s;
          height: 42px;
          box-sizing: border-box;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .search-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-secondary);
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .filter-group label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-text-secondary);
        }

        .select-input {
          padding: 0.75rem;
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          font-size: 0.875rem;
          background-color: white;
          cursor: pointer;
          transition: border-color 0.2s;
          min-width: 140px;
          height: 42px;
          box-sizing: border-box;
        }

        .select-input:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
          }

          .search-box {
            min-width: 100%;
          }

          .filter-group {
            width: 100%;
          }

          .select-input {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

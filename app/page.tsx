'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Voter } from '@/hooks/use-voter-search';
import { VotingResults } from '@/components/voter-results';
import { VotingSlip } from '@/components/voting-slip';
import { AlertCircle, Search, Hash, Phone } from 'lucide-react';

export default function HomePage() {
  const [searchMode, setSearchMode] = useState<'name' | 'enrollment'>('name');
  const [voterName, setVoterName] = useState('');
  const [enrollmentField2, setEnrollmentField2] = useState('');
  const [enrollmentField3, setEnrollmentField3] = useState('');
  const [voters, setVoters] = useState<Voter[]>([]);
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const constructEnrollmentId = () => {
    if (!enrollmentField2.trim() || !enrollmentField3.trim()) return '';
    return `MAH_${enrollmentField2.trim()}_${enrollmentField3.trim()}`;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let searchQuery = '';
    if (searchMode === 'name') {
      if (!voterName.trim()) {
        setError('Please enter a voter name');
        return;
      }
      searchQuery = voterName;
    } else {
      const enrollmentId = constructEnrollmentId();
      if (!enrollmentId) {
        setError('Please fill both fields');
        return;
      }
      searchQuery = enrollmentId;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchMode === 'name') {
        params.append('name', searchQuery);
      } else {
        params.append('enrollmentId', searchQuery);
      }

      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setError('No voters found');
        setVoters([]);
      } else if (data.length === 1) {
        setSelectedVoter(data[0]);
        setVoters([]);
      } else {
        setVoters(data);
      }
    } catch (err) {
      setError('Search failed. Try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVoter = (voter: Voter) => {
    setSelectedVoter(voter);
    setVoters([]);
  };

  const handleReset = () => {
    setVoterName('');
    setEnrollmentField2('');
    setEnrollmentField3('');
    setVoters([]);
    setSelectedVoter(null);
    setError('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white py-4 px-4 shadow-lg">
        <div className="text-center">
          <h1 className="text-xl font-bold">Bar Council of Maharashtra & Goa</h1>
          <p className="text-xs opacity-90 font-medium">Elections 2026</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 py-6 gap-6">
        {/* Candidate Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-amber-200">
          <div className="flex gap-3 p-4">
            <div className="flex-shrink-0">
              <div className="relative w-16 h-20 rounded-lg overflow-hidden border-2 border-amber-200">
                <Image
                  src="/madhavi-potdar.jpeg"
                  alt="ADV. Madhavi Bal Potdar"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">
                  109
                </div>
                <span className="text-xs text-foreground/60">Sr. No.</span>
              </div>
              <div>
                <p className="text-xs text-foreground/60 font-medium">Candidate</p>
                <p className="font-bold text-xs text-foreground">Adv. Madhavi Bal Potdar</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60 font-medium">Preference</p>
                <p className="font-bold text-xs text-foreground">#1</p>
              </div>
              <p className="text-xs text-foreground/70 italic line-clamp-2">
                Official Candidate BCMG Elections 2026
              </p>
              <div className="flex gap-2 pt-1">
                <span className="text-xs text-foreground/60">📅 24 Mar 2026</span>
                <a
                  href="tel:+919881001766"
                  className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-md px-2 py-1 text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-5 border border-border">
          <h3 className="font-bold text-foreground mb-4">Find Voting Slip</h3>

          {/* Toggle Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-5 bg-muted p-1 rounded-lg">
            <button
              onClick={() => {
                setSearchMode('name');
                setError('');
              }}
              className={`py-2 px-3 rounded-md font-semibold text-xs transition-all flex items-center justify-center gap-1 ${
                searchMode === 'name'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-foreground'
              }`}
            >
              <Search className="w-3 h-3" />
              By Name
            </button>
            <button
              onClick={() => {
                setSearchMode('enrollment');
                setError('');
              }}
              className={`py-2 px-3 rounded-md font-semibold text-xs transition-all flex items-center justify-center gap-1 ${
                searchMode === 'enrollment'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-foreground'
              }`}
            >
              <Hash className="w-3 h-3" />
              By Enrollment ID
            </button>
          </div>

          {/* Search Inputs */}
          <form onSubmit={handleSearch} className="space-y-4">
            {searchMode === 'name' ? (
              <div>
                <input
                  type="text"
                  value={voterName}
                  onChange={(e) => setVoterName(e.target.value)}
                  placeholder="Enter voter name"
                  autoFocus
                  className="w-full border-2 border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            ) : (
              <div>
                <div className="flex gap-1.5 items-center">
                  <div className="px-3 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-sm">
                    MAH
                  </div>
                  <input
                    type="text"
                    value={enrollmentField2}
                    onChange={(e) =>
                      setEnrollmentField2(e.target.value.replace(/\D/g, '').slice(0, 4))
                    }
                    placeholder="31"
                    maxLength="4"
                    autoFocus
                    className="flex-1 border-2 border-input rounded-lg px-2 py-2 text-center text-sm font-bold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <span className="text-muted-foreground font-bold">_</span>
                  <input
                    type="text"
                    value={enrollmentField3}
                    onChange={(e) =>
                      setEnrollmentField3(e.target.value.replace(/\D/g, '').slice(0, 4))
                    }
                    placeholder="1989"
                    maxLength="4"
                    className="flex-1 border-2 border-input rounded-lg px-2 py-2 text-center text-sm font-bold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Format: MAH_31_1989</p>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span className="text-xs text-red-700">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-bold py-2.5 px-4 rounded-lg transition-colors text-sm"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {/* Modals */}
      {voters.length > 1 && (
        <VotingResults
          voters={voters}
          onSelectVoter={handleSelectVoter}
          onClose={() => setVoters([])}
        />
      )}

      {selectedVoter && (
        <VotingSlip
          voter={selectedVoter}
          isModal={true}
          onClose={() => handleReset()}
        />
      )}
    </main>
  );
}

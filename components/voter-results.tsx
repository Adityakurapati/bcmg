'use client';

import { Voter } from '@/hooks/use-voter-search';

interface VotingResultsProps {
  voters: Voter[];
  onSelectVoter: (voter: Voter) => void;
  onClose: () => void;
}

export function VotingResults({
  voters,
  onSelectVoter,
  onClose,
}: VotingResultsProps) {

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-auto">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Found {voters.length} Records
          </h2>

          <button onClick={onClose} className="text-xl">×</button>
        </div>

        <p className="text-gray-500 mb-4">
          Multiple voters found. Please select one.
        </p>

        <div className="space-y-3">

          {voters.map((voter) => (
            <button
              key={voter.sr_no}
              onClick={() => onSelectVoter(voter)}
              className="w-full border rounded-lg p-4 text-left hover:bg-gray-50"
            >

              <p className="font-semibold">{voter.name}</p>

              <p className="text-sm text-gray-500">
                Serial No: {voter.sr_no}
              </p>

              <p className="text-sm text-gray-500">
                Enrolment: {voter.enrolment_no}
              </p>

              <p className="text-sm text-gray-500">
                {voter.address}
              </p>

              {voter.place_of_voting && (
                <p className="text-sm text-gray-500">
                  Voting Place: {voter.place_of_voting}
                </p>
              )}

            </button>
          ))}

        </div>

      </div>

    </div>
  );
}
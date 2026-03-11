'use client';

import Image from 'next/image';
import { Voter } from '@/hooks/use-voter-search';
import { Download, Share2, X } from 'lucide-react';

interface VotingSlipProps {
  voter: Voter;
  isModal?: boolean;
  onClose?: () => void;
}

export function VotingSlip({ voter, isModal = false, onClose }: VotingSlipProps) {
  const sendWhatsapp = () => {
    const message = `Bar Council Elections 2026\n\nCast Your 1st Preferential Vote\n\nADV. MADHAVI BAL POTDAR\nSerial No: 109\n\nName: ${voter.name}\nSerial No: ${voter.sr_no}\nEnrolment: ${voter.enrolment_no}\n\nVoting Slip: votingslipbcmg.in`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  const slipContent = (
    <div id="voting-slip-print" className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-2xl overflow-hidden border-4 border-amber-200 max-w-sm w-full print:shadow-none print:border-0 print:rounded-none print:bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 text-center">
        <p className="text-xs font-bold tracking-wider opacity-90 mb-0.5">BAR COUNCIL</p>
        <h1 className="text-xs font-bold">Maharashtra & Goa Elections 2026</h1>
      </div>

      {/* Candidate Section */}
      <div className="px-4 py-3 border-b-2 border-amber-200 text-center bg-white">
        <p className="text-amber-600 font-bold text-xs mb-1">CAST YOUR 1ST PREFERENTIAL VOTE FOR</p>
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto font-bold text-2xl mb-2">
          109
        </div>
        <h2 className="text-sm font-bold text-foreground">ADV. Madhavi Bal Potdar</h2>
        <p className="text-xs text-foreground/60 mt-0.5">Committed to the Bar, Justice, and Social Responsibility</p>
      </div>

      {/* Candidate Image */}
      <div className="flex justify-center py-3 bg-white px-3">
        <div className="relative w-20 h-24 rounded-lg overflow-hidden border-2 border-amber-200 shadow-md">
          <Image
            src="/madhavi-potdar.jpeg"
            alt="ADV. Madhavi Bal Potdar"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Voter Details */}
      <div className="px-4 py-3 bg-white space-y-1.5 border-t-2 border-amber-200">
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <div className="bg-amber-50 p-1.5 rounded">
            <p className="text-foreground/60 text-xs font-medium">NAME</p>
            <p className="font-bold text-foreground text-xs">{voter.name}</p>
          </div>
          <div className="bg-amber-50 p-1.5 rounded">
            <p className="text-foreground/60 text-xs font-medium">SERIAL NO.</p>
            <p className="font-bold text-foreground text-xs">{voter.sr_no}</p>
          </div>
        </div>

        <div className="bg-amber-50 p-1.5 rounded">
          <p className="text-foreground/60 text-xs font-medium">ENROLMENT NO.</p>
          <p className="font-bold text-foreground text-xs">{voter.enrollment_no}</p>
        </div>

        {voter.address && (
          <div className="bg-amber-50 p-1.5 rounded">
            <p className="text-foreground/60 text-xs font-medium">ADDRESS</p>
            <p className="text-foreground text-xs line-clamp-2">{voter.address}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white text-center py-2 px-3">
        <p className="text-xs font-bold">votingslipbcmg.in</p>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 overflow-y-auto">
        <div className="relative w-full max-w-sm flex flex-col h-max">
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-white text-foreground rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div id="voting-slip-print" className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-2xl overflow-hidden border-4 border-amber-200 w-full print:shadow-none print:border-0 print:rounded-none print:bg-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 text-center">
              <p className="text-xs font-bold tracking-wider opacity-90 mb-0.5">BAR COUNCIL</p>
              <h1 className="text-xs font-bold">Maharashtra & Goa Elections 2026</h1>
            </div>

            {/* Candidate Section */}
            <div className="px-4 py-3 border-b-2 border-amber-200 text-center bg-white">
              <p className="text-amber-600 font-bold text-xs mb-1">CAST YOUR 1ST PREFERENTIAL VOTE FOR</p>
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto font-bold text-2xl mb-2">
                109
              </div>
              <h2 className="text-sm font-bold text-foreground">ADV. Madhavi Bal Potdar</h2>
              <p className="text-xs text-foreground/60 mt-0.5">Committed to the Bar, Justice, and Social Responsibility</p>
            </div>

            {/* Candidate Image */}
            <div className="flex justify-center py-3 bg-white px-3">
              <div className="relative w-20 h-24 rounded-lg overflow-hidden border-2 border-amber-200 shadow-md">
                <Image
                  src="/madhavi-potdar.jpeg"
                  alt="ADV. Madhavi Bal Potdar"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Voter Details */}
            <div className="px-4 py-3 bg-white space-y-1.5 border-t-2 border-amber-200">
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <div className="bg-amber-50 p-1.5 rounded">
                  <p className="text-foreground/60 text-xs font-medium">NAME</p>
                  <p className="font-bold text-foreground text-xs">{voter.name}</p>
                </div>
                <div className="bg-amber-50 p-1.5 rounded">
                  <p className="text-foreground/60 text-xs font-medium">SERIAL NO.</p>
                  <p className="font-bold text-foreground text-xs">{voter.sr_no}</p>
                </div>
              </div>

              <div className="bg-amber-50 p-1.5 rounded">
                <p className="text-foreground/60 text-xs font-medium">ENROLMENT NO.</p>
                <p className="font-bold text-foreground text-xs">{voter.enrollment_no}</p>
              </div>

              {voter.address && (
                <div className="bg-amber-50 p-1.5 rounded">
                  <p className="text-foreground/60 text-xs font-medium">ADDRESS</p>
                  <p className="text-foreground text-xs line-clamp-2">{voter.address}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white text-center py-2 px-3">
              <p className="text-xs font-bold">votingslipbcmg.in</p>
            </div>
          </div>

          <div className="flex gap-2 mt-3 w-full">
            <button
              onClick={sendWhatsapp}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-lg text-xs"
            >
              <Share2 className="w-3 h-3" />
              Share
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-lg text-xs"
            >
              <Download className="w-3 h-3" />
              Download
            </button>
          </div>
        </div>
      </div>
    );
  }

  return slipContent;
}

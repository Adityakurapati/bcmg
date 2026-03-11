'use client';

import { useRef } from 'react';
import Image from 'next/image';
import * as htmlToImage from 'html-to-image';
import { Voter } from '@/hooks/use-voter-search';
import { Download, Share2, X, MessageCircle } from 'lucide-react';

interface VotingSlipProps {
  voter: Voter;
  isModal?: boolean;
  onClose?: () => void;
}

export function VotingSlip({ voter, isModal = false, onClose }: VotingSlipProps) {

  const slipRef = useRef<HTMLDivElement>(null);

  /* ================= IMAGE GENERATION ================= */

  const generateImage = async () => {
    if (!slipRef.current) return null;

    const dataUrl = await htmlToImage.toPng(slipRef.current, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: "#ffffff"
    });

    return dataUrl;
  };

  /* ================= DOWNLOAD ================= */

  const handleDownload = async () => {
    try {
      const dataUrl = await generateImage();
      if (!dataUrl) return;

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'VotingSlip.png';
      link.click();

    } catch (err) {
      console.error("Download failed", err);
    }
  };

  /* ================= SHARE (IMAGE) ================= */

  const handleShare = async () => {
    try {

      const dataUrl = await generateImage();
      if (!dataUrl) return;

      const blob = await (await fetch(dataUrl)).blob();

      const file = new File([blob], "VotingSlip.png", {
        type: "image/png"
      });

      if (navigator.share && navigator.canShare({ files: [file] })) {

        await navigator.share({
          title: "Voting Slip",
          text: "Find your slip at votingslipbcmg.in",
          files: [file]
        });

      } else {

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "VotingSlip.png";
        link.click();

      }

    } catch (err) {
      console.error("Share failed", err);
    }
  };

  /* ================= WHATSAPP ================= */

  const handleWhatsApp = async () => {
    try {

      const dataUrl = await generateImage();
      if (!dataUrl) return;

      const blob = await (await fetch(dataUrl)).blob();

      const file = new File([blob], "VotingSlip.png", {
        type: "image/png"
      });

      if (navigator.share && navigator.canShare({ files: [file] })) {

        await navigator.share({
          title: "Voting Slip",
          text: `Find your slip at votingslipbcmg.in`,
          files: [file]
        });

      } else {

        const message = `Find your voting slip at votingslipbcmg.in`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");

      }

    } catch (err) {
      console.error("WhatsApp share failed", err);
    }
  };

  /* ================= SLIP UI ================= */

  const slip = (

    <div
      ref={slipRef}
      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-2xl overflow-hidden border-4 border-amber-200 max-w-sm w-full"
    >

      {/* HEADER */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 text-center">
        <p className="text-xs font-bold tracking-wider opacity-90 mb-0.5">
          BAR COUNCIL
        </p>
        <h1 className="text-xs font-bold">
          Maharashtra & Goa Elections 2026
        </h1>
      </div>

      {/* CANDIDATE */}
      <div className="px-4 py-3 border-b-2 border-amber-200 text-center bg-white">

        <p className="text-amber-600 font-bold text-xs mb-1">
          CAST YOUR 1ST PREFERENTIAL VOTE FOR
        </p>

        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto font-bold text-2xl mb-2">
          109
        </div>

        <h2 className="text-sm font-bold">
          ADV. Madhavi Bal Potdar
        </h2>

        <p className="text-xs text-gray-500 mt-0.5">
          Committed to the Bar, Justice & Social Responsibility
        </p>

      </div>

      {/* IMAGE */}
      <div className="flex justify-center py-3 bg-white px-3">

        <div className="relative w-20 h-24 rounded-lg overflow-hidden border-2 border-amber-200 shadow-md">

          <Image
            src="/madhavi-potdar.jpeg"
            alt="Candidate"
            fill
            className="object-cover"
            priority
          />

        </div>

      </div>

      {/* VOTER DETAILS */}
      <div className="px-4 py-3 bg-white space-y-1.5 border-t-2 border-amber-200">

        <div className="grid grid-cols-2 gap-1.5 text-xs">

          <div className="bg-amber-50 p-1.5 rounded">
            <p className="text-gray-500 text-xs font-medium">
              NAME
            </p>
            <p className="font-bold text-xs">
              {voter.name}
            </p>
          </div>

        </div>

        <div className="bg-amber-50 p-1.5 rounded">
          <p className="text-gray-500 text-xs font-medium">
            ENROLMENT NO.
          </p>
          <p className="font-bold text-xs">
            {voter.enrollment_no}
          </p>
        </div>

        {voter.address && (

          <div className="bg-amber-50 p-1.5 rounded">
            <p className="text-gray-500 text-xs font-medium">
              ADDRESS
            </p>
            <p className="text-xs line-clamp-2">
              {voter.address}
            </p>
          </div>

        )}

      </div>

      {/* FOOTER */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white text-center py-2 px-3">

        <p className="text-xs font-bold">
          votingslipbcmg.in
        </p>

      </div>

    </div>
  );

  /* ================= MODAL ================= */

  if (isModal) {

    return (

      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3">

        <div className="relative w-full max-w-sm flex flex-col">

          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>

          {slip}

          {/* ACTION BUTTONS */}

          <div className="flex justify-center gap-8 mt-4">

            <button
              onClick={handleWhatsApp}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white">
                <MessageCircle size={20}/>
              </div>
              <span className="text-xs mt-1">WhatsApp</span>
            </button>

            <button
              onClick={handleShare}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <Share2 size={20}/>
              </div>
              <span className="text-xs mt-1">Share</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white">
                <Download size={20}/>
              </div>
              <span className="text-xs mt-1">Download</span>
            </button>

          </div>

        </div>

      </div>

    );
  }

  return slip;
}

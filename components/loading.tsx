"use client";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";
import { useImageStore } from "@/lib/store";
import { useLayerStore } from "@/lib/layer-store";
import loadingAnimation from "@/public/animations/loading.json";
import Lottie from "lottie-react";

export default function Loading() {
  const generating = useImageStore((state) => state.generating);
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);

  return (
    <Dialog open={generating} onOpenChange={setGenerating}>
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center rounded-lg border-none bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg">
        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle className="text-white">Editing {activeLayer.name}</DialogTitle>
          <DialogDescription className="text-gray-300">
            Please note that this operation might take up to a couple of seconds.
          </DialogDescription>
        </DialogHeader>

        {/* Loading Animation */}
        <Lottie className="w-36" animationData={loadingAnimation} />

        {/* Close Button (X Mark) */}
        <button
          className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-all opacity-0 hover:opacity-100"
          onClick={() => setGenerating(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </DialogContent>
    </Dialog>
  );
}
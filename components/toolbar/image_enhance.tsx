import React, { useState } from "react";
import { useImageStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Image, Wand2 } from "lucide-react";
import { useLayerStore } from "@/lib/layer-store";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { enhanceImage } from "@/server/image_enhance";

export default function ImageEnhance() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const generating = useImageStore((state) => state.generating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const [progress, setProgress] = useState(0);
  const [enhanceType, setEnhanceType] = useState("default"); // Track enhancement type

  const handleEnhanceImage = async (type: string) => {
    if (!activeLayer?.url) {
      toast.error("No image selected for enhancement.");
      return;
    }

    setGenerating(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(95, prev + (100 - prev) * 0.1));
    }, 1000);

    try {
      let enhancedImageUrl = "";

      if (type === "restore") {
        // Apply Cloudinary e_gen_restore transformation
        enhancedImageUrl = activeLayer.url.replace(
          "/upload/",
          "/upload/e_gen_restore/"
        );
      } else {
        // Call the existing enhancement function
        const result = await enhanceImage({ activeImage: activeLayer.url });
        if (!result?.data) throw new Error("Enhancement failed");
        enhancedImageUrl = result.data;
      }

      // Create a new layer with the enhanced image
      const newLayerId = crypto.randomUUID();
      addLayer({
        id: newLayerId,
        name: `${type}-enhanced-${activeLayer.name || "image"}`,
        format: activeLayer.format ?? "png",
        height: activeLayer.height,
        width: activeLayer.width,
        url: enhancedImageUrl,
        publicId: activeLayer.publicId,
        resourceType: "image",
      });

      setProgress(100);
      setActiveLayer(newLayerId);
      toast.success(`Image successfully enhanced with ${type}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Enhancement failed: ${errorMessage}`);
    } finally {
      clearInterval(progressInterval);
      setGenerating(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="py-8">
          <span className="flex gap-1 items-center justify-center flex-col text-xs font-medium">
            Enhance Image
            <Image size={18} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Choose Enhancement Type</h4>
          <p className="text-sm text-muted-foreground">
            Select an enhancement method for the image.
          </p>

          <Button
            disabled={generating}
            onClick={() => handleEnhanceImage("default")}
            className="w-full"
          >
            Default Enhancement <Wand2 size={16} className="ml-2" />
          </Button>

          <Button
            disabled={generating}
            onClick={() => handleEnhanceImage("restore")}
            className="w-full"
          >
            AI Restore (e_gen_restore) <Image size={16} className="ml-2" />
          </Button>

          <AnimatePresence>
            {generating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-2 mb-2"
              >
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  Enhancing image... {Math.round(progress)}%
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PopoverContent>
    </Popover>
  );
}

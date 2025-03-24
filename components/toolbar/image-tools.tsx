"use client"

import AIRecolor from "@/components/toolbar/recolor"
import GenerativeFill from "@/components/toolbar/generative-fill"
import GenRemove from "@/components/toolbar/gen-remove"
import BgRemove from "./bg-remove"
import AIBackgroundReplace from "./bg-replace"
import ExtractPart from "./extract-part"
import ImageEnhance from "./image_enhance"

export default function ImageTools() {
  return (
    <>
      <ImageEnhance />
      <GenerativeFill />
      <AIRecolor />
      <GenRemove />
      <AIBackgroundReplace />
      <ExtractPart />
      <BgRemove />
    </>
  )
}



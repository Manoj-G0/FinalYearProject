"use client";

import { useState } from "react";
import { LayerStore } from "@/lib/layer-store";
import { ImageStore } from "@/lib/store";
import Editor from "@/components/editor";
import LandingPage from "@/components/landingpage";

export default function Home() {
  const [showEditor, setShowEditor] = useState(false); // State to toggle between LandingPage and Editor

  const handleExploreFeatures = () => {
    setShowEditor(true); // Show the Editor component
  };

  return (
    <ImageStore.Provider
      initialValue={{
        activeTag: "all",
        activeColor: "green",
        activeImage: "",
      }}
    >
      <LayerStore.Provider
        initialValue={{
          layerComparisonMode: false,
          layers: [
            {
              id: crypto.randomUUID(),
              url: "",
              height: 0,
              width: 0,
              publicId: "",
            },
          ],
        }}
      >
        {/* Conditionally render LandingPage or Editor */}
        {showEditor ? <Editor /> : <LandingPage onExploreFeatures={handleExploreFeatures} />}
      </LayerStore.Provider>
    </ImageStore.Provider>
  );
}

// "use client"

// import Editor from "@/components/editor"
// import Loading from "@/components/loading"
// import { LayerStore } from "@/lib/layer-store"
// import { ImageStore } from "@/lib/store"
// import LandingPage  from "@/components/landingpage"
// export default function Home() {
//   return (
//     <ImageStore.Provider
//       initialValue={{
//         activeTag: "all",
//         activeColor: "green",
//         activeImage: "",
//       }}
//     >
//       <LayerStore.Provider
//         initialValue={{
//           layerComparisonMode: false,
//           layers: [
//             {
//               id: crypto.randomUUID(),
//               url: "",
//               height: 0,
//               width: 0,
//               publicId: "",
//             },
//           ],
//         }}
//       >
//         {/* <LandingPage /> */}
//         <Editor />
//       </LayerStore.Provider>
//     </ImageStore.Provider>
//   )
// }

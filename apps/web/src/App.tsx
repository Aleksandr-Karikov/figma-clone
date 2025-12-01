import { useEffect } from "react";
import { useCanvasStore } from "@figma-clone/store";
import { Canvas, Toolbar } from "@figma-clone/ui";

function App() {
  const createNewDocument = useCanvasStore((state) => state.createNewDocument);

  useEffect(() => {
    // Create a new document on mount
    createNewDocument("Untitled", 1920, 1080);
  }, [createNewDocument]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Toolbar />
      <div className="flex-1 overflow-hidden">
        <Canvas width={1920} height={1080} />
      </div>
    </div>
  );
}

export default App;

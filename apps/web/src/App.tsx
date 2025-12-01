import { useEffect } from "react";
import { useCanvasStore, CanvasState } from "@/store/canvasStore";
import { Canvas } from "@/components/Canvas/Canvas";
import { Toolbar } from "@/components/Toolbar/Toolbar";
import { PropertyPanel } from "@/components/PropertyPanel/PropertyPanel";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

function App() {
  const createNewDocument = useCanvasStore(
    (state: CanvasState) => state.createNewDocument
  );

  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  useEffect(() => {
    // Create a new document on mount
    createNewDocument("Untitled", 1920, 1080);
  }, [createNewDocument]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <Canvas width={1920} height={1080} />
        </div>
        <PropertyPanel />
      </div>
    </div>
  );
}

export default App;

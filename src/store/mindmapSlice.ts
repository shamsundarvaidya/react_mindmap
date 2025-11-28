import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./mindmapInitialState";
import { selectNodeInMap, applyNodeChangesAction, updateNodeLabel, updateNodeLeftText, updateNodeRightText, addChildNodeToMap, deleteNodeAndDescendants } from "./reducers/nodeReducers";
import { applyEdgeChangesAction } from "./reducers/edgeReducers";
import { applyLayoutToMap } from "./reducers/layoutReducers";
import { clearMindMap, saveMindMapToLocalStorage, loadMindMapFromLocalStorage, importFromCSV } from "./reducers/storageReducers";



 const mindmapSlice = createSlice({
  name: "mindmap",
  initialState,
  reducers: {
    selectNodeInMap,
    applyNodeChangesAction,
    applyEdgeChangesAction,
    deleteNodeAndDescendants,
    addChildNodeToMap,
    updateNodeLabel,
    updateNodeLeftText,
    updateNodeRightText,
    clearMindMap,
    saveMindMapToLocalStorage,
    applyLayoutToMap,
    loadMindMapFromLocalStorage,
    importFromCSV,
  },
});

export default mindmapSlice.reducer;

export const {
  selectNodeInMap: selectNode,
  applyNodeChangesAction: applyNodeChanges,
  applyEdgeChangesAction: applyEdgeChanges,
  deleteNodeAndDescendants: deleteNode,
  addChildNodeToMap: addNode,
  updateNodeLabel: updateLabel,
  updateNodeLeftText: updateLeftText,
  updateNodeRightText: updateRightText,
  clearMindMap: clear,
  saveMindMapToLocalStorage: saveMindMap,
  applyLayoutToMap: applyLayout,
  loadMindMapFromLocalStorage: loadMindMap,
  importFromCSV: importCSV,
} = mindmapSlice.actions;

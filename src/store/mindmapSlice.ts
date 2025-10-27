import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./mindmapInitialState";
import { selectNodeInMap, applyNodeChangesAction, updateNodeLabel, updateNodeColor, toggleNodeCollapse, addChildNodeToMap, deleteNodeAndDescendants } from "./reducers/nodeReducers";
import { applyEdgeChangesAction } from "./reducers/edgeReducers";
import { applyLayoutToMap } from "./reducers/layoutReducers";
import { updateNodeNote } from "./reducers/noteReducers";
import { clearMindMap, saveMindMapToLocalStorage, loadMindMapFromLocalStorage } from "./reducers/storageReducers";



 const mindmapSlice = createSlice({
  name: "mindmap",
  initialState,
  reducers: {
    selectNodeInMap,
    applyNodeChangesAction,
    applyEdgeChangesAction,
    deleteNodeAndDescendants,
    addChildNodeToMap,
    //addSiblingNodeToMap,
    updateNodeColor,
    updateNodeLabel,
    clearMindMap,
    saveMindMapToLocalStorage,
    applyLayoutToMap,
    loadMindMapFromLocalStorage,
    updateNodeNote,
    toggleNodeCollapse, // NEW
  },
});

export default mindmapSlice.reducer;

export const {
  selectNodeInMap: selectNode,
  applyNodeChangesAction: applyNodeChanges,
  applyEdgeChangesAction: applyEdgeChanges,
  deleteNodeAndDescendants: deleteNode,
  addChildNodeToMap: addNode,
  //addSiblingNodeToMap: addSiblingNode,
  updateNodeColor: updateColor,
  updateNodeLabel: updateLabel,
  clearMindMap: clear,
  saveMindMapToLocalStorage: saveMindMap,
  applyLayoutToMap: applyLayout,
  loadMindMapFromLocalStorage: loadMindMap,
  updateNodeNote: updateNote,
  toggleNodeCollapse: toggleCollapse, // NEW
} = mindmapSlice.actions;

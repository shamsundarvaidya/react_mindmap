import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./mindmapInitialState";
import { selectNodeInMap, applyNodeChangesAction } from "./reducers/nodeReducers";
import { applyEdgeChangesAction } from "./reducers/edgeReducers";
import { deleteNodeAndDescendants } from "./reducers/deleteReducers";
import { addChildNodeToMap, addSiblingNodeToMap } from "./reducers/addNodeReducers";
import { applyLayoutToMap } from "./reducers/layoutReducers";
import { updateNodeLabel, updateNodeColor,updateNodeNote, toggleNodeCollapse } from "./reducers/updateReducers";
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
    addSiblingNodeToMap,
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
  addSiblingNodeToMap: addSiblingNode,
  updateNodeColor: updateColor,
  updateNodeLabel: updateLabel,
  clearMindMap: clear,
  saveMindMapToLocalStorage: saveMindMap,
  applyLayoutToMap: applyLayout,
  loadMindMapFromLocalStorage: loadMindMap,
  updateNodeNote: updateNote,
  toggleNodeCollapse: toggleCollapse, // NEW
} = mindmapSlice.actions;

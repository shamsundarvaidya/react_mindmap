
import  AddNoteButton from "./AddNoteButton";
import AddNode from "./nodeActions/AddNode";
import DeleteNode from "./nodeActions/DeleteNode";


const NodeActionButtons = () => (
  <div className="flex gap-2.5">
    <AddNode />
    <DeleteNode />
    <AddNoteButton />
  </div>
);

export default NodeActionButtons;

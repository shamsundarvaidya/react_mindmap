
import  EditNote from "./nodeActions/EditNote";
import AddNode from "./nodeActions/AddNode";
import DeleteNode from "./nodeActions/DeleteNode";


const NodeMenu = () => (
  <div className="flex gap-2.5">
    <AddNode />
    <DeleteNode />
    <EditNote />
  </div>
);

export default NodeMenu;

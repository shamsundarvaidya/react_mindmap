
import  EditNote from "./nodeActions/EditNote";
import AddNode from "./nodeActions/AddNode";
import DeleteNode from "./nodeActions/DeleteNode";


const NodeMenu = () => (
  <div className="flex flex-col sm:flex-row gap-2">
    <AddNode />
    <DeleteNode />
    <EditNote />
  </div>
);

export default NodeMenu;

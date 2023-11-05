import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessageCreator} from "../../Redux/Dialogs-reducer";

const mapStateToProps = (state) => {
   return {
      dialogsPage: state.dialogsPage
   }
}

const DialogsContainer = connect(mapStateToProps, {addMessageCreator})(Dialogs)
export default DialogsContainer
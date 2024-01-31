import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessageCreator} from "../../Redux/Dialogs-reducer";
import {withAuthRedirect} from "../../hoc/hoc";

const mapStateToProps = (state) => {
   return {
      dialogsPage: state.dialogsPage
   }
}

export default connect(mapStateToProps, {addMessageCreator})(withAuthRedirect(Dialogs))

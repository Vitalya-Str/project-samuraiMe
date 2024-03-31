import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {actions} from "../../Redux/Dialogs-reducer";
import {withAuthRedirect} from "../../hoc/hoc";
import {compose} from "redux";
import { AppStateType } from "../../Redux/store";

const mapStateToProps = (state:AppStateType) => {
   return {
      dialogsPage: state.dialogsPage
   }
}

export default compose(connect(mapStateToProps, {addMessageCreator: actions.addMessageCreator}),
   withAuthRedirect
)(Dialogs)

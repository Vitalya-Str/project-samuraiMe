import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessageCreator} from "../../Redux/Dialogs-reducer.ts";
import {withAuthRedirect} from "../../hoc/hoc";
import {compose} from "redux";

const mapStateToProps = (state) => {
   return {
      dialogsPage: state.dialogsPage
   }
}

export default compose(connect(mapStateToProps, {addMessageCreator}),
   withAuthRedirect
)(Dialogs)

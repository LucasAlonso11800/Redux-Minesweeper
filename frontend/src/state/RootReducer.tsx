import { combineReducers} from "redux";
import { HomePageReducer } from "./Home/HomePage.reducer";
import { scorePageReducer } from "./ScorePage/ScorePage.reducer";

const RootReducer = combineReducers({
    homePage: HomePageReducer,
    scorePage: scorePageReducer
});


export default RootReducer;

export type State = ReturnType<typeof RootReducer>;
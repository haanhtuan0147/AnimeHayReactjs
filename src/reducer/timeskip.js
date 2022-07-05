const INITIAL_STATE = {
	id: "ưqrwereqwr",
	timeskip: [],
	timeps:0
}
const alo123=(state = INITIAL_STATE, action={})=>{
	switch(action.type) {
		case "SET_DATA":
			return {...state,timeskip:[...state.timeskip,action.payload]};
		default:
			return state;
	}
};
export default alo123;
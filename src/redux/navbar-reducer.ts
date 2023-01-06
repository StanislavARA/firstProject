let initialState = {
    friends: [
        {
            name: "Stas",
            ava: "https://sun1-28.userapi.com/s/v1/if1/wsdT4jFyOMzRquAGVQRcu0xzXv4J0sGFi_MFHJDWKCh8wpNbtk2Nld6P1afK1JCM8fF-k_1u.jpg?size=400x400&quality=96&crop=404,3,1610,1610&ava=1 ",
            id: 1,
        },
        {
            name: "Bean",
            ava: "https://interesnyefakty.org/wp-content/uploads/mister-bin.jpg",
            id: 2
        },

    ],
};

type InitialStateType = typeof initialState
const navbarReducer = (state = initialState, action: any):InitialStateType => {


    return state;
}
export default navbarReducer
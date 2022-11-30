import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

let state = {
    posts: [
        {
            id: 1,
            message: "hello, I'am Cat",
            likes: 22,
            avatar:
                "https://www.meme-arsenal.com/memes/baa72248e5d44682994a2363bb10e635.jpg",
        },
        {
            id: 2,
            message: "hello, I'am Dog",
            likes: 2,
            avatar:
                "https://play-lh.googleusercontent.com/6f6MrwfRIEnR-OIKIt_O3VdplItbaMqtqgCNSOxcfVMCKGKsOdBK5XcI6HZpjssnB2Y",
        },
    ]

};

test('length of post should be increment', () => {
    //1. test data
    let action = addPostActionCreator("new-text");

    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(3);

});

test('message of new post should be new-text', () => {
    //1. test data
    let action = addPostActionCreator("new-text");

    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation

    expect(newState.posts[2].message).toBe("new-text");
});

test('length of post should be decrement', () => {
    //1. test data
    let action = deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation

    expect(newState.posts.length).toBe(1);
});
test(`after deleting post, length shouldn't be decrement if incorrect id`, () => {
    //1. test data
    let action = deletePost(100);

    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation

    expect(newState.posts.length).toBe(2);
});
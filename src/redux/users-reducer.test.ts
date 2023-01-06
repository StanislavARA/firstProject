import usersReducer, {actions, follow, InitialStateType} from "./users-reducer";

let state: InitialStateType;
beforeEach(() => {
    state = {
        users: [{
            id: 0,
            name: 'stas',
            followed: false,
            photos: {
                small: 'null',
                large: 'null'
            },
            status: 'status 0',
            uniqueUrlName: null
        },
            {
                id: 1,
                name: 'stas2',
                followed: false,
                photos: {
                    small: 'null',
                    large: 'null'
                },
                status: 'status 2',
                uniqueUrlName: null
            },
            {
                id: 2,
                name: 'stas3',
                followed: true,
                photos: {
                    small: 'null',
                    large: 'null'
                },
                status: 'status 3',
                uniqueUrlName: null
            },
            {
                id: 3,
                name: 'stas4',
                followed: true,
                photos: {
                    small: 'null',
                    large: 'null'
                },
                status: 'status 4',
                uniqueUrlName: null
            }],
        pageSize: 4,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('follow success', () => {
    //userReducer
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test('unfollow success', () => {
    //userReducer
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[3].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeTruthy();
})

test ('',async ()=>{
const thunk = follow(1)

    const dispatchMock = jest.fn()
    const getState=jest.fn()

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(3)
})

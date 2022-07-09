import { all, call } from 'redux-saga/effects'

// sagas
import { categoriesSaga } from './categories/categories.saga'
import { userSagas } from './user/user.saga'

export function* rootSaga() {
    yield all(
        [
            call(categoriesSaga),
            call(userSagas)
        ]
    )
}
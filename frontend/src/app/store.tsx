import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from '../categories/categoriesSlice'
import expensesSlice from '../expenses/expensesSlice';
import usersSlice from '../users/usersSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    expenses: expensesSlice,
    users: usersSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
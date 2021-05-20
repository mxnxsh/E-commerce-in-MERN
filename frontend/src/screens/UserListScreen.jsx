import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const UserListScreen = props => {
  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector(state => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
    user,
  } = userDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);

  const deleteHandler = user => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <h1>Users</h1>
      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant='success'>{`${user.user.name} is deleted successfully`}</MessageBox>
      )}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : users.length === 0 ? (
        <MessageBox variant='success'>No Users</MessageBox>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>Created At</th>
              <th>IS SELLER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{moment(user.createdAt).fromNow()}</td>
                <td>{user.isSeller ? 'YES' : 'NO'}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                  <button
                    type='button'
                    className='small'
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type='button'
                    className={`small ${user.isAdmin ? 'disabled' : ''}`}
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListScreen;

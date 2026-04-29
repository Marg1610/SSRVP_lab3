import { useSelector } from 'react-redux';

export const useLoginState = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);
    return { isLoggedIn, user };
};
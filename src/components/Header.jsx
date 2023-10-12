import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAccessToken, logout} from "../actions/UserAuthActions.jsx";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.userAuthReducer);

  useEffect(() => {

    dispatch(fetchAccessToken())
      .catch(e => {
        console.log(e);
        if (e.response.status >= 500) {
          alert("일시적인 서버 오류입니다. 다시 로그인해주세요.");
        }
      });

  }, []);

  const goLoginPage = () => {
    navigate("/login");
  }

  const goRegisterPage = () => {
    navigate("/register");
  }

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  }

  const goHome = () => {
    navigate("/");
  }

  return (
    <div className="h-24 w-full flex justify-between items-center">
      <h1 className="text-4xl mr-2">
        <button onClick={goHome}>
          DEVLAB
        </button>
      </h1>
      {userAuth.isLogin ? (
        <div className="w-1/6.5 flex justify-between">
          <button className="ml-6 border-1 p-1 px-2 border-gray-600" onClick={goLoginPage}>
            내 정보
          </button>
          <button className="ml-6 border-1 p-1 px-2 border-gray-600" onClick={onLogout}>
            로그아웃
          </button>
        </div>) : (
        <div className="w-1/6.5 flex justify-between">
          <button className="ml-6 border-1 p-1 px-2 border-gray-600" onClick={goLoginPage}>
            로그인
          </button>
          <button className="ml-6 border-1 p-1 px-2 border-gray-600" onClick={goRegisterPage}>
            회원가입
          </button>
        </div>)
      }
    </div>
  );
}

export default Header;

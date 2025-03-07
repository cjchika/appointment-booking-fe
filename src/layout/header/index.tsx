import { Link } from 'react-router-dom';
import { navList, authNavList } from '@/data/constant/navs';
import { useNavigate } from 'react-router-dom';
import { useActiveMenu } from '@/hooks';
import { useLogoutMutation } from '@/features/user';

const HeaderComponent = () => {
  const { checkActive } = useActiveMenu();
  const { mutate: logout } = useLogoutMutation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('prevuser') || 'null');
  const refresh_token = localStorage.getItem('prevrefreshToken');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('prevuser');
    localStorage.removeItem('prevtoken');
    localStorage.removeItem('prevrefreshToken');
    if (refresh_token) {
      logout({ refresh_token });
    }
    navigate('/home');
  };

  return (
    <header className="block fixed w-full inset-x-0 z-30 h-16 px-4 bg-white shadow-sm">
      <div className="container h-full flex items-center justify-between mx-auto">
        <div className="w-full flex justify-between items-center">
          <Link to={'/'}>
            <h2 className="text-3xl font-bold">
              Prev<span className="text-primary text-5xl">.</span>
            </h2>
          </Link>
          <div className="flex gap-5 items-center">
            {/* Render authNavList if user is logged in */}
            {user ? (
              <>
                {authNavList.map((item) => (
                  <Link key={item.key} to={item.key}>
                    <span
                      className={`capitalize font-medium text-base px-2 py-2 ${
                        checkActive(item.key)
                          ? 'text-primary'
                          : 'text-slate-500'
                      } hover:bg-slate-100 rounded-md transition-all duration-150`}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="capitalize font-medium text-base px-2 py-2 text-slate-500 hover:bg-slate-100 rounded-md transition-all duration-150"
                >
                  Logout
                </button>
              </>
            ) : (
              navList.map((item) => (
                <Link key={item.key} to={item.key}>
                  <span
                    className={`capitalize font-medium text-base px-2 py-2 ${
                      checkActive(item.key) ? 'text-primary' : 'text-slate-500'
                    } hover:bg-slate-100 rounded-md transition-all duration-150`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;

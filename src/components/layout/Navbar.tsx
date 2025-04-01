
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-medical-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold">MediPredict</div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="link" 
              className="text-white hover:text-medical-200"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant="link" 
              className="text-white hover:text-medical-200"
              onClick={() => navigate('/dashboard')}
            >
              About
            </Button>
            <Button 
              variant="link" 
              className="text-white hover:text-medical-200"
              onClick={() => navigate('/dashboard')}
            >
              Prediction
            </Button>
            <Button 
              variant="link" 
              className="text-white hover:text-medical-200"
              onClick={() => navigate('/dashboard')}
            >
              History
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={user.name} />
                      <AvatarFallback className="bg-medical-300">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate('/login')} variant="outline" className="bg-white text-medical-700">
                Log in
              </Button>
            )}
          </div>
          
          <div className="flex md:hidden items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-medical-700 pb-3 px-4">
          <div className="flex flex-col space-y-2">
            <Button 
              variant="ghost" 
              className="justify-start text-white hover:bg-medical-600"
              onClick={() => {
                navigate('/dashboard');
                setIsMobileMenuOpen(false);
              }}
            >
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start text-white hover:bg-medical-600"
              onClick={() => {
                navigate('/dashboard');
                setIsMobileMenuOpen(false);
              }}
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start text-white hover:bg-medical-600"
              onClick={() => {
                navigate('/dashboard');
                setIsMobileMenuOpen(false);
              }}
            >
              Prediction
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start text-white hover:bg-medical-600"
              onClick={() => {
                navigate('/dashboard');
                setIsMobileMenuOpen(false);
              }}
            >
              History
            </Button>
            
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  className="justify-start text-white hover:bg-medical-600"
                  onClick={() => {
                    navigate('/profile');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start text-white hover:bg-medical-600"
                  onClick={() => {
                    navigate('/settings');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start text-white hover:bg-medical-600"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }} 
                className="bg-white text-medical-700"
              >
                Log in
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

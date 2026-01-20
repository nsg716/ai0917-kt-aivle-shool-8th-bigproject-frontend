import {
  Brain,
  LayoutDashboard,
  Bell,
  ChevronDown,
  LogOut,
  Megaphone,
  ChevronRight,
  Menu,
  Shield,
  ChevronsLeft,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
import { ThemeToggle } from '../../components/ui/theme-toggle';
import { AdminHome } from './admin/AdminHome';
import { AdminNotices } from './admin/AdminNotices';
import { AdminPermissions } from './admin/AdminPermissions';

interface AdminDashboardProps {
  onLogout: () => void;
  onHome?: () => void;
}

export function AdminDashboard({ onLogout, onHome }: AdminDashboardProps) {
  const [activeMenu, setActiveMenu] = useState('home');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    // Close sidebar on mobile when menu is clicked
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-background" data-role="admin">
      {/* Sidebar Open Button (when closed) */}
      {!sidebarOpen && (
        <Button
          onClick={() => setSidebarOpen(true)}
          size="icon"
          className="fixed top-4 left-4 z-50 bg-card shadow-lg border border-border text-muted-foreground hover:bg-accent"
        >
          <Menu className="w-5 h-5" />
        </Button>
      )}

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-full md:w-64' : 'w-0'} bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden fixed md:relative h-full z-40`}
      >
        {/* Close Button */}
        {sidebarOpen && (
          <Button
            onClick={() => setSidebarOpen(false)}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-3 z-10 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
          >
            <ChevronsLeft className="w-5 h-5" />
          </Button>
        )}

        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <button
            onClick={onHome}
            className="flex items-center gap-3 w-full text-left hover:bg-sidebar-accent rounded-lg p-2 transition-colors"
            aria-label="홈으로 이동"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--role-primary)' }}
            >
              <Brain className="w-6 h-6 text-white dark:text-black" />
            </div>
            <div>
              <div className="text-base font-semibold text-sidebar-foreground">
                IPSUM
              </div>
              <div
                className="text-xs font-medium"
                style={{ color: 'var(--role-primary)' }}
              >
                관리자
              </div>
            </div>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* Home - Hidden on mobile */}
          <button
            onClick={() => handleMenuClick('home')}
            className={`w-full hidden md:flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeMenu === 'home'
                ? 'text-white dark:text-black'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
            style={
              activeMenu === 'home'
                ? { backgroundColor: 'var(--role-primary)' }
                : {}
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-medium">홈</span>
          </button>

          <button
            onClick={() => handleMenuClick('permissions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeMenu === 'permissions'
                ? 'text-white dark:text-black'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
            style={
              activeMenu === 'permissions'
                ? { backgroundColor: 'var(--role-primary)' }
                : {}
            }
          >
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">권한</span>
          </button>

          <button
            onClick={() => handleMenuClick('notices')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeMenu === 'notices'
                ? 'text-white dark:text-black'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
            style={
              activeMenu === 'notices'
                ? { backgroundColor: 'var(--role-primary)' }
                : {}
            }
          >
            <Megaphone className="w-5 h-5" />
            <span className="text-sm font-medium">공지사항</span>
          </button>
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-sidebar-border">
          {/* Desktop: Dropdown style */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="w-full flex items-center gap-3 p-3 bg-sidebar-accent rounded-lg hover:bg-muted transition-colors"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white dark:text-black text-sm font-semibold"
                style={{ backgroundColor: 'var(--role-primary)' }}
              >
                관
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-sidebar-foreground">
                  시스템 관리자
                </div>
                <div className="text-xs text-muted-foreground">Admin</div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    onLogout();
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">로그아웃</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile: Expanded style */}
          <div className="md:hidden space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-sidebar-accent rounded-lg">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white dark:text-black text-sm font-semibold"
                style={{ backgroundColor: 'var(--role-primary)' }}
              >
                관
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-sidebar-foreground font-medium">
                  시스템 관리자
                </div>
                <div className="text-xs text-muted-foreground">Admin</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">로그아웃</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-4 md:px-8 py-4">
          <div
            className={`flex items-center justify-between ${!sidebarOpen ? 'ml-16' : ''}`}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">홈</span>
              {activeMenu !== 'home' && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">
                    {activeMenu === 'notices' && '공지사항'}
                    {activeMenu === 'permissions' && '권한'}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="relative">
                <Button
                  size="sm"
                  variant="ghost"
                  className="border-border"
                  onClick={() => setShowActivityDropdown(!showActivityDropdown)}
                >
                  <Bell className="w-4 h-4" />
                </Button>

                {showActivityDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-[32rem] bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="p-3 sm:p-4 border-b border-border">
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                        시스템 알림
                      </h3>
                    </div>
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      새로운 알림이 없습니다.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {activeMenu === 'home' && <AdminHome />}
          {activeMenu === 'notices' && <AdminNotices />}
          {activeMenu === 'permissions' && <AdminPermissions />}
        </main>
      </div>
    </div>
  );
}

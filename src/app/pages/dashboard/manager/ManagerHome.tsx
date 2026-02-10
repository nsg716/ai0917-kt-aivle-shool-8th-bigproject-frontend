import {
  FileText,
  Users,
  Activity,
  Megaphone,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useContext, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { managerService } from '../../../services/managerService';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../components/ui/dialog';
import { ManagerDashboardNoticeDto } from '../../../types/manager';

interface ManagerHomeProps {
  onNavigate?: (menu: string) => void;
}

export function ManagerHome({ onNavigate }: ManagerHomeProps) {
  const navigate = useNavigate();

  // Manager Dashboard Page
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['manager', 'dashboard', 'page'],
    queryFn: managerService.getDashboardPage,
  });
  const summary = pageData?.summary;
  const notices = pageData?.notices || [];

  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [selectedNotice, setSelectedNotice] =
    useState<ManagerDashboardNoticeDto | null>(null);
  const [isNoticeDetailOpen, setIsNoticeDetailOpen] = useState(false);

  const currentNotice =
    notices.length > 0
      ? notices[currentNoticeIndex % notices.length]
      : null;

  const handleNextNotice = () => {
    if (notices.length === 0) return;
    setCurrentNoticeIndex((prev) => (prev + 1) % notices.length);
  };

  const handlePrevNotice = () => {
    if (notices.length === 0) return;
    setCurrentNoticeIndex(
      (prev) => (prev - 1 + notices.length) % notices.length,
    );
  };

  const handleNoticeClick = (notice: ManagerDashboardNoticeDto) => {
    setSelectedNotice(notice);
    setIsNoticeDetailOpen(true);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans p-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Pending Proposals */}
        <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="space-y-1 overflow-hidden">
              <div className="text-2xl font-bold text-foreground truncate">
                {summary?.pendingProposals || 0}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                승인 대기 제안
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Managed Authors */}
        <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-1 overflow-hidden">
              <div className="text-2xl font-bold text-foreground truncate">
                {summary?.managedAuthors || 0}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                담당 작가
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Active Authors */}
        <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-1 overflow-hidden">
              <div className="text-2xl font-bold text-foreground truncate">
                {summary?.activeAuthors || 0}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                활동 중인 작가
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notices Section - align with Author Home design */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-border relative overflow-hidden group shadow-sm">
          <CardHeader className="pb-2 p-4 flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Megaphone className="w-4 h-4 text-primary" />
              주요 공지사항
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[120px] flex flex-col justify-center relative p-4 pt-0">
            {currentNotice ? (
              <div
                className="space-y-1.5 px-8 transition-all duration-300 hover:opacity-80 cursor-pointer"
                onClick={() => handleNoticeClick(currentNotice)}
              >
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-[10px] h-5 px-1.5">
                    공지
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(currentNotice.createdAt), 'yyyy.MM.dd', {
                      locale: ko,
                    })}
                  </span>
                </div>
                <h3 className="text-base font-bold line-clamp-1">
                  {currentNotice.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {currentNotice.content || '공지사항 내용을 확인하세요.'}
                </p>
              </div>
            ) : (
              <div className="text-center text-xs text-muted-foreground">
                등록된 공지사항이 없습니다.
              </div>
            )}

            {notices.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-background/50 hover:bg-background shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handlePrevNotice}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-background/50 hover:bg-background shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleNextNotice}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isNoticeDetailOpen} onOpenChange={setIsNoticeDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>공지사항 상세</DialogTitle>
          </DialogHeader>
          {selectedNotice && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="default">공지</Badge>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(selectedNotice.createdAt), 'yyyy.MM.dd', {
                      locale: ko,
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{selectedNotice.title}</h3>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-sm leading-relaxed whitespace-pre-wrap min-h-[200px]">
                {selectedNotice.content}
              </div>
              <div className="text-xs text-muted-foreground">
                작성자: {selectedNotice.writer}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsNoticeDetailOpen(false)}>닫기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

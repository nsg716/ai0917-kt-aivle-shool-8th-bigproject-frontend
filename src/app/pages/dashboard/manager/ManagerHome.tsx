import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../components/ui/dialog';
import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  Loader2,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
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
import { adminService } from '../../../services/adminService';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface ManagerHomeProps {
  onNavigate?: (menu: string) => void;
}

export function ManagerHome({ onNavigate }: ManagerHomeProps) {
  const navigate = useNavigate();

  // Notice State
  const [isNoticeDetailOpen, setIsNoticeDetailOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<any>(null);

  // Fetch Manager Dashboard Summary
  const { data: summaryData, isLoading: isSummaryLoading } = useQuery({
    queryKey: ['manager', 'dashboard', 'summary'],
    queryFn: managerService.getDashboardSummary,
  });

  // Fetch Admin Dashboard Summary for System Overview
  const { data: systemSummary, isLoading: isSystemLoading } = useQuery({
    queryKey: ['admin', 'dashboard', 'summary'],
    queryFn: adminService.getDashboardSummary,
  });

  // Fetch DAU for Traffic Overview
  const { data: dauData } = useQuery({
    queryKey: ['admin', 'dashboard', 'dau'],
    queryFn: adminService.getDashboardDau,
  });

  // Fetch Notices
  const { data: noticesData } = useQuery({
    queryKey: ['notices', 'latest'],
    queryFn: () => adminService.getNotices(0, 5),
  });

  const notices = noticesData?.content || [];

  // Handlers
  const handleNoticeClick = (notice: any) => {
    setSelectedNotice(notice);
    setIsNoticeDetailOpen(true);
  };

  // Calculate Growth Rate
  const growthRate =
    dauData?.today && dauData?.yesterday
      ? ((dauData.today - dauData.yesterday) / dauData.yesterday) * 100
      : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              대기 중인 제안
            </CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryData?.pendingProposals || 0}건
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              승인 대기 중인 IP 확장 제안
            </p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              관리 작가
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryData?.managedAuthors || 0}명
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              현재 담당하고 있는 작가 수
            </p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              오늘 DAU
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryData?.todayDau?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span
                className={
                  (summaryData?.dauChangeRate || 0) >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                {(summaryData?.dauChangeRate || 0) >= 0 ? '+' : ''}
                {summaryData?.dauChangeRate || 0}%
              </span>{' '}
              vs 어제
            </p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              시스템 상태
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">정상</div>
            <p className="text-xs text-muted-foreground mt-1">
              모든 서비스 가동 중
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 배너 위젯 섹션 (공지사항) */}
      <div className="grid grid-cols-1 gap-6">
        {/* 공지사항 위젯 */}
        <Card className="border-border relative overflow-hidden">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-primary" />
                주요 공지사항
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground text-xs"
                onClick={() => navigate('/manager/notices')}
              >
                더보기 <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {notices.length > 0 ? (
              <div className="divide-y divide-border">
                {notices.map((notice: any) => (
                  <div
                    key={notice.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleNoticeClick(notice)}
                  >
                    <Badge
                      variant={
                        notice.category === 'URGENT'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className="shrink-0"
                    >
                      {notice.category === 'URGENT' ? '긴급' : '공지'}
                    </Badge>
                    <span className="flex-1 text-sm font-medium truncate">
                      {notice.title}
                    </span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground text-sm">
                등록된 공지사항이 없습니다.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notice Detail Dialog */}
      <Dialog open={isNoticeDetailOpen} onOpenChange={setIsNoticeDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>공지사항 상세</DialogTitle>
          </DialogHeader>
          {selectedNotice && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      selectedNotice.category === 'URGENT'
                        ? 'destructive'
                        : 'default'
                    }
                  >
                    {selectedNotice.category === 'URGENT' ? '긴급' : '공지'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(selectedNotice.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{selectedNotice.title}</h3>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-sm leading-relaxed whitespace-pre-wrap min-h-[200px]">
                {selectedNotice.content}
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

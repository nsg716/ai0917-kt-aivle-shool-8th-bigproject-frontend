import { useState, useContext, useEffect } from 'react';
import { AuthorBreadcrumbContext } from './AuthorBreadcrumbContext';
import { Tabs, TabsContent } from '../../../components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import {
  Loader2,
  CheckCircle,
  Plus,
  BookOpen,
  Crown,
  AlertCircle,
} from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { authorService } from '../../../services/authorService';
import { IPProposalDto } from '../../../types/author';
import { format, differenceInCalendarDays } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../../components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '../../../components/ui/utils';

interface AuthorIPExpansionProps {
  defaultTab?: string;
}

export function AuthorIPExpansion({
  defaultTab = 'proposals',
}: AuthorIPExpansionProps) {
  const { setBreadcrumbs, onNavigate } = useContext(AuthorBreadcrumbContext);

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedProposal, setSelectedProposal] =
    useState<IPProposalDto | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [generatedAuthorCode, setGeneratedAuthorCode] = useState('');

  // Reject Logic State
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    const breadcrumbs: { label: string; onClick?: () => void }[] = [
      { label: '홈', onClick: () => onNavigate('home') },
      { label: 'IP 제안서', onClick: () => setActiveTab('proposals') },
    ];

    setBreadcrumbs(breadcrumbs);
  }, [setBreadcrumbs, onNavigate, activeTab]);

  // Fetch Proposals
  const { data: proposals, isLoading: isProposalsLoading } = useQuery({
    queryKey: ['author', 'ip-proposals'],
    queryFn: authorService.getIPProposals,
  });

  const { data: myManager, refetch: refetchMyManager } = useQuery({
    queryKey: ['author', 'my-manager'],
    queryFn: authorService.getMyManager,
  });

  const proposalList = proposals || [];

  const handleOpenDetail = (proposal: IPProposalDto) => {
    setSelectedProposal(proposal);
    setIsDetailOpen(true);
    setShowRejectInput(false);
    setRejectReason('');
  };

  const handleApprove = () => {
    toast.success('제안서가 승인되었습니다. 계약 절차가 진행됩니다.');
    setIsDetailOpen(false);
    // TODO: Implement actual API call
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error('반려 사유를 입력해주세요.');
      return;
    }
    toast.success('제안서가 반려되었습니다.');
    setIsDetailOpen(false);
    // TODO: Implement actual API call
  };

  // Mock Source Settings (Lorebooks) for demonstration
  // In a real app, this would be fetched based on the proposal ID
  const mockSourceSettings = [
    {
      id: 1,
      title: '서울의 달 (Original)',
      author: selectedProposal?.sender || 'Unknown',
      isMyWork: true,
      category: '현대판타지',
    },
    {
      id: 2,
      title: '마법사의 탑',
      author: '다른작가',
      isMyWork: false,
      category: '판타지',
    },
    {
      id: 3,
      title: '기사의 맹세',
      author: '다른작가',
      isMyWork: false,
      category: '판타지',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* 담당 매니저 정보 카드 */}
      {myManager && myManager.managerName ? (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                {myManager.managerName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  담당 운영자: {myManager.managerName}
                </h3>
                <p className="text-sm text-blue-700">
                  {myManager.managerSiteEmail || myManager.managerEmail}
                </p>
                {/* 매칭일 표시는 요청에 따라 제거 */}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600 font-medium">
                IP 확장을 위한 1:1 지원을 받고 있습니다
              </p>
              <Button
                size="sm"
                variant="destructive"
                className="mt-2"
                onClick={async () => {
                  const ok = window.confirm('운영자와의 연동을 끊을까요?');
                  if (!ok) return;
                  try {
                    await authorService.unlinkManager();
                    await refetchMyManager();
                    toast.success('연결을 끊었습니다');
                  } catch (e) {
                    toast.error('연결 끊기에 실패했습니다');
                  }
                }}
              >
                연결 끊기
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* 제안서 검토 탭 */}
        <TabsContent value="proposals" className="mt-6 space-y-6">
          <div className="flex items-center justify-end gap-2">
            {/* 운영자와 매칭되지 않은 경우에만 작가 ID 생성 버튼 표시 */}
            {(!myManager || !myManager.managerName) && (
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={async () => {
                  try {
                    const code = await authorService.generateAuthorCode();
                    setGeneratedAuthorCode(code);
                    setIsGenerateOpen(true);
                  } catch (err) {
                    toast.error('작가 ID 생성에 실패했습니다.');
                  }
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> 작가 ID 생성
              </Button>
            )}
          </div>

          {isProposalsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {proposalList.length > 0 ? (
                proposalList.map((proposal) => (
                  <Card
                    key={proposal.id}
                    className="hover:border-primary/50 transition-colors cursor-pointer group"
                    onClick={() => handleOpenDetail(proposal)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge
                          variant={
                            proposal.status === 'PENDING'
                              ? 'default'
                              : 'secondary'
                          }
                          className="mb-2"
                        >
                          {proposal.statusDescription}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {proposal.receivedAt
                            ? format(
                                new Date(proposal.receivedAt),
                                'yyyy.MM.dd',
                              )
                            : '-'}
                        </span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {proposal.title}
                      </CardTitle>
                      <CardDescription>{proposal.sender}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                        {proposal.content}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                  도착한 제안서가 없습니다.
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Generated Author ID Modal */}
      <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>생성된 작가 ID</DialogTitle>
            <DialogDescription>
              아래 코드를 복사하여 필요한 곳에 입력하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input readOnly value={generatedAuthorCode} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Proposal Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] flex flex-col p-0 overflow-hidden">
          <div className="p-6 pb-0">
            <DialogHeader className="mb-4">
              <DialogTitle>제안서 상세 검토</DialogTitle>
              <DialogDescription>
                <span className="font-bold text-slate-900">
                  {selectedProposal?.sender}
                </span>
                에서 보낸 IP 확장 제안서입니다.
              </DialogDescription>
            </DialogHeader>
          </div>

          <ScrollArea className="flex-1 px-6">
            <div className="space-y-6 pb-6">
              {/* Basic Info */}
              <div className="bg-slate-50 p-4 rounded-lg space-y-3 border border-slate-100">
                <div className="grid grid-cols-4 gap-4 items-center">
                  <span className="font-semibold text-sm text-slate-500">
                    프로젝트 제목
                  </span>
                  <div className="col-span-3 font-bold text-slate-900">
                    {selectedProposal?.title}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <span className="font-semibold text-sm text-slate-500">
                    제안 일자
                  </span>
                  <div className="col-span-3 text-sm">
                    {selectedProposal?.receivedAt
                      ? format(
                          new Date(selectedProposal.receivedAt),
                          'yyyy.MM.dd',
                        )
                      : '-'}
                  </div>
                </div>
              </div>

              {/* Proposal Content */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  제안 상세 내용
                </h4>
                <div className="p-4 bg-white border border-slate-200 rounded-lg text-sm leading-relaxed whitespace-pre-wrap min-h-[100px] shadow-sm">
                  {selectedProposal?.content}
                </div>
              </div>

              {/* Source Settings (Lorebooks) Highlight */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  참조된 원천 설정집
                </h4>
                <div className="grid gap-2">
                  {mockSourceSettings.map((lorebook) => (
                    <div
                      key={lorebook.id}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg border transition-all',
                        lorebook.isMyWork
                          ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200'
                          : 'bg-white border-slate-200 opacity-70',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-md flex items-center justify-center shrink-0',
                            lorebook.isMyWork
                              ? 'bg-indigo-100 text-indigo-600'
                              : 'bg-slate-100 text-slate-500',
                          )}
                        >
                          {lorebook.isMyWork ? (
                            <Crown className="w-4 h-4" />
                          ) : (
                            <BookOpen className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p
                            className={cn(
                              'text-sm font-bold',
                              lorebook.isMyWork
                                ? 'text-indigo-900'
                                : 'text-slate-700',
                            )}
                          >
                            {lorebook.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {lorebook.category} | {lorebook.author}
                          </p>
                        </div>
                      </div>
                      {lorebook.isMyWork && (
                        <Badge
                          variant="secondary"
                          className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                        >
                          내 작품
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  * 굵게 표시된 항목은 작가님의 원천 설정집이 포함된 경우입니다.
                </p>
              </div>

              {/* Reject Input */}
              {showRejectInput && (
                <div className="space-y-2 pt-4 border-t border-slate-100 animation-in slide-in-from-bottom-2 fade-in duration-300">
                  <h4 className="font-bold text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    반려 사유 입력
                  </h4>
                  <Textarea
                    placeholder="반려 사유를 자세히 입력해주세요. (예: 설정 오류, 방향성 불일치 등)"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="p-6 pt-2 gap-2 sm:gap-0 border-t border-slate-100 bg-slate-50/50">
            {showRejectInput ? (
              <div className="flex w-full gap-2 justify-end">
                <Button
                  variant="ghost"
                  onClick={() => setShowRejectInput(false)}
                >
                  취소
                </Button>
                <Button variant="destructive" onClick={handleReject}>
                  반려 확정
                </Button>
              </div>
            ) : (
              <div className="flex w-full gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowRejectInput(true)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  반려하기
                </Button>
                <Button
                  onClick={handleApprove}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  승인하기
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

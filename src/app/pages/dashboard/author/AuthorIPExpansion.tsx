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
  Zap,
  Film,
  Tv,
  Play,
  Sparkles,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight,
  Check,
  CheckCircle,
  AlertCircle,
  X,
  BookOpen,
  Image as ImageIcon,
  Monitor,
  Smartphone,
  Clapperboard,
  Calendar,
  Users,
  Clock,
  Target,
  Loader2,
  Trash2,
  Wand2,
  Music,
  Video,
  FileText,
  AlertTriangle,
  Send,
  Edit,
  Maximize2,
  Minimize2,
  Gamepad,
  Gamepad2,
  Settings2,
  Palette,
  MessageSquare,
  List,
  MapPin,
  Package,
  Users2,
  Globe,
  Settings,
  DollarSign,
  BarChart,
  ChevronDown,
  Megaphone,
  GitBranch,
  User,
  Crown,
  HelpCircle,
  Info,
} from 'lucide-react';
import { PdfPreview, VisualPreview } from '../../../components/ProjectPreviews';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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

  // Reject/Approve Logic State
  const [actionType, setActionType] = useState<'APPROVE' | 'REJECT' | null>(
    null,
  );
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [actionComment, setActionComment] = useState('');
  const [showPdfFullScreen, setShowPdfFullScreen] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedLorebookDetail, setSelectedLorebookDetail] =
    useState<any>(null);

  const queryClient = useQueryClient();

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
    setActionType(null);
    setActionComment('');
  };

  const openActionDialog = (type: 'APPROVE' | 'REJECT') => {
    setActionType(type);
    setActionComment('');
    setIsActionDialogOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedProposal || !actionType) return;

    if (actionType === 'REJECT' && !actionComment.trim()) {
      toast.error('반려 사유를 입력해주세요.');
      return;
    }

    try {
      if (actionType === 'APPROVE') {
        await authorService.approveIPProposal(
          selectedProposal.id,
          actionComment,
        );
        toast.success('제안서가 승인되었습니다. 계약 절차가 진행됩니다.');
      } else {
        await authorService.rejectIPProposal(
          selectedProposal.id,
          actionComment,
        );
        toast.success('제안서가 반려되었습니다.');
      }
      setIsActionDialogOpen(false);
      setIsDetailOpen(false);
      queryClient.invalidateQueries({ queryKey: ['author', 'ip-proposals'] });
    } catch (error) {
      toast.error(
        `${actionType === 'APPROVE' ? '승인' : '반려'} 처리 중 오류가 발생했습니다.`,
      );
    }
  };

  // Extended Proposal Type for UI (Mock Data Support)
  const extendedProposal = selectedProposal as any;

  // Mock Content Strategy - Updated for 6 Core Elements (from ManagerIPExpansion)
  const contentStrategy = extendedProposal?.contentStrategy || {
    differentiation:
      extendedProposal?.differentiation ||
      '기존 장르의 문법을 비트는 반전 요소와 입체적인 캐릭터 관계성을 통해 차별화된 재미를 선사합니다.',
    keyReason:
      '현재 트렌드인 "회귀/빙의/환생" 키워드를 독창적으로 해석하여, 2030 타겟층의 강력한 공감을 이끌어낼 수 있는 서사입니다.',
    successGrounds:
      '원작의 탄탄한 팬덤 데이터와 유사 성공 사례(예: 재벌집 막내아들)의 흥행 공식을 분석했을 때, 높은 시장 점유율이 예측됩니다.',
    coreNarrative:
      extendedProposal?.content ||
      '주인공의 내면적 갈등과 외부의 위협이 교차하며 전개되는 긴장감 넘치는 서사 구조를 가집니다.',
    worldBuilding:
      '기존 세계관의 규칙을 비틀어 새로운 마법 체계와 기술이 공존하는 독창적인 디스토피아를 구축합니다.',
    visualStyle:
      '누아르 풍의 어두운 색채와 네온 사인이 대비되는 강렬한 비주얼로 몰입감을 극대화합니다.',
  };

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

      {/* Proposal Detail Modal - Aligned with Manager Dashboard */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-[90vw] lg:max-w-7xl max-h-[95vh] p-0 gap-0 rounded-2xl overflow-y-auto flex flex-col bg-white shadow-2xl border-0">
          <ScrollArea className="flex-1">
            {/* Hero Header */}
            <div
              className={cn(
                'relative h-48 flex items-end p-8 overflow-hidden shrink-0',
                'bg-slate-50 border-b border-slate-100',
              )}
            >
              <div className="relative z-10 w-full flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-white border-slate-200 text-slate-500 hover:bg-slate-50 uppercase tracking-wider shadow-sm">
                      {extendedProposal?.format || 'FORMAT'}
                    </Badge>
                    <Badge
                      variant={
                        extendedProposal?.status === 'APPROVED'
                          ? 'default'
                          : extendedProposal?.status === 'REVIEWING'
                            ? 'secondary'
                            : extendedProposal?.status === 'PENDING'
                              ? 'outline'
                              : 'destructive'
                      }
                      className={cn(
                        'border-0',
                        extendedProposal?.status === 'APPROVED'
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : extendedProposal?.status === 'REVIEWING'
                            ? 'bg-amber-500 text-white hover:bg-amber-600'
                            : extendedProposal?.status === 'PENDING'
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                              : 'bg-rose-500 text-white hover:bg-rose-600',
                      )}
                    >
                      {extendedProposal?.statusDescription ||
                        extendedProposal?.status}
                    </Badge>
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                    {extendedProposal?.title}
                  </h2>
                  <div className="text-slate-500 text-sm mt-3 flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />{' '}
                      {extendedProposal?.receivedAt
                        ? new Date(
                            extendedProposal.receivedAt,
                          ).toLocaleDateString()
                        : new Date().toLocaleDateString()}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400" />{' '}
                      {extendedProposal?.sender || '매니저'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-12">
              {/* 1. PDF Preview & Overview */}
              <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Left: PDF & Visual Preview */}
                <div className="w-full lg:w-1/2 shrink-0 flex flex-col gap-4">
                  <div className="h-[300px]">
                    <VisualPreview
                      project={extendedProposal}
                      isFullScreen={false}
                      className="h-full object-contain"
                      onFullScreen={() => setShowPreviewModal(true)}
                    />
                  </div>
                  <div className="h-[200px]">
                    <PdfPreview
                      isFullScreen={false}
                      className="h-full"
                      onFullScreen={() => setShowPdfFullScreen(true)}
                    />
                  </div>
                </div>

                {/* Right: Project Overview */}
                <div className="w-full lg:w-1/2 flex flex-col space-y-4 shrink-0">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <Target className="w-5 h-5 text-slate-500" />
                    프로젝트 개요
                  </h3>
                  <Card className="h-full border-slate-100 shadow-sm bg-white">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                          Source Work
                        </div>
                        <div className="font-bold text-slate-900 text-lg">
                          {extendedProposal?.workTitle || '-'}
                        </div>
                      </div>
                      <div className="h-px bg-slate-50" />
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                          Target Audience
                        </div>
                        <div className="font-medium text-slate-700">
                          {extendedProposal?.business?.targetAge?.join(', ') ||
                            '미정'}{' '}
                          /{' '}
                          <span className="capitalize">
                            {extendedProposal?.business?.targetGender === 'male'
                              ? '남성'
                              : extendedProposal?.business?.targetGender ===
                                  'female'
                                ? '여성'
                                : '전체'}
                          </span>
                        </div>
                      </div>
                      <div className="h-px bg-slate-50" />
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                          Budget Scale
                        </div>
                        <div className="font-medium text-slate-700 capitalize flex items-center gap-2">
                          {extendedProposal?.business?.budgetRange === 'low'
                            ? '저예산 (Low)'
                            : extendedProposal?.business?.budgetRange === 'high'
                              ? '블록버스터 (High)'
                              : '중형 예산 (Medium)'}
                        </div>
                      </div>
                      <div className="h-px bg-slate-50" />
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
                          Strategy
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                          >
                            {extendedProposal?.strategy?.genre === 'varied'
                              ? '장르 변주'
                              : '원작 유지'}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                          >
                            {extendedProposal?.strategy?.universe === 'parallel'
                              ? '평행 세계'
                              : '공유 세계관'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 2. Core Content Strategy (6 Grid) */}
              <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  IP 확장 기획 제안서 핵심 내용
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    {
                      title: '차별점 (Differentiation)',
                      icon: Zap,
                      content: contentStrategy.differentiation,
                      color: 'text-indigo-600',
                      bg: 'bg-indigo-50',
                    },
                    {
                      title: '기획 필요성 (Key Reason)',
                      icon: Target,
                      content: contentStrategy.keyReason,
                      color: 'text-rose-600',
                      bg: 'bg-rose-50',
                    },
                    {
                      title: '성공 근거 (Success Grounds)',
                      icon: BarChart,
                      content: contentStrategy.successGrounds,
                      color: 'text-emerald-600',
                      bg: 'bg-emerald-50',
                    },
                    {
                      title: '핵심 서사 (Core Narrative)',
                      icon: BookOpen,
                      content: contentStrategy.coreNarrative,
                      color: 'text-blue-600',
                      bg: 'bg-blue-50',
                    },
                    {
                      title: '세계관 확장 (World Building)',
                      icon: Monitor,
                      content: contentStrategy.worldBuilding,
                      color: 'text-purple-600',
                      bg: 'bg-purple-50',
                    },
                    {
                      title: '비주얼 스타일 (Visual Style)',
                      icon: ImageIcon,
                      content: contentStrategy.visualStyle,
                      color: 'text-pink-600',
                      bg: 'bg-pink-50',
                    },
                  ].map((item, i) => (
                    <Card
                      key={i}
                      className="border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 text-slate-800">
                          <div className={`p-2 rounded-lg ${item.bg}`}>
                            <item.icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {item.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 3. Input Setting Summary & Lorebooks */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                  <Settings className="w-5 h-5 text-slate-500" />
                  입력 설정 요약
                </h3>

                {/* Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      label: 'Source Work',
                      value: extendedProposal?.workTitle,
                      icon: BookOpen,
                      color: 'text-slate-600',
                      bg: 'bg-slate-50',
                    },
                    {
                      label: 'Manager',
                      value: extendedProposal?.sender || '매니저',
                      icon: Users,
                      color: 'text-slate-600',
                      bg: 'bg-slate-50',
                    },
                    {
                      label: 'Format',
                      value: extendedProposal?.format,
                      icon: Film,
                      color: 'text-slate-600',
                      bg: 'bg-slate-50',
                    },
                    {
                      label: '장르 설정',
                      value: extendedProposal?.strategy?.genres
                        ? extendedProposal?.strategy.genres.join(', ')
                        : extendedProposal?.strategy?.genre || '미지정',
                      icon: Sparkles,
                      color: 'text-amber-600',
                      bg: 'bg-amber-50',
                    },
                    {
                      label: '타겟 연령/성별',
                      value: `${
                        extendedProposal?.business?.targetAge?.join(', ') ||
                        '전연령'
                      } / ${
                        extendedProposal?.business?.targetGender === 'male'
                          ? '남성'
                          : extendedProposal?.business?.targetGender ===
                              'female'
                            ? '여성'
                            : '통합'
                      }`,
                      icon: Users,
                      color: 'text-blue-600',
                      bg: 'bg-blue-50',
                    },
                    {
                      label: '예산 규모',
                      value: extendedProposal?.business?.budgetRange || '미정',
                      icon: DollarSign,
                      color: 'text-green-600',
                      bg: 'bg-green-50',
                    },
                    // Format Specific Details
                    ...(extendedProposal?.format === 'webtoon'
                      ? [
                          {
                            label: '작화 스타일',
                            value:
                              [
                                {
                                  id: 'realistic',
                                  label: '실사체',
                                },
                                {
                                  id: 'casual',
                                  label: '캐주얼/SD',
                                },
                                {
                                  id: 'martial_arts',
                                  label: '무협/극화체',
                                },
                                {
                                  id: 'us_comics',
                                  label: '미국 코믹스',
                                },
                              ].find(
                                (i) =>
                                  i.id ===
                                  extendedProposal?.mediaDetails?.style,
                              )?.label || '미지정',
                            icon: ImageIcon,
                            color: 'text-pink-600',
                            bg: 'bg-pink-50',
                          },
                          {
                            label: '연출 호흡',
                            value:
                              [
                                {
                                  id: 'fast',
                                  label: '빠른 전개',
                                },
                                {
                                  id: 'emotional',
                                  label: '감정선 중심',
                                },
                                {
                                  id: 'suspense',
                                  label: '긴장감 조성',
                                },
                              ].find(
                                (i) =>
                                  i.id ===
                                  extendedProposal?.mediaDetails?.pacing,
                              )?.label || '미지정',
                            icon: Clock,
                            color: 'text-indigo-600',
                            bg: 'bg-indigo-50',
                          },
                          {
                            label: '엔딩 포인트',
                            value:
                              [
                                {
                                  id: 'cliffhanger',
                                  label: '절단신공',
                                },
                                {
                                  id: 'resolution',
                                  label: '에피소드 완결',
                                },
                                {
                                  id: 'preview',
                                  label: '다음 화 예고',
                                },
                              ].find(
                                (i) =>
                                  i.id ===
                                  extendedProposal?.mediaDetails?.endingPoint,
                              )?.label || '미지정',
                            icon: Target,
                            color: 'text-rose-600',
                            bg: 'bg-rose-50',
                          },
                        ]
                      : []),
                    ...(extendedProposal?.format === 'drama'
                      ? [
                          {
                            label: '편성 전략',
                            value:
                              extendedProposal?.mediaDetails?.seasonType ===
                              'limited'
                                ? '미니시리즈 (16부작)'
                                : extendedProposal?.mediaDetails?.seasonType ===
                                    'seasonal'
                                  ? '시즌제 드라마'
                                  : '일일/주말 드라마',
                            icon: Calendar,
                            color: 'text-pink-600',
                            bg: 'bg-pink-50',
                          },
                          {
                            label: '회차당 분량',
                            value: `${extendedProposal?.mediaDetails?.episodeDuration || 60}분`,
                            icon: Clock,
                            color: 'text-indigo-600',
                            bg: 'bg-indigo-50',
                          },
                        ]
                      : []),
                    ...(extendedProposal?.format === 'game'
                      ? [
                          {
                            label: '게임 장르',
                            value:
                              [
                                { id: 'rpg', label: 'RPG' },
                                {
                                  id: 'simulation',
                                  label: '시뮬레이션',
                                },
                                { id: 'action', label: '액션/어드벤처' },
                                {
                                  id: 'puzzle',
                                  label: '퍼즐/캐주얼',
                                },
                                { id: 'strategy', label: '전략/TCG' },
                                { id: 'sports', label: '스포츠/레이싱' },
                                { id: 'fps', label: '슈팅 (FPS/TPS)' },
                                {
                                  id: 'combat',
                                  label: '전투/경쟁',
                                },
                                {
                                  id: 'collection',
                                  label: '수집형',
                                },
                                { id: 'story', label: '비주얼 노벨' },
                              ].find(
                                (i) =>
                                  i.id ===
                                  extendedProposal?.mediaDetails?.gameGenre,
                              )?.label || '미지정',
                            icon: Gamepad2,
                            color: 'text-pink-600',
                            bg: 'bg-pink-50',
                          },
                          {
                            label: '플랫폼',
                            value:
                              [
                                { id: 'mobile', label: '모바일' },
                                { id: 'pc', label: 'PC' },
                                { id: 'console', label: '콘솔' },
                                {
                                  id: 'multi',
                                  label: '멀티플랫폼',
                                },
                              ].find(
                                (i) =>
                                  i.id ===
                                  extendedProposal?.mediaDetails?.platform,
                              )?.label || '미지정',
                            icon: Monitor,
                            color: 'text-indigo-600',
                            bg: 'bg-indigo-50',
                          },
                        ]
                      : []),
                    ...(extendedProposal?.format === 'spinoff'
                      ? [
                          {
                            label: '스핀오프 유형',
                            value:
                              [
                                { id: 'prequel', label: '프리퀄' },
                                { id: 'sequel', label: '시퀄' },
                                { id: 'side', label: '외전' },
                                { id: 'if', label: 'IF 스토리' },
                              ].find(
                                (i) =>
                                  i.id ===
                                  extendedProposal?.mediaDetails?.spinoffType,
                              )?.label || '미지정',
                            icon: GitBranch,
                            color: 'text-pink-600',
                            bg: 'bg-pink-50',
                          },
                          {
                            label: '주인공 캐릭터',
                            value:
                              extendedProposal?.mediaDetails?.targetCharacter ||
                              '미지정',
                            icon: User,
                            color: 'text-indigo-600',
                            bg: 'bg-indigo-50',
                          },
                        ]
                      : []),
                    ...(extendedProposal?.format === 'commercial'
                      ? [
                          {
                            label: '비주얼 포맷',
                            value:
                              [
                                { id: '2d', label: '2D 애니메이션' },
                                { id: '3d', label: '3D 그래픽' },
                                { id: 'live', label: '실사 촬영' },
                                {
                                  id: 'motion',
                                  label: '모션 그래픽',
                                },
                              ].find(
                                (i) =>
                                  i.id ===
                                  extendedProposal?.mediaDetails?.visualFormat,
                              )?.label || '미지정',
                            icon: ImageIcon,
                            color: 'text-pink-600',
                            bg: 'bg-pink-50',
                          },
                        ]
                      : []),
                    {
                      label: '제작 톤앤매너',
                      value: extendedProposal?.mediaDetails?.tone || '미지정',
                      icon: Palette,
                      color: 'text-purple-600',
                      bg: 'bg-purple-50',
                    },
                    {
                      label: '핵심 재미요소',
                      value:
                        extendedProposal?.mediaDetails?.coreLoop || '미지정',
                      icon: Zap,
                      color: 'text-yellow-600',
                      bg: 'bg-yellow-50',
                    },
                    {
                      label: '비즈니스 모델',
                      value:
                        extendedProposal?.mediaDetails?.bmStrategy || '미지정',
                      icon: BarChart,
                      color: 'text-cyan-600',
                      bg: 'bg-cyan-50',
                    },
                    {
                      label: '세계관 설정',
                      value:
                        extendedProposal?.mediaDetails?.worldSetting ||
                        '미지정',
                      icon: Globe,
                      color: 'text-emerald-600',
                      bg: 'bg-emerald-50',
                    },
                    {
                      label: '캐릭터 각색',
                      value:
                        extendedProposal?.mediaDetails?.characterAdaptation ||
                        '미지정',
                      icon: Users,
                      color: 'text-pink-600',
                      bg: 'bg-pink-50',
                    },
                    {
                      label: '플랫폼 전략',
                      value:
                        extendedProposal?.mediaDetails?.platformStrategy ||
                        '미지정',
                      icon: Smartphone,
                      color: 'text-blue-600',
                      bg: 'bg-blue-50',
                    },
                    {
                      label: '마케팅 포인트',
                      value:
                        extendedProposal?.mediaDetails?.marketingPoint ||
                        '미지정',
                      icon: Megaphone,
                      color: 'text-orange-600',
                      bg: 'bg-orange-50',
                    },
                    {
                      label: '추가 프롬프트',
                      value: extendedProposal?.mediaPrompt || '없음',
                      icon: MessageSquare,
                      color: 'text-slate-600',
                      bg: 'bg-slate-50',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-start gap-3"
                    >
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                          item.bg,
                          item.color,
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-500 mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm font-bold text-slate-800 truncate">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lorebooks */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-slate-600">
                    선택된 설정집
                  </div>
                  {extendedProposal?.selectedLorebooks &&
                  extendedProposal.selectedLorebooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {extendedProposal.selectedLorebooks.map(
                        (lorebook: any, i: number) => (
                          <div
                            key={i}
                            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 relative group"
                          >
                            <div className="flex justify-between items-start">
                              <div
                                className="font-bold text-slate-800 truncate pr-6"
                                title={lorebook.keyword}
                              >
                                {lorebook.name ||
                                  lorebook.keyword ||
                                  lorebook.title}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 absolute top-3 right-3 text-slate-400 hover:text-slate-600"
                                onClick={() =>
                                  setSelectedLorebookDetail(lorebook)
                                }
                              >
                                <Maximize2 className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="h-px bg-slate-50" />
                            <div className="text-xs text-slate-500 space-y-1.5">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">카테고리</span>
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] h-5"
                                >
                                  {lorebook.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-500 bg-slate-50 rounded-lg border border-dashed">
                      선택된 설정집이 없습니다.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="p-4 bg-white border-t flex items-center justify-between z-20">
            <Button
              variant="outline"
              onClick={() => setIsDetailOpen(false)}
              className="text-slate-500"
            >
              닫기
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => openActionDialog('REJECT')}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                반려하기
              </Button>
              <Button
                onClick={() => openActionDialog('APPROVE')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                승인하기
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Auxiliary Dialogs */}
      <Dialog open={showPdfFullScreen} onOpenChange={setShowPdfFullScreen}>
        <DialogContent className="!w-screen !h-screen !max-w-none rounded-none border-0 p-0 overflow-hidden bg-slate-50">
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <PdfPreview
              className="w-full h-full shadow-none border-0"
              isFullScreen={true}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="!w-screen !h-screen !max-w-none rounded-none border-0 p-0 overflow-hidden bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <VisualPreview
              className="w-full h-full object-contain"
              isFullScreen={true}
              project={extendedProposal}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedLorebookDetail}
        onOpenChange={() => setSelectedLorebookDetail(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>설정집 상세 정보</DialogTitle>
          </DialogHeader>
          {selectedLorebookDetail && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  {selectedLorebookDetail.name ||
                    selectedLorebookDetail.keyword ||
                    selectedLorebookDetail.title}
                </h3>
                <Badge>{selectedLorebookDetail.category}</Badge>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">작품</span>
                  <span className="font-medium">
                    {selectedLorebookDetail.workTitle || '-'}
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-sm text-slate-500">내용</h4>
                <div className="p-4 bg-white border rounded-lg min-h-[100px] text-sm leading-relaxed">
                  {selectedLorebookDetail.description || '내용이 없습니다.'}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setSelectedLorebookDetail(null)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Modal */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {actionType === 'APPROVE' ? '제안서 승인' : '제안서 반려'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'APPROVE'
                ? '제안서를 승인하고 계약 절차를 진행합니다. 승인 코멘트를 남겨주세요.'
                : '제안서를 반려합니다. 반려 사유를 입력해주세요.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4
                className={cn(
                  'font-bold text-sm flex items-center gap-2',
                  actionType === 'APPROVE' ? 'text-indigo-600' : 'text-red-600',
                )}
              >
                {actionType === 'APPROVE' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {actionType === 'APPROVE' ? '승인 코멘트' : '반려 사유'}
              </h4>
              <Textarea
                placeholder={
                  actionType === 'APPROVE'
                    ? '승인 코멘트를 입력해주세요. (선택 사항)'
                    : '반려 사유를 자세히 입력해주세요. (예: 설정 오류, 방향성 불일치 등)'
                }
                value={actionComment}
                onChange={(e) => setActionComment(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsActionDialogOpen(false)}
            >
              취소
            </Button>
            <Button
              variant={actionType === 'APPROVE' ? 'default' : 'destructive'}
              onClick={handleConfirmAction}
              className={
                actionType === 'APPROVE'
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : ''
              }
            >
              {actionType === 'APPROVE' ? '승인 확정' : '반려 확정'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

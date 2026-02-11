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
  Layout,
  Info,
  ClipboardList,
  File,
} from 'lucide-react';
import { IPProposalCommentDto, IPProposalDto } from '../../../types/author';
import { PdfPreview, VisualPreview } from '../../../components/ProjectPreviews';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/ui/tooltip';
import { SelectedSettingCard } from '../../../components/SelectedSettingCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../components/ui/alert-dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../api/axios';
import { cn } from '../../../components/ui/utils';
import { managerService } from '../../../services/managerService';
import { authorService } from '../../../services/authorService';
import { toast } from 'sonner';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Checkbox } from '../../../components/ui/checkbox';
import { AuthorBreadcrumbContext } from './AuthorBreadcrumbContext';

// Helper to highlight search matches
const HighlightText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  if (!highlight.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-yellow-100 font-medium text-yellow-900">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
};

// Formats definition
const formats = [
  {
    id: 'webtoon',
    title: '웹툰',
    icon: BookOpen,
    desc: '원작의 시각화 및 웹툰 플랫폼 연재',
    color: 'green',
  },
  {
    id: 'drama',
    title: '드라마',
    icon: Tv,
    desc: 'OTT 및 방송사 드라마 제작',
    color: 'purple',
  },
  {
    id: 'game',
    title: '게임',
    icon: Smartphone,
    desc: '모바일 및 PC 게임 개발',
    color: 'blue',
  },
  {
    id: 'movie',
    title: '영화',
    icon: Clapperboard,
    desc: '극장 상영용 장편 영화 제작',
    color: 'red',
  },
  {
    id: 'spinoff',
    title: '스핀오프',
    icon: Zap,
    desc: '조연 캐릭터 중심의 새로운 스토리',
    color: 'amber',
  },
  {
    id: 'commercial',
    title: '상업 이미지',
    icon: ImageIcon,
    desc: '광고 및 브랜드 콜라보레이션 이미지',
    color: 'pink',
  },
];

const SettingComparison = ({
  original,
  updated,
}: {
  original: any;
  updated: any;
}) => {
  if (!original && !updated) return null;

  const allKeys = Array.from(
    new Set([...Object.keys(original || {}), ...Object.keys(updated || {})]),
  );

  return (
    <div className="border rounded-md overflow-hidden text-xs">
      <div className="grid grid-cols-2 bg-slate-100 border-b font-bold text-slate-700">
        <div className="p-2 border-r flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-400" />
          기존 설정 (Original)
        </div>
        <div className="p-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          신규 설정 (Updated)
        </div>
      </div>
      {allKeys.map((key) => {
        const origVal = original?.[key];
        const newVal = updated?.[key];
        const isAdded = !origVal && newVal;
        const isDeleted = origVal && !newVal;
        const isModified =
          origVal &&
          newVal &&
          JSON.stringify(origVal) !== JSON.stringify(newVal);

        let origClass = 'p-2 border-r bg-white text-slate-600';
        let newClass = 'p-2 bg-white text-slate-600';

        if (isAdded) {
          newClass = 'p-2 bg-green-50 text-green-700 font-medium';
        } else if (isDeleted) {
          origClass =
            'p-2 border-r bg-red-50 text-red-700 font-medium decoration-red-300';
        } else if (isModified) {
          origClass = 'p-2 border-r bg-yellow-50 text-yellow-700';
          newClass = 'p-2 bg-yellow-50 text-yellow-700 font-medium';
        }

        const formatValue = (val: any) => {
          if (val === null || val === undefined) return '-';
          if (Array.isArray(val)) {
            if (val.length === 0) return '-';
            if (typeof val[0] === 'object') {
              return val.map((item, i) => (
                <div
                  key={i}
                  className="mb-1 last:mb-0 pl-2 border-l-2 border-slate-200"
                >
                  {Object.entries(item).map(([k, v]) => (
                    <div key={k} className="flex gap-1">
                      <span className="font-semibold text-slate-500">{k}:</span>
                      <span>{String(v)}</span>
                    </div>
                  ))}
                </div>
              ));
            }
            return val.join(', ');
          }
          if (typeof val === 'object') {
            return (
              <div className="pl-2 border-l-2 border-slate-200">
                {Object.entries(val).map(([k, v]) => (
                  <div key={k} className="flex gap-1">
                    <span className="font-semibold text-slate-500">{k}:</span>
                    <span>{String(v)}</span>
                  </div>
                ))}
              </div>
            );
          }
          return String(val);
        };

        return (
          <div key={key} className="grid grid-cols-2 border-b last:border-0">
            <div className={origClass}>
              <span className="font-bold mr-2 text-[10px] text-slate-400 block mb-1">
                {key}
              </span>
              {formatValue(origVal)}
            </div>
            <div className={newClass}>
              <span className="font-bold mr-2 text-[10px] text-slate-400 block mb-1">
                {key}
              </span>
              {formatValue(newVal)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LorebookContentViewer = ({
  content,
  keyword,
}: {
  content: string | object;
  keyword: string;
}) => {
  let parsedContent: any = content;

  if (typeof content === 'string') {
    try {
      if (content.startsWith('{') || content.startsWith('[')) {
        parsedContent = JSON.parse(content);
      }
    } catch (e) {
      // plain string
    }
  }

  if (typeof parsedContent === 'string') {
    return <div className="whitespace-pre-wrap">{parsedContent}</div>;
  }

  if (typeof parsedContent === 'object' && parsedContent !== null) {
    const entries = Object.entries(parsedContent).filter(([key]) => {
      // Filter out keys that match the keyword or generic name keys
      return (
        key !== keyword &&
        key !== '이름' &&
        key !== 'name' &&
        key !== '설정집명' &&
        key !== 'id'
      );
    });

    if (entries.length === 0) {
      return <div className="text-slate-500 italic">내용 없음</div>;
    }

    return (
      <div className="space-y-3">
        {entries.map(([key, value]) => (
          <div
            key={key}
            className="bg-slate-50 rounded p-3 border border-slate-100"
          >
            <div className="text-xs font-bold text-slate-500 mb-1">{key}</div>
            <div className="text-sm text-slate-800 whitespace-pre-wrap">
              {typeof value === 'object'
                ? JSON.stringify(value, null, 2)
                : String(value)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <div className="whitespace-pre-wrap">{String(content)}</div>;
};

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
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [generatedAuthorCode, setGeneratedAuthorCode] = useState('');

  const queryClient = useQueryClient();

  useEffect(() => {
    const breadcrumbs: { label: string; onClick?: () => void }[] = [
      { label: '홈', onClick: () => onNavigate('home') },
      { label: 'IP 제안서', onClick: () => setActiveTab('proposals') },
    ];

    setBreadcrumbs(breadcrumbs);
  }, [setBreadcrumbs, onNavigate, activeTab]);

  const { data: myManager, refetch: refetchMyManager } = useQuery({
    queryKey: ['author', 'my-manager'],
    queryFn: authorService.getMyManager,
  });

  const { data: me } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authorService.getMyPage,
  });

  // Fetch Proposals (Author's IP Expansion Comments)
  const { data: proposalsPage, isLoading: isProposalsLoading } = useQuery({
    queryKey: ['author', 'ip-proposals', me?.integrationId],
    queryFn: async () => {
      if (!me?.integrationId) return { content: [] };
      // Use author-specific comment proposals API as requested
      return authorService.getCommentProposals(me.integrationId);
    },
    enabled: !!me?.integrationId,
  });

  const proposalList = proposalsPage?.content || [];

  const handleOpenDetail = async (proposal: IPProposalDto) => {
    if (!me?.integrationId) return;
    // Ensure we have a manager ID to query the manager API
    const managerId = myManager?.managerIntegrationId;
    if (!managerId) {
      toast.error('담당 매니저 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      // Use Manager API for IP Expansion Detail as requested
      const detail = await managerService.getIPExpansionDetail(
        managerId,
        proposal.id,
      );
      setSelectedProposal(detail);
    } catch (error) {
      console.error('Failed to fetch detail:', error);
      toast.error('제안서 상세 정보를 불러오는데 실패했습니다.');
    }
  };

  const handleReviewAction = async (
    action: 'APPROVED' | 'REJECTED',
    comment: string,
  ) => {
    if (!selectedProposal || !me?.integrationId) return;

    try {
      const data = {
        proposalId: selectedProposal.id,
        authorIntegrationId: me.integrationId,
        status: action,
        comment,
      };

      if (action === 'APPROVED') {
        await authorService.createProposalComment(data);
        toast.success('제안서가 승인되었습니다.');
      } else {
        await authorService.createProposalComment(data);
        toast.success('제안서가 반려되었습니다.');
      }
      setSelectedProposal(null);
      queryClient.invalidateQueries({ queryKey: ['author', 'ip-proposals'] });
    } catch (error) {
      toast.error(
        `${action === 'APPROVED' ? '승인' : '반려'} 처리 중 오류가 발생했습니다.`,
      );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-20">
      {/* 담당 매니저 정보 카드 */}
      {myManager && myManager.managerName ? (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 dark:from-slate-900 dark:to-slate-900 dark:border-slate-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                {myManager.managerName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-slate-100">
                  담당 운영자: {myManager.managerName}
                </h3>
                <p className="text-sm text-blue-700 dark:text-slate-400">
                  {myManager.managerSiteEmail || myManager.managerEmail}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {!myManager?.managerIntegrationId ? (
                <div className="col-span-full h-60 flex flex-col items-center justify-center gap-3 text-slate-500 border-2 border-dashed border-slate-200 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-slate-300" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-slate-900">
                      담당 매니저와 연동되지 않았습니다
                    </p>
                    <p className="text-sm mt-1 text-slate-400">
                      매니저와 연동 후 제안서를 확인하실 수 있습니다.
                    </p>
                  </div>
                </div>
              ) : proposalList.length > 0 ? (
                proposalList.map((proposal) => {
                  const formatId = (
                    proposal.targetFormat || proposal.format
                  )?.toLowerCase();
                  const formatItem = formats.find((f) => f.id === formatId);
                  const Icon = formatItem?.icon || Zap;

                  return (
                    <Card
                      key={proposal.id}
                      className="group cursor-pointer hover:shadow-md transition-all border-slate-200 overflow-hidden"
                      onClick={() => handleOpenDetail(proposal)}
                    >
                      <CardHeader className="p-0">
                        <div
                          className={cn(
                            'h-16 bg-gradient-to-br relative overflow-hidden',
                            formatItem?.color === 'green'
                              ? 'from-green-50 to-green-100'
                              : formatItem?.color === 'purple'
                                ? 'from-purple-50 to-purple-100'
                                : formatItem?.color === 'blue'
                                  ? 'from-blue-50 to-blue-100'
                                  : formatItem?.color === 'red'
                                    ? 'from-red-50 to-red-100'
                                    : formatItem?.color === 'amber'
                                      ? 'from-amber-50 to-amber-100'
                                      : formatItem?.color === 'pink'
                                        ? 'from-pink-50 to-pink-100'
                                        : 'from-slate-50 to-slate-100',
                          )}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon
                              className={cn(
                                'w-6 h-6 opacity-20',
                                formatItem?.color === 'green'
                                  ? 'text-green-600'
                                  : formatItem?.color === 'purple'
                                    ? 'text-purple-600'
                                    : formatItem?.color === 'blue'
                                      ? 'text-blue-600'
                                      : formatItem?.color === 'red'
                                        ? 'text-red-600'
                                        : formatItem?.color === 'amber'
                                          ? 'text-amber-600'
                                          : formatItem?.color === 'pink'
                                            ? 'text-pink-600'
                                            : 'text-slate-600',
                              )}
                            />
                          </div>
                          <Badge className="absolute top-2 left-2 bg-white/90 shadow-sm backdrop-blur-sm text-slate-700 hover:bg-white/90 border-0 text-[10px] h-5 px-1.5">
                            {formatItem?.title ||
                              proposal.targetFormat ||
                              proposal.format ||
                              'Unknown'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pb-0">
                        <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors text-xs">
                          {proposal.title}
                        </h3>
                      </CardContent>
                      <div className="p-3 flex items-center justify-between text-[10px] text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {proposal.createdAt
                            ? new Date(proposal.createdAt).toLocaleDateString()
                            : '-'}
                        </div>
                        <Button
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-slate-100 rounded-full"
                        >
                          <ChevronRight className="h-3 w-3 text-slate-400" />
                        </Button>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-full h-60 flex flex-col items-center justify-center gap-3 text-slate-500 border-2 border-dashed border-slate-200 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-slate-300" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-slate-900">
                      도착한 제안서가 없습니다
                    </p>
                    <p className="text-sm mt-1 text-slate-400">
                      매니저로부터 새로운 IP 확장 제안이 오면 이곳에 표시됩니다.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Detail Modal */}
      {selectedProposal && (
        <AuthorProjectDetailModal
          project={selectedProposal}
          managerId={myManager?.managerIntegrationId}
          authorId={me?.integrationId}
          isOpen={!!selectedProposal}
          onClose={() => setSelectedProposal(null)}
          onAction={handleReviewAction}
        />
      )}

      {/* Author ID Generation Dialog */}
      <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>작가 ID 생성 완료</DialogTitle>
            <DialogDescription>
              아래 ID를 담당 운영자에게 전달하여 연동을 요청하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-slate-100 rounded text-center">
            <span className="text-2xl font-bold tracking-wider select-all">
              {generatedAuthorCode}
            </span>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsGenerateOpen(false)}>닫기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AuthorProjectDetailModal({
  project,
  managerId,
  authorId,
  isOpen,
  onClose,
  onAction,
}: {
  project: any;
  managerId?: string;
  authorId?: string;
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: 'APPROVED' | 'REJECTED', comment: string) => void;
}) {
  const queryClient = useQueryClient();
  const [showPdfFullScreen, setShowPdfFullScreen] = useState(false);
  const [showLorebookListModal, setShowLorebookListModal] = useState(false);
  const [lorebookFilter, setLorebookFilter] = useState('전체'); // New State
  const [selectedLorebookDetail, setSelectedLorebookDetail] =
    useState<any>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [actionType, setActionType] = useState<'APPROVED' | 'REJECTED'>(
    'APPROVED',
  );
  const [actionComment, setActionComment] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch existing comment if any
  const { data: existingComment, refetch: refetchComment } = useQuery({
    queryKey: ['author', 'proposal-comment-detail', project.id, authorId],
    queryFn: async () => {
      if (!authorId || !project.id) return null;
      try {
        const detail = await authorService.getProposalCommentDetail(
          project.id,
          authorId,
        );
        return detail?.myComment || null;
      } catch (e) {
        return null;
      }
    },
    enabled: !!authorId && showReviewModal && !!project.id,
  });

  // Sync existing comment to state when loaded
  useEffect(() => {
    if (existingComment) {
      // Map Korean status to English Enum if necessary
      // 백엔드에서 Enum Name이 아닌 Description(한글)을 반환하는 경우가 있어 매핑 처리
      const statusMap: Record<string, 'APPROVED' | 'REJECTED'> = {
        승인: 'APPROVED',
        반려: 'REJECTED',
        대기: 'APPROVED', // 대기 상태는 승인(기본값)으로 처리
        '승인 대기': 'APPROVED',
        미사용: 'APPROVED',
        APPROVED: 'APPROVED',
        REJECTED: 'REJECTED',
        PENDING: 'APPROVED',
        ARCHIVED: 'APPROVED',
      };

      const rawStatus = (existingComment.status || '').trim();
      const mappedStatus = statusMap[rawStatus] || 'APPROVED';

      console.log('Status Mapping:', { raw: rawStatus, mapped: mappedStatus });

      setActionType(mappedStatus);
      setActionComment(existingComment.comment);
    }
  }, [existingComment]);

  const { data: lorebooks } = useQuery({
    queryKey: ['author', 'proposal-lorebooks', managerId, project.id],
    queryFn: async () => {
      if (!managerId || !project.id) return [];
      return authorService.getManagerIPExpansionLorebooks(
        managerId,
        project.id.toString(),
      );
    },
    enabled: !!managerId && !!project.id,
  });

  // Fetch PDF Blob and create Object URL
  useEffect(() => {
    let active = true;
    const fetchPdf = async () => {
      if (!project.id) return;
      setIsLoadingPdf(true);
      try {
        // Use the API that returns a blob
        const blob = await managerService.getIPProposalPreview(project.id);

        // Check 1: Blob type
        if (blob.type === 'application/json') {
          console.warn('PDF Preview returned JSON type, likely DTO or error');
          return;
        }

        // Check 2: Header bytes (reliable for PDF)
        const header = await blob.slice(0, 10).text(); // Read first 10 bytes
        if (
          header.trim().startsWith('{') ||
          header.trim().startsWith('[') ||
          blob.type === 'application/json'
        ) {
          console.warn(
            'PDF Preview returned JSON content, likely DTO or error',
          );
          return;
        }

        if (blob && blob.size > 0) {
          const url = URL.createObjectURL(blob);
          if (active) setPdfBlobUrl(url);
        }
      } catch (e) {
        console.error('Failed to load PDF preview', e);
      } finally {
        if (active) setIsLoadingPdf(false);
      }
    };

    fetchPdf();

    return () => {
      active = false;
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [project.id]);

  const handleDownloadPdf = async () => {
    if (!project.id) {
      toast.error('PDF 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      const blob = await managerService.getIPProposalDownload(project.id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${project.title}_기획제안서.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      toast.error('PDF 다운로드에 실패했습니다.');
    }
  };

  const handleReviewSubmit = async () => {
    if (actionType === 'REJECTED' && !actionComment.trim()) {
      toast.error('반려 사유를 입력해주세요.');
      return;
    }

    if (!authorId) {
      toast.error('작가 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      if (existingComment) {
        const updateData = {
          authorIntegrationId: authorId,
          status: actionType,
          comment: actionComment,
        };
        await authorService.updateProposalComment(project.id, updateData);
        toast.success('검토 내용이 수정되었습니다.');
      } else {
        const createData = {
          proposalId: project.id,
          authorIntegrationId: authorId,
          status: actionType,
          comment: actionComment,
        };
        await authorService.createProposalComment(createData);
        toast.success(
          actionType === 'APPROVED'
            ? '제안서가 승인되었습니다.'
            : '제안서가 반려되었습니다.',
        );
      }

      await refetchComment();
      await queryClient.invalidateQueries({
        queryKey: ['author', 'ip-proposals'],
      });
      // Also invalidate the comment detail
      await queryClient.invalidateQueries({
        queryKey: ['author', 'proposal-comment-detail'],
      });
      setShowReviewModal(false);
      setIsEditMode(false);
    } catch (e) {
      toast.error('처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[85vw] lg:max-w-4xl max-h-[90vh] p-0 gap-0 rounded-xl overflow-y-auto flex flex-col bg-white shadow-2xl border-0">
          <ScrollArea className="flex-1">
            {/* Hero Header */}
            <div
              className={cn(
                'relative h-40 flex items-end p-6 overflow-hidden shrink-0',
                'bg-slate-50 border-b border-slate-100',
              )}
            >
              <div className="relative z-10 w-full flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-white border-slate-200 text-slate-500 hover:bg-slate-50 uppercase tracking-wider shadow-sm text-[10px]">
                      {project.targetFormat || project.format || 'FORMAT'}
                    </Badge>
                    <Badge
                      variant={
                        project.status === 'APPROVED'
                          ? 'default'
                          : project.status === 'PENDING_APPROVAL'
                            ? 'outline'
                            : 'destructive'
                      }
                      className={cn(
                        'border-0 text-[10px]',
                        project.status === 'APPROVED'
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : project.status === 'PENDING_APPROVAL'
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-rose-500 text-white hover:bg-rose-600',
                      )}
                    >
                      {project.status === 'APPROVED'
                        ? '승인'
                        : project.status === 'PENDING_APPROVAL'
                          ? '승인 대기'
                          : '반려'}
                    </Badge>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight">
                    {project.title}
                  </DialogTitle>
                  <div className="text-slate-500 text-xs mt-2 flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />{' '}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    <span className="w-0.5 h-3 bg-slate-300" />
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />{' '}
                      {project.authorName || '작가 미정'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* 1. PDF Preview */}
              <div className="w-full h-[500px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <PdfPreview
                  isFullScreen={false}
                  className="h-full w-full"
                  onFullScreen={() => setShowPdfFullScreen(true)}
                  pdfUrl={pdfBlobUrl || undefined}
                  onDownload={handleDownloadPdf}
                  isLoading={isLoadingPdf}
                />
              </div>

              {/* 2. Core Content Strategy (6 Grid) */}
              <section>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  핵심 내용 요약
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: '시장 전략 (Market Strategy)',
                      icon: Target,
                      content: project.expMarket,
                      color: 'text-rose-600',
                      bg: 'bg-rose-50',
                    },
                    {
                      title: '서사 기획 (Creative Narrative)',
                      icon: Zap,
                      content: project.expCreative,
                      color: 'text-indigo-600',
                      bg: 'bg-indigo-50',
                    },
                    {
                      title: '아트 컨셉 (Visual Concept)',
                      icon: ImageIcon,
                      content: project.expVisual,
                      color: 'text-pink-600',
                      bg: 'bg-pink-50',
                    },
                    {
                      title: '세계관 확장 (World Expansion)',
                      icon: Monitor,
                      content: project.expWorld,
                      color: 'text-purple-600',
                      bg: 'bg-purple-50',
                    },
                    {
                      title: '사업 모델 (Business Model)',
                      icon: BarChart,
                      content: project.expBusiness,
                      color: 'text-emerald-600',
                      bg: 'bg-emerald-50',
                    },
                    {
                      title: '기술 환경 (Technical Environment)',
                      icon: BookOpen,
                      content: project.expProduction,
                      color: 'text-blue-600',
                      bg: 'bg-blue-50',
                    },
                  ].map((item: any, i) => (
                    <Card
                      key={i}
                      className="border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2 text-slate-800">
                          <div className={`p-1.5 rounded-md ${item.bg}`}>
                            <item.icon
                              className={`w-3.5 h-3.5 ${item.color}`}
                            />
                          </div>
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                          {item.content || '내용이 없습니다.'}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 3. Input Setting Summary & Lorebooks */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800 pt-6 border-t border-slate-100">
                  <Settings className="w-5 h-5 text-slate-500" />
                  입력 설정 요약
                </h3>

                {/* Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      label: '원천 설정집 (Source Settings)',
                      value: `${project.lorebookIds?.length || 0}개`,
                      icon: BookOpen,
                      color: 'text-indigo-600',
                      bg: 'bg-indigo-50',
                      onClick: () => setShowLorebookListModal(true),
                    },
                    {
                      label: '포맷 (Format)',
                      value: project.targetFormat || project.format,
                      icon: Film,
                      color: 'text-slate-600',
                      bg: 'bg-slate-50',
                    },
                    {
                      label: '장르 (Genre)',
                      value: project.targetGenre || '미지정',
                      icon: Sparkles,
                      color: 'text-amber-600',
                      bg: 'bg-amber-50',
                    },
                    {
                      label: '타겟 (Target)',
                      value: `${
                        Array.isArray(project.targetAges)
                          ? project.targetAges.join(', ')
                          : project.targetAges || '전연령'
                      } / ${
                        project.targetGender === 'male'
                          ? '남성'
                          : project.targetGender === 'female'
                            ? '여성'
                            : '통합'
                      }`,
                      icon: Users,
                      color: 'text-blue-600',
                      bg: 'bg-blue-50',
                    },
                    {
                      label: '예산 (Budget)',
                      value:
                        project.budgetScale === 'SMALL'
                          ? '저예산'
                          : project.budgetScale === 'LARGE'
                            ? '블록버스터'
                            : project.budgetScale === 'MEDIUM'
                              ? '중형 예산'
                              : project.budgetScale || '미정',
                      icon: DollarSign,
                      color: 'text-green-600',
                      bg: 'bg-green-50',
                    },
                    {
                      label: '세계관 설정 (World)',
                      value:
                        project.worldSetting === 'SHARED'
                          ? '공유 세계관'
                          : project.worldSetting === 'ORIGINAL'
                            ? '독자 세계관'
                            : project.worldSetting === 'PARALLEL'
                              ? '평행 우주'
                              : project.worldSetting || '미지정',
                      icon: Globe,
                      color: 'text-indigo-600',
                      bg: 'bg-indigo-50',
                    },
                    {
                      label: '톤앤매너 (Tone)',
                      value: project.toneAndManner || '미지정',
                      icon: Palette,
                      color: 'text-purple-600',
                      bg: 'bg-purple-50',
                    },
                    // Format Specific Details
                    ...((project.targetFormat === 'WEBTOON' ||
                      project.format === 'webtoon') &&
                    (project.mediaDetail || project.mediaDetails)
                      ? [
                          {
                            label: '작화 스타일',
                            value:
                              (project.mediaDetail || project.mediaDetails)
                                ?.style || '미지정',
                            icon: ImageIcon,
                            color: 'text-pink-600',
                            bg: 'bg-pink-50',
                          },
                          {
                            label: '연출 호흡',
                            value:
                              (project.mediaDetail || project.mediaDetails)
                                ?.pacing || '미지정',
                            icon: Clock,
                            color: 'text-indigo-600',
                            bg: 'bg-indigo-50',
                          },
                          {
                            label: '엔딩 포인트',
                            value:
                              (project.mediaDetail || project.mediaDetails)
                                ?.endingPoint || '미지정',
                            icon: Target,
                            color: 'text-rose-600',
                            bg: 'bg-rose-50',
                          },
                        ]
                      : []),
                    ...((project.targetFormat === 'DRAMA' ||
                      project.format === 'drama') &&
                    (project.mediaDetail || project.mediaDetails)
                      ? [
                          {
                            label: '시즌 구성',
                            value:
                              (project.mediaDetail || project.mediaDetails)
                                ?.seasonType || '미지정',
                            icon: Calendar,
                            color: 'text-pink-600',
                            bg: 'bg-pink-50',
                          },
                          {
                            label: '회차당 분량',
                            value: `${(project.mediaDetail || project.mediaDetails)?.episodeDuration || 60}분`,
                            icon: Clock,
                            color: 'text-indigo-600',
                            bg: 'bg-indigo-50',
                          },
                          {
                            label: '서브 포커스',
                            value:
                              (project.mediaDetail || project.mediaDetails)
                                ?.subFocus || '미지정',
                            icon: Zap,
                            color: 'text-yellow-600',
                            bg: 'bg-yellow-50',
                          },
                        ]
                      : []),
                    ...((project.targetFormat === 'MOVIE' ||
                      project.format === 'movie') &&
                    (project.mediaDetail || project.mediaDetails)
                      ? [
                          {
                            label: '러닝타임',
                            value: `${(project.mediaDetail || project.mediaDetails)?.runningTime || 120}분`,
                            icon: Clock,
                            color: 'text-indigo-600',
                            bg: 'bg-indigo-50',
                          },
                          {
                            label: '컬러 테마',
                            value:
                              (project.mediaDetail || project.mediaDetails)
                                ?.colorTheme || '미지정',
                            icon: Palette,
                            color: 'text-purple-600',
                            bg: 'bg-purple-50',
                          },
                          {
                            label: '중점 막(Act)',
                            value:
                              (project.mediaDetail || project.mediaDetails)
                                ?.focusAct || '미지정',
                            icon: Layout,
                            color: 'text-emerald-600',
                            bg: 'bg-emerald-50',
                          },
                        ]
                      : []),
                  ].map((item: any, i) => (
                    <div
                      key={i}
                      onClick={item.onClick}
                      className={`flex items-start gap-3 p-3 rounded-lg border border-slate-100 ${item.bg} ${
                        item.onClick
                          ? 'cursor-pointer hover:bg-opacity-80 transition-colors'
                          : ''
                      }`}
                    >
                      <div className={`p-1.5 rounded-md bg-white/60 shrink-0`}>
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {item.value || '-'}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Add Prompt (Full Width) */}
                  {project.addPrompt && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <div className="p-1.5 rounded-md bg-white/60 shrink-0">
                        <MessageSquare className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-0.5">
                          추가 요청사항 (Prompt)
                        </p>
                        <p className="text-sm font-medium text-slate-900 whitespace-pre-wrap leading-relaxed">
                          {project.addPrompt}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="p-4 bg-white border-t flex items-center justify-between z-20">
            <Button
              variant="outline"
              onClick={onClose}
              className="text-slate-500"
            >
              닫기
            </Button>
            <div className="flex gap-2">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                onClick={() => setShowReviewModal(true)}
              >
                <Check className="w-4 h-4" />
                검토
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {existingComment && !isEditMode
                ? '제안서 검토 내역'
                : '제안서 검토'}
            </DialogTitle>
            <DialogDescription>
              {existingComment && !isEditMode
                ? '작성된 검토 내용을 확인합니다.'
                : '제안서에 대한 승인 또는 반려 결정을 내려주세요.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {existingComment && !isEditMode ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-500">
                    상태:
                  </span>
                  <Badge
                    variant={
                      existingComment.status === '승인'
                        ? 'default'
                        : 'destructive'
                    }
                    className={
                      existingComment.status === '승인'
                        ? 'bg-emerald-500'
                        : 'bg-rose-500'
                    }
                  >
                    {existingComment.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-medium text-slate-500">
                    코멘트:
                  </span>
                  <div className="p-3 bg-slate-50 rounded-md text-sm text-slate-700 whitespace-pre-wrap">
                    {existingComment.comment || '내용 없음'}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => setActionType('APPROVED')}
                    className={cn(
                      'cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all duration-200',
                      actionType === 'APPROVED'
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50',
                    )}
                  >
                    <div
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                        actionType === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-slate-100 text-slate-400',
                      )}
                    >
                      <Check className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <div
                        className={cn(
                          'font-bold',
                          actionType === 'APPROVED'
                            ? 'text-emerald-700'
                            : 'text-slate-600',
                        )}
                      >
                        승인 (Approve)
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        제안서를 승인하고 다음 단계로 진행합니다
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setActionType('REJECTED')}
                    className={cn(
                      'cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all duration-200',
                      actionType === 'REJECTED'
                        ? 'border-rose-500 bg-rose-50/50'
                        : 'border-slate-200 hover:border-rose-200 hover:bg-slate-50',
                    )}
                  >
                    <div
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                        actionType === 'REJECTED'
                          ? 'bg-rose-100 text-rose-600'
                          : 'bg-slate-100 text-slate-400',
                      )}
                    >
                      <X className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <div
                        className={cn(
                          'font-bold',
                          actionType === 'REJECTED'
                            ? 'text-rose-700'
                            : 'text-slate-600',
                        )}
                      >
                        반려 (Reject)
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        제안서를 반려하고 사유를 전달합니다
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    {actionType === 'APPROVED' ? '승인 사유' : '반려 사유'}
                  </Label>
                  <Textarea
                    placeholder={
                      actionType === 'APPROVED'
                        ? '승인 관련 전달사항이 있다면 입력해주세요.'
                        : '반려 사유를 상세히 입력해주세요.'
                    }
                    value={actionComment}
                    onChange={(e) => setActionComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            {existingComment && !isEditMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowReviewModal(false)}
                >
                  닫기
                </Button>
                <Button
                  onClick={() => setIsEditMode(true)}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  수정
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (existingComment) {
                      setIsEditMode(false);
                      setActionType(existingComment.status);
                      setActionComment(existingComment.comment);
                    } else {
                      setShowReviewModal(false);
                    }
                  }}
                >
                  취소
                </Button>
                <Button onClick={handleReviewSubmit}>
                  {existingComment ? '수정완료' : '제출하기'}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Lorebook Detail Modal */}
      <Dialog
        open={!!selectedLorebookDetail}
        onOpenChange={() => setSelectedLorebookDetail(null)}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedLorebookDetail?.title || selectedLorebookDetail?.name}
            </DialogTitle>
            <DialogDescription>설정집 상세 내용</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <LorebookContentViewer
              content={selectedLorebookDetail?.content}
              keyword={
                selectedLorebookDetail?.title || selectedLorebookDetail?.name
              }
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showLorebookListModal}
        onOpenChange={setShowLorebookListModal}
      >
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col bg-slate-50">
          <DialogHeader className="px-1">
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              원천 데이터 상세
            </DialogTitle>
            {/* Filter Bar */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {['전체', '인물', '장소', '물건', '집단', '세계', '사건'].map(
                (cat) => (
                  <Button
                    key={cat}
                    variant={lorebookFilter === cat ? 'default' : 'outline'}
                    size="sm"
                    className="h-7 text-xs rounded-full px-3 shrink-0"
                    onClick={() => setLorebookFilter(cat)}
                  >
                    {cat}
                  </Button>
                ),
              )}
            </div>
          </DialogHeader>
          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              {lorebooks
                ?.filter(
                  (lb: any) =>
                    lorebookFilter === '전체' || lb.category === lorebookFilter,
                )
                .map((lorebook: any, index: number) => {
                  // Determine if this is the core lorebook (first item in the original list)
                  const isCore =
                    lorebooks.length > 0 &&
                    lorebook.lorebookId === lorebooks[0].lorebookId;

                  return (
                    <SelectedSettingCard
                      key={lorebook.lorebookId}
                      item={lorebook}
                      onRemove={() => {}}
                      isCrown={isCore}
                      hideRemove={true}
                    />
                  );
                })}
              {(!lorebooks ||
                lorebooks.filter(
                  (lb: any) =>
                    lorebookFilter === '전체' || lb.category === lorebookFilter,
                ).length === 0) && (
                <div className="col-span-full py-12 text-center text-slate-500">
                  해당 카테고리의 설정집이 없습니다.
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4 mt-2 border-t">
            <Button
              variant="outline"
              onClick={() => setShowLorebookListModal(false)}
            >
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PDF Full Screen Modal */}
      <Dialog open={showPdfFullScreen} onOpenChange={setShowPdfFullScreen}>
        <DialogContent className="!w-screen !h-screen !max-w-none rounded-none border-0 p-0 overflow-y-auto bg-slate-50">
          <div className="relative w-full min-h-full flex items-center justify-center p-8">
            <PdfPreview
              className="w-full h-full shadow-none border-0"
              isFullScreen={true}
              pdfUrl={pdfBlobUrl || undefined}
              onDownload={handleDownloadPdf}
              isLoading={isLoadingPdf}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { useState, useEffect, useContext } from 'react';
import { AuthorBreadcrumbContext } from './AuthorBreadcrumbContext';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../../components/ui/resizable';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/ui/tooltip';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import {
  Save,
  Sidebar,
  Maximize2,
  Minimize2,
  PanelRightClose,
  PanelLeftClose,
  PanelRightOpen,
  PanelLeftOpen,
  BookOpen,
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authorService } from '../../../services/authorService';
import { AuthorWorkExplorer } from './AuthorWorkExplorer';
import { AuthorLorebookPanel } from './AuthorLorebookPanel';
import { EpisodeDto, WorkResponseDto } from '../../../types/author';
import { cn } from '../../../components/ui/utils';
import { toast } from 'sonner';

interface AuthorWorksProps {
  integrationId: string;
}

export function AuthorWorks({ integrationId }: AuthorWorksProps) {
  const queryClient = useQueryClient();
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeDto | null>(
    null,
  );

  const { setBreadcrumbs, onNavigate } = useContext(AuthorBreadcrumbContext);

  // Panel States
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  // Editor State
  const [editorContent, setEditorContent] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  // Fetch Works
  const { data: works } = useQuery({
    queryKey: ['author', 'works'],
    queryFn: () => authorService.getWorks(integrationId),
  });

  // Fetch Episode Content
  const { data: episodeDetail, isLoading: isEpisodeLoading } = useQuery({
    queryKey: ['author', 'episode', selectedWorkId, selectedEpisode?.id],
    queryFn: () =>
      selectedWorkId && selectedEpisode
        ? authorService.getEpisodeDetail(
            selectedWorkId.toString(),
            selectedEpisode.id.toString(),
          )
        : null,
    enabled: !!selectedWorkId && !!selectedEpisode,
  });

  // Sync content when episode detail loads
  useEffect(() => {
    if (episodeDetail) {
      setEditorContent(episodeDetail.content);
      setIsDirty(false);
    }
  }, [episodeDetail]);

  // Update Breadcrumbs
  useEffect(() => {
    const breadcrumbs: { label: string; onClick?: () => void }[] = [
      { label: '홈', onClick: () => onNavigate('home') },
      {
        label: '작품 관리',
        onClick: () => {
          setSelectedWorkId(null);
          setSelectedEpisode(null);
        },
      },
    ];

    if (selectedWorkId && works) {
      const work = works.find((w) => w.id === selectedWorkId);
      if (work) {
        breadcrumbs.push({
          label: work.title,
          onClick: () => {
            setSelectedEpisode(null);
          },
        });
      }
    }

    if (selectedEpisode) {
      breadcrumbs.push({
        label: selectedEpisode.title,
      });
    }

    setBreadcrumbs(breadcrumbs);
  }, [selectedWorkId, selectedEpisode, works, setBreadcrumbs, onNavigate]);

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!selectedWorkId || !selectedEpisode) return;
      await authorService.updateEpisode(
        selectedWorkId.toString(),
        selectedEpisode.id.toString(),
        editorContent,
      );
    },
    onSuccess: () => {
      toast.success('저장되었습니다.');
      setIsDirty(false);
      queryClient.invalidateQueries({
        queryKey: ['author', 'episode', selectedWorkId, selectedEpisode?.id],
      });
    },
  });

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
    setIsDirty(true);
  };

  const handleSelectWork = (workId: number) => {
    setSelectedWorkId(workId);
    // Don't clear episode if it belongs to the same work?
    // For now, clear to force selection
    if (selectedWorkId !== workId) {
      setSelectedEpisode(null);
      setEditorContent('');
    }
  };

  const handleSelectEpisode = (workId: number, episode: EpisodeDto) => {
    if (isDirty) {
      if (!confirm('작성 중인 내용이 저장되지 않았습니다. 이동하시겠습니까?')) {
        return;
      }
    }
    setSelectedWorkId(workId);
    setSelectedEpisode(episode);
    setIsRightSidebarOpen(true); // Auto-open lorebook when episode selected
  };

  return (
    <div className="h-[calc(100vh-6rem)] -m-4 bg-background">
      <ResizablePanelGroup direction="horizontal">
        {/* Left Sidebar: Work Explorer */}
        {isLeftSidebarOpen && (
          <>
            <ResizablePanel defaultSize={20} minSize={15}>
              <AuthorWorkExplorer
                works={works || []}
                selectedWorkId={selectedWorkId}
                selectedEpisodeId={selectedEpisode?.id || null}
                onSelectWork={handleSelectWork}
                onSelectEpisode={handleSelectEpisode}
                className="h-full"
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
          </>
        )}

        {/* Center: Editor */}
        <ResizablePanel defaultSize={55} minSize={30}>
          <div className="flex flex-col h-full">
            {/* Editor Toolbar */}
            <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-card">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                  title={
                    isLeftSidebarOpen ? '사이드바 접기' : '사이드바 펼치기'
                  }
                >
                  {isLeftSidebarOpen ? (
                    <PanelLeftClose className="w-4 h-4" />
                  ) : (
                    <PanelLeftOpen className="w-4 h-4" />
                  )}
                </Button>

                {selectedEpisode ? (
                  <span className="text-sm font-medium flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {works?.find((w) => w.id === selectedWorkId)?.title}
                    </span>
                    <span className="text-muted-foreground">/</span>
                    <span>{selectedEpisode.title}</span>
                    {isDirty && (
                      <span className="text-xs text-orange-500 font-normal">
                        (수정됨)
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    작품과 회차를 선택해주세요
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => saveMutation.mutate()}
                  disabled={
                    !selectedEpisode || !isDirty || saveMutation.isPending
                  }
                >
                  <Save className="w-4 h-4 mr-2" />
                  저장
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                  disabled={!selectedEpisode}
                  title={isRightSidebarOpen ? '설정집 접기' : '설정집 펼치기'}
                >
                  {isRightSidebarOpen ? (
                    <PanelRightClose className="w-4 h-4" />
                  ) : (
                    <PanelRightOpen className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 relative bg-background">
              {selectedEpisode ? (
                isEpisodeLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    데이터를 불러오는 중입니다...
                  </div>
                ) : (
                  <Textarea
                    value={editorContent}
                    onChange={handleEditorChange}
                    className="w-full h-full resize-none border-none focus-visible:ring-0 p-8 text-lg leading-relaxed font-serif"
                    placeholder="여기에 내용을 작성하세요..."
                  />
                )
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-4">
                  <BookOpen className="w-12 h-12 opacity-20" />
                  <p>왼쪽 목록에서 작품과 회차를 선택하여 집필을 시작하세요.</p>
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>

        {/* Right Sidebar: Lorebook */}
        {isRightSidebarOpen && selectedEpisode && selectedWorkId && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25} minSize={20}>
              <AuthorLorebookPanel workId={selectedWorkId} className="h-full" />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}

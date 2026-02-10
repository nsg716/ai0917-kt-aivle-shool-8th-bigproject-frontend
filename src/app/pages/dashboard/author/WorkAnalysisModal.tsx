import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Button } from '../../../components/ui/button';
import { Checkbox } from '../../../components/ui/checkbox';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Label } from '../../../components/ui/label';
import { Loader2, X, GitGraph, Clock, PlayCircle } from 'lucide-react';
// import mermaid from 'mermaid'; // Lazy load instead
import { authorService } from '../../../services/authorService';
import { useQuery, useMutation } from '@tanstack/react-query';
import { cn } from '../../../components/ui/utils';

interface WorkAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  workId: number | null;
  userId: string;
}

export function WorkAnalysisModal({
  isOpen,
  onClose,
  workId,
  userId,
}: WorkAnalysisModalProps) {
  const [activeTab, setActiveTab] = useState('relationship');
  const [relationshipChart, setRelationshipChart] = useState<string>('');
  const [timelineChart, setTimelineChart] = useState<string>('');
  const [selectedEpisodes, setSelectedEpisodes] = useState<number[]>([]);

  // Initialize mermaid lazily in MermaidChart component

  // Relationship Analysis Mutation
  const analyzeRelationshipMutation = useMutation({
    mutationFn: async () => {
      if (!workId) return;
      return await authorService.analyzeRelationship(workId, userId, '*');
    },
    onSuccess: (data) => {
      if (data) {
        setRelationshipChart(data);
      }
    },
  });

  // Fetch relationship analysis when modal opens
  useEffect(() => {
    if (isOpen && workId && activeTab === 'relationship' && !relationshipChart) {
      analyzeRelationshipMutation.mutate();
    }
  }, [isOpen, workId, activeTab]);

  const { data: episodes, isLoading: isLoadingEpisodes } = useQuery({
    queryKey: ['timeline-episodes', workId],
    queryFn: () => (workId ? authorService.getTimelineEpisodes(workId) : []),
    enabled: isOpen && !!workId && activeTab === 'timeline',
  });

  const analyzeTimelineMutation = useMutation({
    mutationFn: async () => {
      if (!workId || selectedEpisodes.length === 0) return;
      return await authorService.analyzeTimeline(workId, userId, selectedEpisodes);
    },
    onSuccess: (data) => {
      if (data) {
        setTimelineChart(data);
      }
    },
  });

  const toggleEpisode = (episodeId: number) => {
    setSelectedEpisodes((prev) =>
      prev.includes(episodeId)
        ? prev.filter((id) => id !== episodeId)
        : [...prev, episodeId]
    );
  };

  const handleSelectAll = () => {
    if (!episodes) return;
    if (selectedEpisodes.length === episodes.length) {
      setSelectedEpisodes([]);
    } else {
      setSelectedEpisodes(episodes.map((ep) => ep.id));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[85vh] flex flex-col p-0 gap-0 bg-white">
        <DialogHeader className="p-6 border-b shrink-0 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">작품 심층 분석</DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="px-6 pt-4 border-b bg-slate-50/50">
            <TabsList className="bg-slate-100">
              <TabsTrigger value="relationship" className="gap-2">
                <GitGraph className="w-4 h-4" />
                인물 관계도
              </TabsTrigger>
              <TabsTrigger value="timeline" className="gap-2">
                <Clock className="w-4 h-4" />
                사건 타임라인
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden bg-slate-50">
            <TabsContent value="relationship" className="h-full mt-0 p-6">
              <div className="bg-white rounded-xl shadow-sm border p-6 h-full flex items-center justify-center overflow-auto relative">
                {analyzeRelationshipMutation.isPending ? (
                  <div className="flex flex-col items-center justify-center gap-4 text-slate-500">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    <p>전체 인물 관계도를 분석하고 있습니다...</p>
                  </div>
                ) : relationshipChart ? (
                  <MermaidChart
                    chart={relationshipChart}
                    id="relationship-chart"
                  />
                ) : (
                  <div className="text-center text-slate-500">
                    <Button 
                      onClick={() => analyzeRelationshipMutation.mutate()}
                      variant="outline"
                    >
                      <GitGraph className="w-4 h-4 mr-2" />
                      관계도 분석 시작
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="timeline" className="h-full mt-0 flex flex-row">
              {/* Episode Selection Sidebar */}
              <div className="w-80 bg-white border-r flex flex-col">
                <div className="p-4 border-b flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-medium text-sm text-slate-700">에피소드 선택</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSelectAll}
                    className="h-8 text-xs"
                  >
                    {episodes && selectedEpisodes.length === episodes.length
                      ? '전체 해제'
                      : '전체 선택'}
                  </Button>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  {isLoadingEpisodes ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                    </div>
                  ) : episodes && episodes.length > 0 ? (
                    <div className="space-y-3">
                      {episodes.map((ep) => (
                        <div key={ep.id} className="flex items-start space-x-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                          <Checkbox
                            id={`ep-${ep.id}`}
                            checked={selectedEpisodes.includes(ep.id)}
                            onCheckedChange={() => toggleEpisode(ep.id)}
                            className="mt-1"
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor={`ep-${ep.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {ep.ep_num}화. {ep.subtitle}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 text-center py-4">
                      등록된 에피소드가 없습니다.
                    </p>
                  )}
                </ScrollArea>

                <div className="p-4 border-t bg-slate-50/50">
                  <Button 
                    className="w-full gap-2" 
                    onClick={() => analyzeTimelineMutation.mutate()}
                    disabled={selectedEpisodes.length === 0 || analyzeTimelineMutation.isPending}
                  >
                    {analyzeTimelineMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <PlayCircle className="w-4 h-4" />
                    )}
                    선택한 에피소드 분석
                  </Button>
                </div>
              </div>

              {/* Chart Area */}
              <div className="flex-1 p-6 overflow-hidden flex flex-col">
                <div className="bg-white rounded-xl shadow-sm border p-6 flex-1 flex items-center justify-center overflow-auto relative">
                  {timelineChart ? (
                    <MermaidChart
                      chart={timelineChart}
                      id="timeline-chart"
                    />
                  ) : (
                    <div className="text-center text-slate-500">
                      <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>좌측에서 에피소드를 선택하여 분석을 시작하세요.</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="p-4 border-t bg-white flex justify-end shrink-0">
          <Button onClick={onClose} variant="outline">
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MermaidChart({ chart, id }: { chart: string; id: string }) {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!chart) return;
      try {
        setError(null);
        // Dynamically import mermaid
        const mermaid = (await import('mermaid')).default;
        
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'Pretendard, sans-serif',
        });

        // Clear previous SVG to prevent ID conflicts or artifacts if needed
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (e) {
        console.error('Mermaid render error:', e);
        setError('차트를 렌더링하는 중 오류가 발생했습니다.');
      }
    };
    
    // Slight delay to ensure DOM is ready and prevent race conditions
    const timer = setTimeout(() => {
      renderChart();
    }, 100);

    return () => clearTimeout(timer);
  }, [chart, id]);

  if (error) {
    return (
      <div className="text-red-500 text-sm flex flex-col items-center gap-2">
        <X className="w-6 h-6" />
        {error}
        <pre className="text-xs bg-slate-100 p-2 rounded mt-2 max-w-lg overflow-auto">
          {chart}
        </pre>
      </div>
    );
  }

  return (
    <div
      className="mermaid w-full h-full flex items-center justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

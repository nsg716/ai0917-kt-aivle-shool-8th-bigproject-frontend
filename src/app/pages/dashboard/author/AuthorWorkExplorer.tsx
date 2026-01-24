import { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Book,
  FileText,
  Plus,
  MoreVertical,
  Folder,
  File,
  Loader2,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { ScrollArea } from '../../../components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { cn } from '../../../components/ui/utils';
import { useQuery } from '@tanstack/react-query';
import { authorService } from '../../../services/authorService';
import { WorkResponseDto, EpisodeDto } from '../../../types/author';

interface AuthorWorkExplorerProps {
  works: WorkResponseDto[];
  selectedWorkId: number | null;
  selectedEpisodeId: number | null;
  onSelectWork: (workId: number) => void;
  onSelectEpisode: (workId: number, episode: EpisodeDto) => void;
  className?: string;
}

export function AuthorWorkExplorer({
  works,
  selectedWorkId,
  selectedEpisodeId,
  onSelectWork,
  onSelectEpisode,
  className,
}: AuthorWorkExplorerProps) {
  return (
    <div
      className={cn(
        'flex flex-col h-full border-r border-border bg-card/50',
        className,
      )}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <span className="font-semibold text-sm flex items-center gap-2">
          <Folder className="w-4 h-4 text-blue-500" />내 작품
        </span>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {works.map((work) => (
            <WorkItem
              key={work.id}
              work={work}
              isSelected={selectedWorkId === work.id}
              selectedEpisodeId={selectedEpisodeId}
              onSelectWork={onSelectWork}
              onSelectEpisode={onSelectEpisode}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

interface WorkItemProps {
  work: WorkResponseDto;
  isSelected: boolean;
  selectedEpisodeId: number | null;
  onSelectWork: (id: number) => void;
  onSelectEpisode: (workId: number, episode: EpisodeDto) => void;
}

function WorkItem({
  work,
  isSelected,
  selectedEpisodeId,
  onSelectWork,
  onSelectEpisode,
}: WorkItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Fetch episodes when opened
  const { data: episodes, isLoading } = useQuery({
    queryKey: ['author', 'work', work.id, 'episodes'],
    queryFn: () => authorService.getEpisodes(work.id.toString()),
    enabled: isOpen,
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      onSelectWork(work.id);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-1">
      <div
        className={cn(
          'flex items-center w-full p-2 rounded-md hover:bg-accent/50 group cursor-pointer text-sm transition-colors',
          isSelected && 'bg-accent text-accent-foreground',
        )}
        onClick={handleToggle}
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 mr-2 shrink-0"
          >
            {isOpen ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </Button>
        </CollapsibleTrigger>
        <Book className="w-4 h-4 mr-2 text-blue-500 shrink-0" />
        <span className="truncate flex-1 text-left">{work.title}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>작품 설정</DropdownMenuItem>
            <DropdownMenuItem>새 에피소드</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CollapsibleContent className="pl-6 space-y-1">
        {isLoading ? (
          <div className="flex items-center py-2 px-2 text-xs text-muted-foreground">
            <Loader2 className="w-3 h-3 mr-2 animate-spin" />
            로딩 중...
          </div>
        ) : (
          episodes?.map((episode) => (
            <div
              key={episode.id}
              className={cn(
                'flex items-center p-2 rounded-md hover:bg-accent/50 cursor-pointer text-xs transition-colors',
                selectedEpisodeId === episode.id &&
                  'bg-accent text-accent-foreground font-medium',
              )}
              onClick={(e) => {
                e.stopPropagation();
                onSelectEpisode(work.id, episode);
              }}
            >
              <FileText className="w-3 h-3 mr-2 text-muted-foreground" />
              <span className="truncate">{episode.title}</span>
            </div>
          ))
        )}
        {episodes?.length === 0 && (
          <div className="py-2 px-2 text-xs text-muted-foreground italic">
            에피소드가 없습니다.
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

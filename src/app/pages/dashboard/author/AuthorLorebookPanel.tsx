import { useState } from 'react';
import {
  Users,
  Globe,
  BookOpen,
  Plus,
  Settings,
  Sparkles,
  Download,
  Loader2,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { cn } from '../../../components/ui/utils';
import { useQuery } from '@tanstack/react-query';
import { authorService } from '../../../services/authorService';
import { LorebookCharacterDto } from '../../../types/author';

interface AuthorLorebookPanelProps {
  workId: number;
  className?: string;
}

export function AuthorLorebookPanel({
  workId,
  className,
}: AuthorLorebookPanelProps) {
  // Fetch Lorebook/Work details
  const { data: work } = useQuery({
    queryKey: ['author', 'work', workId],
    queryFn: () => authorService.getWorkDetail(workId.toString()),
  });

  // Fetch Characters
  const { data: characters, isLoading: isCharactersLoading } = useQuery<
    LorebookCharacterDto[]
  >({
    queryKey: ['author', 'work', workId, 'characters'],
    queryFn: () => authorService.getLorebookCharacters(workId.toString()),
  });

  return (
    <div
      className={cn(
        'flex flex-col h-full border-l border-border bg-card/50',
        className,
      )}
    >
      <div className="p-4 border-b border-border flex items-center justify-between bg-card">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Settings className="w-4 h-4 text-purple-500" />
          설정집
        </h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            title="AI 재분석"
          >
            <Sparkles className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            title="내보내기"
          >
            <Download className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="p-3 border-b border-border bg-muted/20">
        <h4 className="text-xs font-medium text-muted-foreground mb-1">
          현재 작품
        </h4>
        <p className="text-sm font-bold truncate">
          {work?.title || '작품 로딩 중...'}
        </p>
      </div>

      <Tabs defaultValue="characters" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0 h-10">
          <TabsTrigger
            value="characters"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-10 text-xs"
          >
            <Users className="w-3 h-3 mr-1" /> 인물
          </TabsTrigger>
          <TabsTrigger
            value="worldview"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-10 text-xs"
          >
            <Globe className="w-3 h-3 mr-1" /> 세계관
          </TabsTrigger>
          <TabsTrigger
            value="plot"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-10 text-xs"
          >
            <BookOpen className="w-3 h-3 mr-1" /> 서사
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 p-4">
          <TabsContent value="characters" className="mt-0 space-y-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted-foreground font-medium">
                등장인물 목록
              </span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            {isCharactersLoading ? (
              <div className="text-center py-8 text-xs text-muted-foreground flex flex-col items-center">
                <Loader2 className="w-4 h-4 mb-2 animate-spin" />
                불러오는 중...
              </div>
            ) : characters && characters.length > 0 ? (
              characters.map((char) => (
                <Card
                  key={char.id}
                  className="cursor-pointer hover:bg-accent/50 transition-colors border-border/60 mb-3"
                >
                  <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-xs font-bold flex justify-between items-center">
                      {char.name}
                      <Badge
                        variant="secondary"
                        className="text-[10px] h-4 px-1"
                      >
                        {char.role}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {char.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {char.traits?.map((trait, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-muted-foreground">
                등록된 인물이 없습니다.
              </div>
            )}
          </TabsContent>

          <TabsContent value="worldview" className="mt-0 space-y-3">
            <div className="text-center py-8 text-xs text-muted-foreground">
              세계관 데이터 준비 중...
            </div>
          </TabsContent>

          <TabsContent value="plot" className="mt-0 space-y-3">
            <div className="text-center py-8 text-xs text-muted-foreground">
              서사 데이터 준비 중...
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

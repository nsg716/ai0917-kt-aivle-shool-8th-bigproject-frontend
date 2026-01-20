import { Sparkles, Upload, FileText } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';

export function AuthorManuscripts() {
  return (
    <>
      {/* Upload Info */}
      <Card className="mb-6 border-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-foreground mb-2">AI 자동 설정 추출</h3>
              <p className="text-sm text-muted-foreground mb-3">
                원문을 업로드하면 AI가 자동으로 인물, 세계관, 서사 설정을
                추출하여 설정집에 저장합니다. 원본 텍스트는 저장되지 않으며,
                추출된 설정만 관리됩니다.
              </p>
              <div className="text-xs text-muted-foreground">
                지원 형식: TXT, DOCX, PDF • 최대 파일 크기: 50MB
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mb-6">
        <Input placeholder="파일 검색..." className="max-w-md" />
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Upload className="w-4 h-4 mr-2" />새 파일 업로드
        </Button>
      </div>

      <div className="mb-6"></div>

      {/* File Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {/* Active Novel */}
        <div className="group cursor-pointer">
          <div className="bg-card border-2 border-blue-200 dark:border-blue-800 rounded-lg p-3 hover:shadow-md transition-all">
            <div className="aspect-[4/3] bg-gradient-to-br from-slate-700 to-slate-900 rounded mb-3 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div className="text-xs text-foreground truncate mb-1">
              암흑의 영역 연대기
            </div>
            <div className="text-xs text-muted-foreground">47화 • 2시간 전</div>
            <Badge className="bg-green-500 text-white text-xs mt-2">활성</Badge>
          </div>
        </div>

        {/* Completed Novel 1 */}
        <div className="group cursor-pointer">
          <div className="bg-card border border-border rounded-lg p-3 hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="aspect-[4/3] bg-gradient-to-br from-purple-700 to-purple-900 rounded mb-3 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div className="text-xs text-foreground truncate mb-1">
              운명의 검
            </div>
            <div className="text-xs text-muted-foreground">완결 • 120화</div>
            <Badge
              variant="outline"
              className="border-border text-muted-foreground text-xs mt-2"
            >
              완결
            </Badge>
          </div>
        </div>

        {/* Completed Novel 2 */}
        <div className="group cursor-pointer">
          <div className="bg-card border border-border rounded-lg p-3 hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="aspect-[4/3] bg-gradient-to-br from-blue-700 to-blue-900 rounded mb-3 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div className="text-xs text-foreground truncate mb-1">
              별빛 아카데미
            </div>
            <div className="text-xs text-muted-foreground">완결 • 85화</div>
            <Badge
              variant="outline"
              className="border-border text-muted-foreground text-xs mt-2"
            >
              완결
            </Badge>
          </div>
        </div>

        {/* Chapter Files */}
        <div className="group cursor-pointer">
          <div className="bg-card border border-border rounded-lg p-3 hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="aspect-[4/3] bg-muted rounded mb-3 flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-xs text-foreground truncate mb-1">
              47화 - 선택의 순간
            </div>
            <div className="text-xs text-muted-foreground">2시간 전</div>
          </div>
        </div>

        <div className="group cursor-pointer">
          <div className="bg-card border border-border rounded-lg p-3 hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="aspect-[4/3] bg-muted rounded mb-3 flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-xs text-foreground truncate mb-1">
              46화 - 진실의 파편
            </div>
            <div className="text-xs text-muted-foreground">1일 전</div>
          </div>
        </div>

        <div className="group cursor-pointer">
          <div className="bg-card border border-border rounded-lg p-3 hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="aspect-[4/3] bg-muted rounded mb-3 flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-xs text-foreground truncate mb-1">
              45화 - 어둠 속의 빛
            </div>
            <div className="text-xs text-muted-foreground">2일 전</div>
          </div>
        </div>

        <div className="group cursor-pointer">
          <div className="bg-card border border-border rounded-lg p-3 hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="aspect-[4/3] bg-muted rounded mb-3 flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-xs text-foreground truncate mb-1">
              44화 - 배신자
            </div>
            <div className="text-xs text-muted-foreground">3일 전</div>
          </div>
        </div>

        <div className="group cursor-pointer">
          <div className="bg-card border border-border rounded-lg p-3 hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="aspect-[4/3] bg-muted rounded mb-3 flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-xs text-foreground truncate mb-1">
              43화 - 그림자의 속삭임
            </div>
            <div className="text-xs text-muted-foreground">4일 전</div>
          </div>
        </div>
      </div>
    </>
  );
}

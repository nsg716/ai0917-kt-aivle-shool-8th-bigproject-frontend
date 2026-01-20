import {
  Server,
  Users,
  Database,
  Activity,
  TrendingUp,
  Zap,
  Settings,
  FileText,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

export function AdminHome() {
  return (
    <div className="space-y-6">
      {/* 시스템 상태 Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Server className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl text-foreground font-bold">정상</div>
                <div className="text-sm text-muted-foreground">서버 상태</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl text-foreground font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">총 사용자</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl text-foreground font-bold">3,482</div>
                <div className="text-sm text-muted-foreground">저장된 작품</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="text-2xl text-foreground font-bold">87</div>
                <div className="text-sm text-muted-foreground">활성 세션</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 서비스 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>일일 활성 사용자</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">오늘</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">+15%</Badge>
                  <span className="text-lg font-semibold text-foreground">
                    352
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">어제</span>
                <span className="text-lg text-muted-foreground">306</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">7일 평균</span>
                <span className="text-lg text-muted-foreground">289</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span>시스템 리소스</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    CPU 사용률
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    42%
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: '42%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    메모리 사용률
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    68%
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: '68%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    스토리지 사용률
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    55%
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: '55%' }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 최근 시스템 로그 */}
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <span>최근 시스템 로그</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            <div className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
              <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground truncate">
                  데이터베이스 백업 완료
                </div>
                <div className="text-xs text-muted-foreground">
                  2026.01.09 14:32:15
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 shrink-0"
              >
                성공
              </Badge>
            </div>

            <div className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
              <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground truncate">
                  신규 사용자 계정 5개 생성
                </div>
                <div className="text-xs text-muted-foreground">
                  2026.01.09 13:45:22
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 shrink-0"
              >
                정보
              </Badge>
            </div>

            <div className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
              <div className="w-2 h-2 bg-yellow-500 rounded-full shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground truncate">
                  API 응답 시간 증가 감지
                </div>
                <div className="text-xs text-muted-foreground">
                  2026.01.09 12:18:44
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-yellow-300 dark:border-yellow-700 text-yellow-600 dark:text-yellow-400 shrink-0"
              >
                경고
              </Badge>
            </div>

            <div className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
              <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground truncate">
                  서버 재시작 완료
                </div>
                <div className="text-xs text-muted-foreground">
                  2026.01.09 11:05:33
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 shrink-0"
              >
                성공
              </Badge>
            </div>

            <div className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
              <div className="w-2 h-2 bg-purple-500 rounded-full shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground truncate">
                  시스템 업데이트 적용
                </div>
                <div className="text-xs text-muted-foreground">
                  2026.01.09 09:22:11
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 shrink-0"
              >
                업데이트
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 배포 현황 */}
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground flex items-center gap-2">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <span>배포 현황</span>
            </CardTitle>
            <Badge className="bg-green-500 text-white">운영 중</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                현재 버전
              </div>
              <div className="text-lg font-semibold text-foreground">
                v2.4.1
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                2026.01.05 배포
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">환경</div>
              <div className="text-lg font-semibold text-foreground">
                Production
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                AWS Seoul (ap-northeast-2)
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                가동 시간
              </div>
              <div className="text-lg font-semibold text-foreground">99.8%</div>
              <div className="text-xs text-muted-foreground mt-1">
                지난 30일 평균
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

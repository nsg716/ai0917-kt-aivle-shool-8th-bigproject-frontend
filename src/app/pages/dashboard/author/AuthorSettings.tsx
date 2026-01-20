import {
  Download,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Users as UsersIcon,
  Globe,
  BookMarked,
  Plus,
  Edit,
  Trash2,
  Clock,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../components/ui/tabs";
import { Badge } from "../../../components/ui/badge";

interface AuthorSettingsProps {
  settingsCategory: string;
  setSettingsCategory: (cat: string) => void;
}

export function AuthorSettings({
  settingsCategory,
  setSettingsCategory,
}: AuthorSettingsProps) {
  return (
    <>
      {/* AI Review Section - 상단에 배치 */}
      <div className="flex items-center justify-between mb-6">
        <div></div>
        <Button
          variant="outline"
          className="border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        >
          <Download className="w-4 h-4 mr-2" />
          공모전 템플릿 불러오기
        </Button>
      </div>

      <Card className="border-border shadow-sm mb-6">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>AI 검토 결과</span>
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              className="border-border"
            >
              전체 재검토
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm text-foreground mb-1">
                  역설적 설정 발견
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  엘레나의 나이가 12화(18세)와 45화(20세)에서
                  불일치. 작품 내 시간 경과는 3개월.
                </p>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  수정하기
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm text-foreground mb-1">
                  2차 창작 활용 제안
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  "그림자 왕국"의 정치 체계는 게임/드라마 각색에
                  적합합니다. 권력 구조를 상세화하면 더
                  좋습니다.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  AI 초안 생성
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <Tabs
            value={settingsCategory}
            onValueChange={setSettingsCategory}
          >
            <div className="border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-2 sm:gap-3">
              <TabsList className="bg-transparent flex flex-wrap gap-1 sm:gap-2">
                <TabsTrigger
                  value="characters"
                  className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400 px-6"
                >
                  <UsersIcon className="w-4 h-4 mr-2" />
                  인물
                </TabsTrigger>
                <TabsTrigger
                  value="world"
                  className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400 px-6"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  세계관
                </TabsTrigger>
                <TabsTrigger
                  value="narrative"
                  className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400 px-6"
                >
                  <BookMarked className="w-4 h-4 mr-2" />
                  서사
                </TabsTrigger>
              </TabsList>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />새 항목 추가
                </Button>
              </div>
            </div>

            <div className="p-6">
              <TabsContent value="characters" className="mt-0">
                <CharactersContent />
              </TabsContent>

              <TabsContent value="world" className="mt-0">
                <WorldContent />
              </TabsContent>

              <TabsContent value="narrative" className="mt-0">
                <NarrativeContent />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}

// Characters Content
function CharactersContent() {
  return (
    <div className="space-y-6">
      {/* Category Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <UsersIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-sm text-foreground mb-1">
              인물 설정 가이드
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>포함 내용:</strong> 주/조연 프로필, 인물
              관계도, 핵심 욕망
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>2차 창작 활용:</strong> 캐스팅, 캐릭터
              굿즈, 스핀오프 주인공 선정
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="border-border hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2 flex-shrink-0 w-20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-3xl overflow-hidden">
                  👤
                </div>
                <Badge className="bg-blue-600 text-white text-[11px] sm:text-xs px-2 py-0.5">
                  주인공
                </Badge>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm sm:text-base text-foreground">
                      엘레나 쉐도우본
                    </h4>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      나이:
                    </span>
                    <span className="ml-2 text-foreground">
                      18세
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      출신:
                    </span>
                    <span className="ml-2 text-foreground">
                      그림자 왕국
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      직업:
                    </span>
                    <span className="ml-2 text-foreground">
                      암살자
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      핵심 욕망:
                    </span>
                    <span className="ml-2 text-foreground">
                      정체성 찾기
                    </span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  그림자 조작 마법에 능숙하며, 점차 자신의 소속과
                  정체성에 대해 고민하기 시작한다.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2 flex-shrink-0 w-20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-3xl overflow-hidden">
                  🧙
                </div>
                <Badge
                  variant="outline"
                  className="border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 text-[11px] sm:text-xs px-2 py-0.5"
                >
                  멘토
                </Badge>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm sm:text-base text-foreground">
                      마스터 루미나스
                    </h4>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      나이:
                    </span>
                    <span className="ml-2 text-foreground">
                      65세
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      출신:
                    </span>
                    <span className="ml-2 text-foreground">
                      빛의 연합
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      직업:
                    </span>
                    <span className="ml-2 text-foreground">
                      대마법사
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      핵심 욕망:
                    </span>
                    <span className="ml-2 text-foreground">
                      평화 수호
                    </span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  지혜롭고 자비로운 빛의 마법사. 엘레나의
                  잠재력을 알아보고 편견을 넘어 그녀를 지도하려
                  한다.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// World Content
function WorldContent() {
  return (
    <div className="space-y-6">
      {/* Category Info */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
          <div>
            <h4 className="text-sm text-foreground mb-1">
              세계관 설정 가이드
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>포함 내용:</strong> 시간(연표),
              공간(지리), 시스템(규칙)
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>2차 창작 활용:</strong> CG/세트장 설계,
              게임 밸런스, 설정 오류 검토
            </p>
          </div>
        </div>
      </div>

      {/* World Settings */}
      <div className="space-y-4">
        <Card className="border-border hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg text-foreground">
                그림자 왕국
              </h4>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <div className="text-muted-foreground mb-1">
                    시간 (연표)
                  </div>
                  <div className="text-foreground">
                    건국 300년, 현재 그림자력 1223년
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">
                    공간 (지리)
                  </div>
                  <div className="text-foreground">
                    대륙 북부, 에레보스 산맥 너머
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">
                    시스템 (규칙)
                  </div>
                  <div className="text-foreground">
                    절대 군주제, 그림자 마법 중심
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="text-muted-foreground leading-relaxed">
                  영원한 황혼에 잠긴 왕국. 300년 전 대마법사
                  카엘루스가 태양을 봉인하고 건국했다. 그림자
                  마법이 발달했으며 빛의 마법은 금지되어 있다.
                  수도는 검은 화산암으로 지어진 옵시디언 성채.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg text-foreground">
                빛의 연합
              </h4>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <div className="text-muted-foreground mb-1">
                    시간 (연표)
                  </div>
                  <div className="text-foreground">
                    연합 결성 200년
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">
                    공간 (지리)
                  </div>
                  <div className="text-foreground">
                    대륙 남부, 크리스탈 평원
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    시스템 (규칙)
                  </div>
                  <div className="text-foreground">
                    연방제, 5개 도시국가 연합
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                  <div className="text-muted-foreground leading-relaxed">
                    그림자 왕국에 대항하기 위해 결성된 연합. 빛의
                    마법을 수호하며, 태양 신전을 중심으로 종교와
                    정치가 밀접하게 연결되어 있다.
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Narrative Content
function NarrativeContent() {
  return (
    <div className="space-y-6">
      {/* Category Info */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <BookMarked className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
          <div>
            <h4 className="text-sm text-foreground mb-1">
              서사 설정 가이드
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>포함 내용:</strong> 주요 사건 흐름, 미회수
              복선, 핵심 명장면
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>2차 창작 활용:</strong> 시나리오 각색,
              회차별 구성, 애니메이션 콘티
            </p>
          </div>
        </div>
      </div>

      {/* Narrative Settings */}
      <div className="space-y-4">
        {/* Main Story Arc */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-foreground">
                주요 사건 흐름
              </CardTitle>
              <Button size="sm" variant="ghost">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    1
                  </div>
                  <div className="w-0.5 h-full bg-green-200 dark:bg-green-800 mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="text-sm text-foreground">
                      암살자의 임무
                    </h5>
                    <Badge
                      variant="outline"
                      className="border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 text-xs"
                    >
                      1-10화
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    엘레나가 그림자 군주로부터 침투 임무를 받고
                    준비
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    2
                  </div>
                  <div className="w-0.5 h-full bg-green-200 dark:bg-green-800 mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="text-sm text-foreground">
                      빛의 연합 침투
                    </h5>
                    <Badge
                      variant="outline"
                      className="border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 text-xs"
                    >
                      11-25화
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    루미나스와의 만남, 예상 밖의 환대에 혼란
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                    3
                  </div>
                  <div className="w-0.5 h-full bg-blue-200 dark:bg-blue-800 mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="text-sm text-foreground">
                      정체성의 혼란
                    </h5>
                    <Badge className="bg-blue-500 text-white text-xs">
                      26-47화 (진행중)
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    자신의 소속과 신념에 대해 깊이 고민
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="text-sm text-foreground">
                      진실의 발견
                    </h5>
                    <Badge
                      variant="outline"
                      className="border-border text-muted-foreground text-xs"
                    >
                      48-60화 (예정)
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    그림자 왕국의 숨겨진 비밀과 최종 선택
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Foreshadowing */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-foreground">
                미회수 복선
              </CardTitle>
              <Button size="sm" variant="ghost">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm text-foreground mb-1">
                    엘레나의 어머니
                  </div>
                  <div className="text-sm text-muted-foreground">
                    3화에서 언급된 엘레나 어머니의 정체. 빛의
                    연합과 관련 암시
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm text-foreground mb-1">
                    그림자 단검의 저주
                  </div>
                  <div className="text-sm text-muted-foreground">
                    12화에서 루미나스가 경고한 단검의 부작용.
                    아직 미발현
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Scenes */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-foreground">
                핵심 명장면
              </CardTitle>
              <Button size="sm" variant="ghost">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="p-4 bg-muted/50 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-foreground">
                    첫 만남 (15화)
                  </div>
                  <Badge
                    variant="outline"
                    className="border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 text-xs"
                  >
                    감정적 전환점
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  엘레나와 루미나스가 처음 마주치는 장면. 긴장감
                  속에서 예상치 못한 따뜻함.
                </div>
              </div>

              <div className="p-4 bg-muted/50 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-foreground">
                    그림자 각성 (32화)
                  </div>
                  <Badge
                    variant="outline"
                    className="border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 text-xs"
                  >
                    액션 하이라이트
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  엘레나가 진정한 그림자의 힘을 각성하는 전투
                  장면. 시각적 연출 포인트.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

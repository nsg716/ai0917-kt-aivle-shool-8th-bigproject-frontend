import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export function AuthorMyPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-foreground">
            프로필 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl">
              김
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  이름
                </label>
                <Input
                  defaultValue="김민지"
                  className="max-w-sm"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  이메일
                </label>
                <Input
                  defaultValue="author@example.com"
                  className="max-w-sm"
                  type="email"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  역할
                </label>
                <div className="text-foreground">작가</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-foreground">
            작품 통계
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                진행 중인 작품
              </div>
              <div className="text-3xl text-foreground font-bold">
                3
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                완결 작품
              </div>
              <div className="text-3xl text-foreground font-bold">
                2
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                생성된 설정집
              </div>
              <div className="text-3xl text-foreground font-bold">
                5
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          프로필 업데이트
        </Button>
        <Button variant="outline" className="border-border">
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export function AuthorAccount() {
  return (
    <div className="max-w-4xl">
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-foreground">
            계정 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm text-foreground mb-4">
                알림 설정
              </h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    설정집 생성 완료 알림
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-primary"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    AI 분석 완료 알림
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-primary"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    새 공지사항 알림
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-primary"
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="text-sm text-foreground mb-4">
                개인정보 설정
              </h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    작품 공개 여부
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-primary"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    프로필 공개 여부
                  </span>
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Megaphone } from "lucide-react";
import {
  Card,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

export function AuthorNotice() {
  return (
    <Card className="border-border">
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          <div className="flex items-center justify-between p-6 hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Megaphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-foreground font-medium">
                    시스템 점검 안내 (1/10)
                  </h4>
                  <Badge className="bg-orange-500 text-white text-xs">
                    중요
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  안정적인 서비스를 위해 서버 점검이 진행될
                  예정입니다.
                </p>
              </div>
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
              2026.01.08
            </span>
          </div>

          <div className="flex items-center justify-between p-6 hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Megaphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-foreground font-medium">
                    새로운 AI 기능 업데이트
                  </h4>
                  <Badge className="bg-blue-500 text-white text-xs">
                    New
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  더욱 강력해진 설정 추출 기능을 만나보세요.
                </p>
              </div>
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
              2026.01.05
            </span>
          </div>

          <div className="flex items-center justify-between p-6 hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Megaphone className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="text-foreground font-medium mb-1">
                  12월 베스트 작가 발표
                </h4>
                <p className="text-sm text-muted-foreground">
                  축하합니다! 12월 베스트 작가 명단이
                  공개되었습니다.
                </p>
              </div>
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
              2026.01.01
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

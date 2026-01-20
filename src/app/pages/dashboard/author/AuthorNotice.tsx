import { Megaphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

export function AuthorNotice() {
  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Megaphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-foreground">공지사항</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          <div className="p-8 text-center text-muted-foreground">
            등록된 공지사항이 없습니다.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

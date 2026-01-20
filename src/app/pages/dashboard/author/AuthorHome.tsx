import {
  BookOpen,
  Database,
  CheckCircle,
  Megaphone,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../..//components/ui/card";
import { Badge } from "../../../components/ui/badge";

export function AuthorHome() {
  return (
    <div className="space-y-6">
      {/* 작품 현황 Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl text-foreground font-bold">
                  3
                </div>
                <div className="text-sm text-muted-foreground">
                  진행 중인 작품
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl text-foreground font-bold">
                  5
                </div>
                <div className="text-sm text-muted-foreground">
                  생성된 설정집
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl text-foreground font-bold">
                  2
                </div>
                <div className="text-sm text-muted-foreground">
                  완결 작품
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 공지사항 Section */}
      <Card className="border-border">
        <CardHeader className="border-b border-border flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-foreground">
              공지사항
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-foreground">
                    Lorem ipsum dolor sit amet consectetur
                  </span>
                  <Badge className="bg-orange-500 text-white text-xs">
                    N
                  </Badge>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                2026.01.08
              </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-foreground">
                    Sed do eiusmod tempor incididunt
                  </span>
                  <Badge className="bg-orange-500 text-white text-xs">
                    N
                  </Badge>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                2026.01.08
              </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex-1">
                <span className="text-sm text-foreground">
                  Duis aute irure dolor in reprehenderit
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                2025.12.24
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

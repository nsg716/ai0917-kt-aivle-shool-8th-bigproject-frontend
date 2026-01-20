import { Megaphone, Plus, Award } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

export function ManagerHome() {
  const contests = [
    {
      id: "1",
      title: "Lorem Ipsum Writing Contest 2026",
      organizer: "Lorem Foundation",
      deadline: "2026.03.31",
      category: "Fantasy",
    },
    {
      id: "2",
      title: "Dolor Sit Amet Literary Award",
      organizer: "Dolor Association",
      deadline: "2026.04.15",
      category: "SF",
    },
    {
      id: "3",
      title: "Consectetur Adipiscing Novel Prize",
      organizer: "Adipiscing Institute",
      deadline: "2026.05.20",
      category: "Romance",
    },
    {
      id: "4",
      title: "Sed Do Eiusmod Fiction Contest",
      organizer: "Eiusmod Society",
      deadline: "2026.06.10",
      category: "Mystery",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 2 Column Grid: Notice & Contests - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notice Section */}
        <Card className="border-border">
          <CardHeader className="border-b border-border p-4 p-[16px]">
            <div className="flex flex-wrap items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-foreground truncate">
                  공지사항
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 h-8 w-8 flex-shrink-0"
              >
                <Plus className="w-5 h-5" />
              </Button>
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
                      Sed do eiusmod tempor incididunt ut labore
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
                      Ut enim ad minim veniam quis nostrud
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

              <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex-1">
                  <span className="text-sm text-foreground">
                    Excepteur sint occaecat cupidatat
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  2025.12.23
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contest Section */}
        <Card className="border-border">
          <CardHeader className="border-b border-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-foreground truncate">
                  공모전
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 h-8 w-8 flex-shrink-0"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {contests.map((contest) => (
                <div
                  key={contest.id}
                  className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-sm text-foreground font-medium mb-1">
                        {contest.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {contest.organizer}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 text-xs"
                    >
                      {contest.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">
                      마감: {contest.deadline}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

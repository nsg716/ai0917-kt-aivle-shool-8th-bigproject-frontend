import {
  Megaphone,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useState } from "react";

export function ManagerNotice() {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="공지사항 검색..."
              className="pl-9 w-full sm:w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4 text-slate-600" />
          </Button>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsWriteModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          공지사항 작성
        </Button>
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <Card
            key={item}
            className="border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
                      중요
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-slate-500 border-slate-200"
                    >
                      서비스 점검
                    </Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      2024.01.20
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    [점검] 1월 25일 정기 서비스 점검 안내 (02:00 ~
                    06:00)
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2">
                    안녕하세요. 서비스 안정화를 위한 정기 점검이
                    진행될 예정입니다. 점검 시간 동안은 서비스 이용이
                    제한되오니 양해 부탁드립니다. 주요 점검 내용은
                    데이터베이스 최적화 및 보안 패치 적용입니다.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Users className="w-3 h-3" />
                    1,234
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={isWriteModalOpen}
        onOpenChange={setIsWriteModalOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>공지사항 작성</DialogTitle>
            <DialogDescription>
              전체 사용자 또는 특정 그룹에게 공지사항을 발송합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  분류
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notice">일반 공지</SelectItem>
                    <SelectItem value="check">서비스 점검</SelectItem>
                    <SelectItem value="event">이벤트</SelectItem>
                    <SelectItem value="update">업데이트</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  중요도
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">일반</SelectItem>
                    <SelectItem value="high">중요</SelectItem>
                    <SelectItem value="urgent">긴급</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                제목
              </label>
              <Input placeholder="공지사항 제목을 입력하세요" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                내용
              </label>
              <Textarea
                placeholder="공지 내용을 입력하세요"
                className="h-64 resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="push"
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="push"
                className="text-sm text-slate-700"
              >
                푸시 알림 전송
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsWriteModalOpen(false)}
            >
              취소
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

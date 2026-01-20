import {
  User,
  Mail,
  Phone,
  Building,
  Camera,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";

export function ManagerMyPage() {
  return (
    <div className="max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-slate-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src="/avatars/admin.jpg" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
                  M
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-slate-900 text-white border-2 border-white"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              관리자
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              총괄 매니저
            </p>
            <div className="w-full space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <User className="w-4 h-4 mr-2 text-slate-400" />
                프로필 편집
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <Building className="w-4 h-4 mr-2 text-slate-400" />
                소속 관리
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-slate-200">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-slate-900">
              기본 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  이름
                </label>
                <Input defaultValue="홍길동" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  직책
                </label>
                <Input defaultValue="총괄 매니저" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  defaultValue="manager@example.com"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                연락처
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  defaultValue="010-1234-5678"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                변경사항 저장
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

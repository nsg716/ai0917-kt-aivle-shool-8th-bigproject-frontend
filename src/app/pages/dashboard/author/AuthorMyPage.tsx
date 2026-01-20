import { User, Mail, Phone, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export function AuthorMyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-foreground">마이페이지</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
           <div className="flex flex-col md:flex-row items-start gap-8">
             <div className="flex flex-col items-center gap-4">
               <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center overflow-hidden border-4 border-background shadow-lg">
                 <User className="w-16 h-16 text-muted-foreground" />
               </div>
               <Button variant="outline" size="sm">프로필 사진 변경</Button>
             </div>
             
             <div className="flex-1 space-y-6 w-full">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <Label htmlFor="name">이름 (필명)</Label>
                   <div className="relative">
                     <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Input id="name" defaultValue="김작가" className="pl-9" />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="email">이메일</Label>
                   <div className="relative">
                     <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Input id="email" defaultValue="author@example.com" className="pl-9" readOnly />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="phone">연락처</Label>
                   <div className="relative">
                     <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Input id="phone" defaultValue="010-1234-5678" className="pl-9" />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="joined">가입일</Label>
                   <div className="relative">
                     <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Input id="joined" defaultValue="2025.12.01" className="pl-9" readOnly />
                   </div>
                 </div>
               </div>
               
               <div className="space-y-2">
                 <Label htmlFor="bio">소개</Label>
                 <Input id="bio" defaultValue="판타지 소설을 주로 집필합니다." />
               </div>
               
               <div className="flex justify-end pt-4">
                 <Button className="bg-blue-600 hover:bg-blue-700 text-white">변경사항 저장</Button>
               </div>
             </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
